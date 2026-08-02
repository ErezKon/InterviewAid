import crypto from 'node:crypto';
import { createChatModel } from '../agents/model-factory.js';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { createLogger } from '../utils/logger.js';

const log = createLogger('quiz-generator');

export interface GeneratedQuestion {
  id: string;
  subjectId: string;
  type: 'open' | 'multiple-choice';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  expectedAnswer: string;
  referenceQuote: string;
  followUp?: string;
}

function questionCountForWordCount(wordCount: number): number {
  if (wordCount <= 2000) return 5;
  if (wordCount <= 5000) return 10;
  return 15;
}

function truncateBody(bodyMd: string, maxChars = 14000): string {
  if (bodyMd.length <= maxChars) return bodyMd;
  const truncated = bodyMd.slice(0, maxChars);
  const lastSection = truncated.lastIndexOf('\n## ');
  return lastSection > 0
    ? truncated.slice(0, lastSection) + '\n\n[...truncated]'
    : truncated + '\n\n[...truncated]';
}

const SYSTEM_PROMPT = `You are a quiz question generator for interview preparation materials.
Given study material, generate interview-style questions that could come up in a real technical interview.

Rules:
1. Every question MUST be answerable from the provided material.
2. Every question MUST include a "referenceQuote" — a verbatim quote from the source material that supports the answer. Do NOT paraphrase or fabricate quotes.
3. Mix question types: roughly 40% multiple-choice and 60% open-ended.
4. Distribute difficulty levels: ~30% easy, ~40% medium, ~30% hard.
5. For multiple-choice questions, provide exactly 4 options where only one is correct. Wrong options should be plausible misconceptions.
6. Include a follow-up question for hard questions.
7. Questions should test understanding, not just memorization — ask "why" and "how" not just "what".

Respond with ONLY a JSON array (no wrapper object, no markdown fences) of question objects:
[
  {
    "type": "open" | "multiple-choice",
    "difficulty": "easy" | "medium" | "hard",
    "question": "...",
    "options": ["A", "B", "C", "D"],  // only for multiple-choice
    "expectedAnswer": "...",
    "referenceQuote": "verbatim quote from material",
    "followUp": "..."  // optional, mainly for hard questions
  }
]`;

export async function generateQuestionsForSubject(
  subject: { id: string; title: string; bodyMd: string; wordCount: number },
  modelId?: string,
): Promise<GeneratedQuestion[]> {
  const count = questionCountForWordCount(subject.wordCount);
  const body = truncateBody(subject.bodyMd);

  log.info(`Generating ${count} questions for "${subject.title}" (${subject.wordCount} words)`);

  const { model, def } = await createChatModel(modelId);

  const userPrompt = `Generate exactly ${count} interview questions for the following study material.

Subject: ${subject.title}

--- MATERIAL START ---
${body}
--- MATERIAL END ---

Generate ${count} questions as a JSON array.`;

  const response = await model.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    new HumanMessage(userPrompt),
  ]);

  // Extract text content — handle both string and content-block array formats
  let content: string;
  if (typeof response.content === 'string') {
    content = response.content;
  } else if (Array.isArray(response.content)) {
    content = response.content
      .map((block: any) => (typeof block === 'string' ? block : block.text ?? ''))
      .join('');
  } else {
    content = String(response.content);
  }

  // Parse JSON from response (may be wrapped in code fences)
  const fenceMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  const cleaned = fenceMatch ? fenceMatch[1].trim() : content.trim();

  let parsed: any[];
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // Retry: the LLM may have returned the JSON inside a string-escaped wrapper
    try {
      const unescaped = JSON.parse(`"${cleaned.replace(/^"|"$/g, '')}"`);
      parsed = typeof unescaped === 'string' ? JSON.parse(unescaped) : unescaped;
    } catch {
      log.error(`Failed to parse LLM response for "${subject.title}": ${(err as Error).message}`);
      log.debug(`Raw response (first 800 chars): ${content.slice(0, 800)}`);
      return [];
    }
  }

  if (!Array.isArray(parsed)) {
    log.error(`LLM response for "${subject.title}" is not an array`);
    return [];
  }

  const questions: GeneratedQuestion[] = parsed
    .filter(q => q.question && q.expectedAnswer && q.referenceQuote)
    .map((q, i) => ({
      id: `${subject.id}--q${i + 1}-${crypto.randomUUID().slice(0, 6)}`,
      subjectId: subject.id,
      type: q.type === 'multiple-choice' ? 'multiple-choice' : 'open',
      difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty) ? q.difficulty : 'medium',
      question: q.question,
      options: q.type === 'multiple-choice' && Array.isArray(q.options) ? q.options : undefined,
      expectedAnswer: q.expectedAnswer,
      referenceQuote: q.referenceQuote,
      followUp: q.followUp || undefined,
    }));

  log.info(`Generated ${questions.length}/${count} valid questions for "${subject.title}" using ${def.id}`);
  return questions;
}
