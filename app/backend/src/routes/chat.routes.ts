import { Router } from 'express';
import { chatBodySchema } from '../types/api.types.js';
import { createProblemFinderAgent } from '../agents/problem-finder/problem-finder.agent.js';
import { createMockInterviewAgent } from '../agents/mock-interview/mock-interview.agent.js';
import { createSubjectQuizAgent } from '../agents/subject-quiz/subject-quiz.agent.js';
import { createContentEnricherAgent } from '../agents/content-enricher/content-enricher.agent.js';
import { extractJson } from '../agents/model-factory.js';
import { chatUiResponseSchema, type ChatUiResponse } from '../agents/shared/ui-response.schema.js';
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

/** Dig the structured response out of a LangGraph stream chunk / final state. */
function findStructuredResponse(state: any): any | null {
  if (!state) return null;
  if (state.structuredResponse) return state.structuredResponse;
  for (const key of Object.keys(state)) {
    const node = state[key];
    if (node && typeof node === 'object' && node.structuredResponse) return node.structuredResponse;
  }
  return null;
}

/** Always produce a valid envelope, whatever the model did. */
function toEnvelope(raw: any, fallbackText: string): ChatUiResponse {
  const parsed = chatUiResponseSchema.safeParse(raw);
  if (parsed.success) return parsed.data;

  // Model returned prose or malformed JSON — try fenced JSON, then degrade to text.
  const viaJson = typeof fallbackText === 'string' ? extractJson(fallbackText) : null;
  const parsed2 = chatUiResponseSchema.safeParse(viaJson);
  if (parsed2.success) return parsed2.data;

  log.warn('Falling back to text envelope; structured output did not validate');
  return {
    component: 'text',
    message: fallbackText || 'Sorry, I could not produce a response.',
    inputs: {},
    followUpSuggestions: [],
  };
}

/** Drop hallucinated problem slugs. */
function validateProblemSlugs(envelope: ChatUiResponse): ChatUiResponse {
  if (!envelope.inputs?.problems?.length) return envelope;
  const db = getDb();
  const stmt = db.prepare('SELECT 1 FROM problems WHERE slug = ?');
  const kept = envelope.inputs.problems.filter((p: any) => {
    const exists = stmt.get(p.slug);
    if (!exists) log.warn(`Dropped unknown slug: ${p.slug}`);
    return !!exists;
  });
  return { ...envelope, inputs: { ...envelope.inputs, problems: kept } };
}

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
      const title = body.message.slice(0, 60).trim() + (body.message.length > 60 ? '…' : '');
      threadId = createThread(resolvedMode, body.modelId ?? 'gpt-oss-120b', title);
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
    const recursionLimit = agentName === 'content-enricher' ? 800 : 50;

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
        let lastStructured: any = null;
        let stepCount = 0;

        for await (const chunk of stream) {
          if (closed) break;
          stepCount++;
          sendSseEvent(res, 'step', { index: stepCount, nodes: Object.keys(chunk) });

          const structured = findStructuredResponse(chunk);
          if (structured) lastStructured = structured;

          for (const nodeName of Object.keys(chunk)) {
            const nodeData = chunk[nodeName];
            if (!nodeData?.messages) continue;
            for (const msg of nodeData.messages) {
              if (msg._getType?.() === 'ai') {
                const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
                if (content && content !== lastContent) {
                  sendSseEvent(res, 'token', { delta: content });
                  lastContent = content;
                }
                if (msg.tool_calls?.length) {
                  for (const tc of msg.tool_calls) {
                    sendSseEvent(res, 'tool', { name: tc.name, phase: 'start', summary: JSON.stringify(tc.args).slice(0, 200) });
                  }
                }
              }
              if (msg._getType?.() === 'tool') {
                sendSseEvent(res, 'tool', {
                  name: (msg as any).name ?? 'tool',
                  phase: 'end',
                  summary: (typeof msg.content === 'string' ? msg.content : '').slice(0, 200),
                });
              }
            }
          }
        }

        const envelope = validateProblemSlugs(toEnvelope(lastStructured, lastContent));

        appendMessage(threadId, 'assistant', envelope.message, JSON.stringify(envelope));
        sendSseEvent(res, 'result', { threadId, ui: envelope });

        // Mock-interview session persistence now reads the envelope
        if (agentName === 'mock-interview' && envelope.inputs?.stage) {
          const existingSession = getInterviewSession(threadId);
          upsertInterviewSession({
            id: existingSession?.id ?? crypto.randomUUID(),
            threadId,
            targetCompany: envelope.inputs.interpretedFilters?.companies?.[0],
            targetRole: envelope.inputs.interpretedFilters?.seniority ?? undefined,
            planJson: JSON.stringify(envelope.inputs.problems ?? []),
            currentStep: envelope.inputs.sessionProgress?.step ?? 0,
            stage: envelope.inputs.stage,
            status: envelope.inputs.nextAction === 'end_interview' ? 'completed' : 'active',
          });
        }

        if (env.DEBUG_RUNS) {
          saveDebugDump(agentName, { message: body.message, modelId: def.id }, JSON.stringify(envelope, null, 2));
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

        let lastContent = '';
        let lastStructured: any = null;
        let stepCount = 0;
        for await (const chunk of stream) {
          stepCount++;
          const structured = findStructuredResponse(chunk);
          if (structured) lastStructured = structured;

          for (const nodeName of Object.keys(chunk)) {
            const nodeData = chunk[nodeName];
            if (nodeData?.messages) {
              for (const msg of nodeData.messages) {
                if (msg._getType?.() === 'ai' && typeof msg.content === 'string') {
                  lastContent = msg.content;
                }
              }
            }
          }
        }
        log.info(`Agent completed in ${stepCount} steps`);

        const envelope = validateProblemSlugs(toEnvelope(lastStructured, lastContent));
        appendMessage(threadId, 'assistant', envelope.message, JSON.stringify(envelope));

        if (env.DEBUG_RUNS) {
          saveDebugDump(agentName, { message: body.message, modelId: def.id }, JSON.stringify(envelope, null, 2));
        }

        res.json({
          data: {
            threadId,
            modelId: def.id,
            agent: agentName,
            ui: envelope,
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
