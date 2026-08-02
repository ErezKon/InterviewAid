import { z } from 'zod';

/** Canonical list of renderable chat components. Must stay in sync with
 *  app/frontend/src/app/features/chat/component-registry.ts */
export const CHAT_COMPONENTS = [
  'text',
  'chat-markdown-viewer',
  'chat-quiz-cards',
  'chat-problem-list',
  'chat-hint-card',
  'chat-interview-question',
  'chat-evaluation-scorecard',
  'chat-enrichment-report',
] as const;

export type ChatComponentName = (typeof CHAT_COMPONENTS)[number];

const problemCardSchema = z.object({
  slug: z.string().describe('Exact problem slug as returned by a tool — never invent one'),
  title: z.string().describe('Problem title'),
  difficulty: z.string().describe('Easy | Medium | Hard'),
  topics: z.array(z.string()).describe('Topic ids'),
  companies: z.array(z.string()).describe('Company slugs'),
  why: z.string().describe('One sentence: why this problem is relevant to the user request'),
});

const quizQuestionSchema = z.object({
  id: z.string().describe('Stable unique id for this question'),
  type: z.enum(['open', 'multiple-choice']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string(),
  options: z.array(z.string()).optional().describe('Required for multiple-choice, omit for open'),
  expectedAnswer: z.string(),
  referenceQuote: z.string().describe('Verbatim quote from the source subject that justifies the answer'),
  followUp: z.string().optional(),
});

const hintSchema = z.object({
  slug: z.string().describe('Problem slug this hint belongs to'),
  level: z.number().describe('1 = nudge, 2 = approach, 3 = near-solution'),
  text: z.string(),
});

const evaluationSchema = z.object({
  correctness: z.number().min(1).max(5),
  complexity: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  edgeCases: z.number().min(1).max(5),
  notes: z.string().describe('Short qualitative feedback'),
});

const chatInputsSchema = z.object({
  // --- chat-markdown-viewer ---
  content: z.string().optional()
    .describe('Markdown body. REQUIRED for "chat-markdown-viewer" — the raw source material from get_subject.'),
  title: z.string().optional().describe('Optional card title for "chat-markdown-viewer".'),

  // --- chat-problem-list ---
  problems: z.array(problemCardSchema).optional()
    .describe('REQUIRED for "chat-problem-list". Only slugs returned by search_problems/get_problem.'),
  interpretedFilters: z.object({
    companies: z.array(z.string()),
    difficulties: z.array(z.string()),
    topics: z.array(z.string()),
    seniority: z.string().nullable(),
  }).optional().describe('What you understood from the request; shown as chips above "chat-problem-list".'),

  // --- chat-quiz-cards ---
  subject: z.object({
    id: z.string(),
    title: z.string(),
    sourceFile: z.string(),
  }).optional().describe('The subject the quiz was generated from (for "chat-quiz-cards").'),
  questions: z.array(quizQuestionSchema).optional()
    .describe('REQUIRED for "chat-quiz-cards".'),
  studyTips: z.array(z.string()).optional().describe('Optional tips shown under "chat-quiz-cards".'),

  // --- chat-hint-card ---
  hints: z.array(hintSchema).optional().describe('REQUIRED for "chat-hint-card".'),
  problemTitle: z.string().optional().describe('Title of the problem the hints refer to.'),

  // --- chat-interview-question ---
  stage: z.enum(['plan', 'ask_basic', 'probe', 'expand', 'hint', 'feedback', 'next', 'end']).optional()
    .describe('REQUIRED for "chat-interview-question".'),
  questionText: z.string().optional().describe('REQUIRED for "chat-interview-question".'),
  currentProblemSlug: z.string().nullable().optional(),
  hintsGiven: z.number().optional(),
  sessionProgress: z.object({ step: z.number(), total: z.number() }).optional(),
  nextAction: z.enum(['wait_for_answer', 'next_problem', 'end_interview']).optional(),

  // --- chat-evaluation-scorecard ---
  evaluation: evaluationSchema.optional().describe('REQUIRED for "chat-evaluation-scorecard".'),

  // --- chat-enrichment-report ---
  enrichment: z.object({
    filesScanned: z.number(),
    filesEnriched: z.number(),
    auditSummary: z.string(),
    items: z.array(z.object({
      file: z.string(),
      status: z.enum(['enriched', 'skipped', 'failed']),
      notes: z.string(),
    })),
  }).optional().describe('REQUIRED for "chat-enrichment-report".'),
});

export const chatUiResponseSchema = z.object({
  component: z.enum(CHAT_COMPONENTS).describe(
    'Which UI component the frontend should render. ' +
    '"text" for plain conversational answers, clarifying questions, or errors. ' +
    '"chat-markdown-viewer" when returning raw source/study material as markdown. ' +
    '"chat-problem-list" when recommending coding problems. ' +
    '"chat-quiz-cards" when returning quiz questions. ' +
    '"chat-hint-card" when returning progressive hints. ' +
    '"chat-interview-question" when asking the next mock-interview question. ' +
    '"chat-evaluation-scorecard" when scoring the candidate answer. ' +
    '"chat-enrichment-report" when reporting content-enrichment results.'
  ),
  message: z.string().describe(
    'Short conversational text shown ABOVE the component. Always fill this in, even when a rich component is used. Markdown allowed.'
  ),
  inputs: chatInputsSchema.describe(
    'Data for the chosen component. Fill ONLY the fields that component needs; leave everything else out.'
  ),
  followUpSuggestions: z.array(z.string()).describe(
    'Up to 4 short suggested next questions. Use an empty array if none apply.'
  ),
});

export type ChatUiResponse = z.infer<typeof chatUiResponseSchema>;
