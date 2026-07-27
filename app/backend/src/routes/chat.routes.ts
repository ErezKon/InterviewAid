import { Router } from 'express';
import { chatBodySchema } from '../types/api.types.js';
import { createProblemFinderAgent } from '../agents/problem-finder/problem-finder.agent.js';
import { createMockInterviewAgent } from '../agents/mock-interview/mock-interview.agent.js';
import { createSubjectQuizAgent } from '../agents/subject-quiz/subject-quiz.agent.js';
import { createContentEnricherAgent } from '../agents/content-enricher/content-enricher.agent.js';
import { extractJson } from '../agents/model-factory.js';
import {
  createThread, appendMessage, getRecentMessages,
  upsertInterviewSession, getInterviewSession,
} from '../services/session.service.js';
import { initSse, sendSseEvent, sendSseDone, sendSseError, startHeartbeat } from '../services/sse.service.js';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { createLogger } from '../utils/logger.js';
import { getDb } from '../db/connection.js';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { env } from '../config/env.js';
import { DATA_DIR } from '../config/paths.js';

const log = createLogger('chat');

export const chatRouter = Router();

// Route mode detection
function detectMode(message: string, mode: string): string {
  if (mode !== 'auto') return mode;
  if (/mock\s*interview|interview\s*me|practice\s*session|simulate/i.test(message)) return 'mock-interview';
  if (/quiz|questions?\s*about|test\s*me\s*on/i.test(message)) return 'subject-quiz';
  if (/enrich|insufficient|fill\s*in|add\s*descriptions?|improve\s*content/i.test(message)) return 'content-enricher';
  return 'find-problems';
}

chatRouter.post('/chat', async (req, res) => {
  try {
    const body = chatBodySchema.parse(req.body);
    const resolvedMode = detectMode(body.message, body.mode);
    log.info(`Chat request: mode=${resolvedMode}, model=${body.modelId ?? 'default'}, stream=${body.stream}`);

    // Get or create thread
    let threadId = body.threadId;
    if (!threadId) {
      threadId = createThread(resolvedMode, body.modelId ?? 'gpt-oss-120b');
    }

    // Persist user message
    appendMessage(threadId, 'user', body.message);

    // Replay recent history for context
    const recentMessages = getRecentMessages(threadId, 12);
    const historyMessages = recentMessages.map(m =>
      m.role === 'user'
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    );

    // Build context-enriched message
    let userMessage = body.message;
    if (body.context?.problemSlug) {
      userMessage += `\n\n[Context: The user is looking at problem "${body.context.problemSlug}"]`;
    }
    if (body.context?.subjectId) {
      userMessage += `\n\n[Context: The user is studying subject "${body.context.subjectId}"]`;
    }
    if (body.context?.filters) {
      userMessage += `\n\n[Context: Current active filters: ${JSON.stringify(body.context.filters)}]`;
    }

    // Create agent based on mode
    let agentResult: { agent: any; def: any };
    let agentName: string;

    switch (resolvedMode) {
      case 'mock-interview':
        agentResult = await createMockInterviewAgent(body.modelId);
        agentName = 'mock-interview';
        break;
      case 'subject-quiz':
        agentResult = await createSubjectQuizAgent(body.modelId);
        agentName = 'subject-quiz';
        break;
      case 'content-enricher':
        agentResult = await createContentEnricherAgent(body.modelId);
        agentName = 'content-enricher';
        break;
      default:
        agentResult = await createProblemFinderAgent(body.modelId);
        agentName = 'problem-finder';
        break;
    }

    const { agent, def } = agentResult;
    const recursionLimit = agentName === 'content-enricher' ? 500 : 50;

    if (body.stream) {
      // SSE streaming response
      initSse(res);
      sendSseEvent(res, 'meta', { threadId, modelId: def.id, agent: agentName });

      const heartbeat = startHeartbeat(res);
      let closed = false;
      req.on('close', () => { closed = true; clearInterval(heartbeat); });

      try {
        const stream = await agent.stream(
          { messages: [...historyMessages, new HumanMessage(userMessage)] },
          { configurable: { thread_id: threadId }, recursionLimit },
        );

        let lastContent = '';
        let stepCount = 0;

        for await (const chunk of stream) {
          if (closed) break;
          stepCount++;
          const nodeNames = Object.keys(chunk);
          sendSseEvent(res, 'step', { index: stepCount, nodes: nodeNames });

          // Extract content from the agent node
          for (const nodeName of nodeNames) {
            const nodeData = chunk[nodeName];
            if (nodeData?.messages) {
              for (const msg of nodeData.messages) {
                if (msg._getType() === 'ai') {
                  const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
                  if (content && content !== lastContent) {
                    sendSseEvent(res, 'token', { delta: content });
                    lastContent = content;
                  }
                  // Report tool calls
                  if (msg.tool_calls?.length) {
                    for (const tc of msg.tool_calls) {
                      sendSseEvent(res, 'tool', { name: tc.name, phase: 'start', summary: JSON.stringify(tc.args).slice(0, 200) });
                    }
                  }
                }
                if (msg._getType() === 'tool') {
                  sendSseEvent(res, 'tool', {
                    name: (msg as any).name ?? 'tool',
                    phase: 'end',
                    summary: (typeof msg.content === 'string' ? msg.content : '').slice(0, 200),
                  });
                }
              }
            }
          }
        }

        // Persist assistant response
        if (lastContent) {
          const structured = extractJson(lastContent);
          appendMessage(threadId, 'assistant', lastContent, structured ? JSON.stringify(structured) : undefined);

          // Validate returned slugs against DB
          if (structured?.problems) {
            const db = getDb();
            structured.problems = structured.problems.filter((p: any) => {
              const exists = db.prepare('SELECT 1 FROM problems WHERE slug = ?').get(p.slug);
              if (!exists) log.warn(`Dropped unknown slug: ${p.slug}`);
              return !!exists;
            });
          }

          sendSseEvent(res, 'result', { threadId, structured: structured ?? lastContent });

          // Handle interview session persistence
          if (agentName === 'mock-interview' && structured?.stage) {
            const existingSession = getInterviewSession(threadId);
            upsertInterviewSession({
              id: existingSession?.id ?? crypto.randomUUID(),
              threadId,
              targetCompany: structured.interpretedFilters?.companies?.[0],
              targetRole: structured.interpretedFilters?.seniority,
              planJson: JSON.stringify(structured.problems ?? []),
              currentStep: structured.sessionProgress?.step ?? 0,
              stage: structured.stage,
              status: structured.nextAction === 'end_interview' ? 'completed' : 'active',
            });
          }
        }

        // Debug dump
        if (env.DEBUG_RUNS) {
          saveDebugDump(agentName, { message: body.message, modelId: def.id }, lastContent);
        }

        clearInterval(heartbeat);
        if (!closed) sendSseDone(res);
      } catch (err: any) {
        clearInterval(heartbeat);
        log.error('Stream error', err);
        if (!closed) sendSseError(res, err.message ?? 'Agent error');
      }
    } else {
      // Non-streaming response
      try {
        const stream = await agent.stream(
          { messages: [...historyMessages, new HumanMessage(userMessage)] },
          { configurable: { thread_id: threadId }, recursionLimit },
        );

        let lastState: any = null;
        let stepCount = 0;
        for await (const chunk of stream) {
          stepCount++;
          lastState = chunk;
        }
        log.info(`Agent completed in ${stepCount} steps`);

        // Extract final content
        let finalContent = '';
        if (lastState) {
          for (const nodeName of Object.keys(lastState)) {
            const nodeData = lastState[nodeName];
            if (nodeData?.messages) {
              for (const msg of nodeData.messages) {
                if (msg._getType() === 'ai' && typeof msg.content === 'string') {
                  finalContent = msg.content;
                }
              }
            }
          }
        }

        const structured = extractJson(finalContent);
        appendMessage(threadId, 'assistant', finalContent, structured ? JSON.stringify(structured) : undefined);

        // Validate slugs
        if (structured?.problems) {
          const db = getDb();
          structured.problems = structured.problems.filter((p: any) => {
            const exists = db.prepare('SELECT 1 FROM problems WHERE slug = ?').get(p.slug);
            return !!exists;
          });
        }

        if (env.DEBUG_RUNS) {
          saveDebugDump(agentName, { message: body.message, modelId: def.id }, finalContent);
        }

        res.json({
          data: {
            threadId,
            modelId: def.id,
            agent: agentName,
            content: finalContent,
            structured,
          },
        });
      } catch (err: any) {
        log.error('Agent error', err);
        res.status(500).json({
          error: { code: 'AGENT_ERROR', message: err.message ?? 'Agent failed' },
        });
      }
    }
  } catch (err: any) {
    log.error('Chat route error', err);
    if (!res.headersSent) {
      res.status(err.statusCode ?? 500).json({
        error: { code: 'CHAT_ERROR', message: err.message ?? 'Chat error' },
      });
    }
  }
});

function saveDebugDump(agent: string, input: any, output: string) {
  try {
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = path.join(DATA_DIR, 'runs', `${agent}-${ts}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'input.json'), JSON.stringify(input, null, 2));
    fs.writeFileSync(path.join(dir, 'output.txt'), output);
    log.info(`Debug dump saved to ${dir}`);
  } catch (e) {
    log.warn('Failed to save debug dump');
  }
}
