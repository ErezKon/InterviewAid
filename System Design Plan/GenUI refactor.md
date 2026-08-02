---
agent: devin-local
session: freezing-butter
created: 2026-08-02T14:20:57Z
---
# GenUI Chat Refactor — Interview Prep App

Refactor `app/` so the LLM chooses which Angular component renders each assistant reply (GenUI-style `{ component, message, inputs }` envelope), rendered via an NgComponentOutlet registry, with all four backend agents rebuilt on `createAgent` + `ChatOpenAI` instead of the deprecated `createReactAgent`.

---

## Confirmed Decisions (from user)

| Question | Decision |
|---|---|
| Render mechanism | **Registry + `NgComponentOutlet`** (`COMPONENT_REGISTRY` map + `<app-chat-component-host>`) |
| Response shape | **Single component per message** (GenUI style): `{ component, message, inputs }` |
| Agent topology | **Keep 4 agents** (problem-finder, mock-interview, subject-quiz, content-enricher), all rebuilt with `createAgent` + `ChatOpenAI`, all sharing one UI envelope `responseFormat` |
| Transport | **Keep SSE**; the `result` event carries the UI envelope from `structuredResponse` |
| Old chat history | **Wipe** (one-shot migration deletes `chat_messages`, `chat_threads`, `interview_sessions`) |
| Mode routing | **Keep dropdown + regex `detectMode()` as-is** |
| Scope | **Chat + reuse registry components in other pages** (problem-detail, subject-detail) |
| Component catalog | *(not answered — my judgment)* Full set: `text`, `chat-markdown-viewer`, `chat-quiz-cards`, `chat-problem-list`, `chat-hint-card`, `chat-interview-question`, `chat-evaluation-scorecard`, `chat-enrichment-report` — one per agent output shape, so all 4 agents are covered |

## Deliverable

After approval, this document is written to
`/home/sio/Code/Interview/System Design Plan/genui-chat-refactor-plan.md`
(joining the existing `Plan.md` / `system-design-plan.md`), then implementation proceeds step by step.

---

## Verified Facts About the Current Code

**Backend** (`app/backend`, ESM, `type: module`, all local imports end in `.js`):
- `langchain@1.5.4` is **already installed** in `app/node_modules` — `createAgent`, `toolStrategy`, `providerStrategy` are all exported from `langchain` (verified in `app/node_modules/langchain/dist/index.d.ts:43` and `dist/agents/responses.d.ts:105-166`). **No new dependencies are needed.**
- `createAgent` params (verified `app/node_modules/langchain/dist/agents/types.d.ts:515,599,608`): `model`, `tools`, `systemPrompt?: string | SystemMessage`, `checkpointer?`, `responseFormat?` → result is placed in the **`structuredResponse`** state key.
- 4 agents currently use `createReactAgent({ llm, tools, prompt: new SystemMessage(...) })`:
  <ref_file file="/home/sio/Code/Interview/app/backend/src/agents/problem-finder/problem-finder.agent.ts" />,
  <ref_file file="/home/sio/Code/Interview/app/backend/src/agents/mock-interview/mock-interview.agent.ts" />,
  <ref_file file="/home/sio/Code/Interview/app/backend/src/agents/subject-quiz/subject-quiz.agent.ts" />,
  <ref_file file="/home/sio/Code/Interview/app/backend/src/agents/content-enricher/content-enricher.agent.ts" />
- <ref_file file="/home/sio/Code/Interview/app/backend/src/agents/model-factory.ts" /> already returns `ChatOpenAI` for `provider: 'openai-like'` and the custom `ChatAnthropicVertex` for `anthropic-vertex`. `ChatAnthropicVertex` **implements `bindTools`** (<ref_snippet file="/home/sio/Code/Interview/app/backend/src/llm/chat-anthropic-vertex.ts" lines="42-47" />) so `toolStrategy(...)` works for it; it does **not** support native JSON-schema response format (`supportsStructuredOutput: false` in <ref_file file="/home/sio/Code/Interview/app/backend/src/config/models.ts" />).
- <ref_snippet file="/home/sio/Code/Interview/app/backend/src/routes/chat.routes.ts" lines="97-258" /> streams the agent, scrapes the last AI message string, `extractJson`s it, filters `structured.problems` slugs against the DB, persists an interview session from `structured.stage`, and emits SSE `meta|step|token|tool|result|done`.
- History is replayed from SQLite on every request (<ref_snippet file="/home/sio/Code/Interview/app/backend/src/routes/chat.routes.ts" lines="51-57" />) — the agent is created fresh per request, so a `MemorySaver` checkpointer would be dead weight (see "Deliberate deviations").
- Schema/migration entry point: <ref_snippet file="/home/sio/Code/Interview/app/backend/src/db/connection.ts" lines="24-50" />; chat tables at <ref_snippet file="/home/sio/Code/Interview/app/backend/src/db/schema.sql" lines="92-121" />.

**Frontend** (`app/frontend`, Angular 19.2, standalone components, `@ngrx/signals`, Angular Material):
- <ref_snippet file="/home/sio/Code/Interview/app/frontend/src/app/features/chat/chat-page/chat-page.component.ts" lines="90-283" /> is ~200 lines of heuristic JSON scraping (`resolveAnyStructured`, `extractJsonFromContent`, `formatStructuredAsMarkdown`, `hasQuizCards`, `hasSubjectContent`, …). **All of it is deleted** by this refactor.
- Existing reusable components: `ChatQuizCardsComponent` (inputs `questions`, `studyTips`) and `ChatMarkdownViewerComponent` (inputs `content`, `title`, `followUpSuggestions`, `disabled`; output `followUpClicked`).
- <ref_snippet file="/home/sio/Code/Interview/app/frontend/src/app/state/chat.store.ts" lines="128-181" /> handles SSE events and has its own fallback JSON extraction — also deleted.
- Markdown rendering duplication to consolidate: <ref_snippet file="/home/sio/Code/Interview/app/frontend/src/app/features/problems/problem-detail/problem-detail.component.html" lines="36-77" /> (6 blocks) and <ref_snippet file="/home/sio/Code/Interview/app/frontend/src/app/features/subjects/subject-detail/subject-detail.component.html" lines="13-13" />.

**Reference (GenUI)**: <ref_file file="/home/sio/Code/Interview/GenUI/server/schemas/chat-message.schema.ts" /> (envelope), <ref_snippet file="/home/sio/Code/Interview/GenUI/src/app/components/chat/chat.component.html" lines="16-58" /> (`@switch` dispatch we are replacing with a registry), <ref_file file="/home/sio/Code/Interview/GenUI/src/app/templates/chat.template.ts" /> (`<component-logic>` prompt block).

**Reference (my-agents)**: <ref_snippet file="/home/sio/Code/Interview/my-agents/src/agents/stocks/stocks.agent.ts" lines="101-160" /> (`ChatOpenAI` + `createAgent` + `responseFormat`), <ref_file file="/home/sio/Code/Interview/my-agents/src/agents/stocks/schemas/stocks-response.schema.ts" /> (`.describe()` on every field — copy this discipline), <ref_snippet file="/home/sio/Code/Interview/my-agents/src/cli.ts" lines="156-183" /> (how `structuredResponse` is dug out of a stream state).

---

## Deliberate Deviations From `my-agents` (do not "fix" these)

1. **Model construction stays in `model-factory.ts`.** `my-agents` does `new ChatOpenAI({...})` inline in each agent; this app must keep supporting `claude-opus-4.6` via `ChatAnthropicVertex`. `createChatModel()` still returns a real `ChatOpenAI` for `openai-like` — the user's requirement ("ChatOpenAI and createAgent") is satisfied.
2. **No `MemorySaver` checkpointer.** Agents are constructed per HTTP request, so an in-memory checkpointer would be empty every time. Conversation memory comes from SQLite replay, which already works.
3. **`responseFormat` strategy is provider-aware** — see Step 2.

---

## Target Data Contract

```
POST /api/chat  (unchanged request body)
      │
      ▼
 detectMode()  →  one of 4 agents (createAgent + responseFormat: chatUiResponseSchema)
      │
      ▼
 agent.stream()  →  ... → final state.structuredResponse
      │
      ▼
 SSE: event: result   data: { threadId, ui: ChatUiEnvelope }
      │
      ▼
 ChatStore stores msg.ui
      │
      ▼
 chat-page renders:  message text (markdown)
                     <app-chat-component-host [ui]="msg.ui" />
                     follow-up chips
```

```ts
interface ChatUiEnvelope {
  component: ChatComponentName;   // 'text' | 'chat-markdown-viewer' | ...
  message: string;                // always-shown conversational text (markdown)
  inputs: Record<string, unknown>;// flat bag; host filters to the component's declared keys
  followUpSuggestions: string[];
}
```

---

# STEP-BY-STEP IMPLEMENTATION PLAN

> Each step below is **self-contained and runnable in a fresh session**. Each lists: files touched, exact code, and acceptance checks. Do the steps **in order**. Do not skip the acceptance check at the end of a step.
>
> **Global rules for every step**
> - Working directory: `/home/sio/Code/Interview/app`.
> - Backend is ESM: **every relative import must end in `.js`** (e.g. `'./ui-response.schema.js'`), even though the file is `.ts`.
> - Backend uses `zod@^4`. Frontend uses Angular 19 standalone components, `input()` / `output()` signal APIs, and `@if` / `@for` control flow (no `*ngIf` / `*ngFor`).
> - Do **not** rename existing files unless a step says so. Do **not** touch `LeetCode/`, `Data/`, `GenUI/`, or `my-agents/`.
> - Never add npm dependencies. Everything needed is installed.

---

## STEP 1 — Backend: shared UI envelope schema

**Goal:** one Zod schema that all four agents use as `responseFormat`.

**Create `app/backend/src/agents/shared/ui-response.schema.ts`:**

```ts
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
```

**Create `app/backend/src/agents/shared/ui-response.prompt.ts`** (appended to every agent prompt — modelled on <ref_file file="/home/sio/Code/Interview/GenUI/src/app/templates/chat.template.ts" />):

```ts
export const UI_RESPONSE_PROMPT = `
## Response Format — Generative UI

You do not write free-form answers. You return a structured object describing WHICH UI
component the frontend should render and WHAT data to give it:

  { component, message, inputs, followUpSuggestions }

<component-logic>
  - "text" — plain conversational reply, clarifying question, apology, or error. inputs = {}.
  - "chat-markdown-viewer" — the user asked for source material / raw markdown / a study
    subject. Put the markdown in inputs.content and a heading in inputs.title.
  - "chat-problem-list" — you are recommending coding problems. Put them in inputs.problems
    and what you understood in inputs.interpretedFilters.
  - "chat-quiz-cards" — you generated quiz questions. Put them in inputs.questions, the
    source in inputs.subject, and tips in inputs.studyTips.
  - "chat-hint-card" — the user asked for a hint. Put hints in inputs.hints and the problem
    title in inputs.problemTitle. Never reveal the full solution.
  - "chat-interview-question" — you are asking the next mock-interview question. Fill
    inputs.stage, inputs.questionText, inputs.sessionProgress, inputs.nextAction.
  - "chat-evaluation-scorecard" — you are scoring the candidate's answer. Fill
    inputs.evaluation (1-5 per axis) and put the narrative in message.
  - "chat-enrichment-report" — you finished an enrichment run. Fill inputs.enrichment.
</component-logic>

<rules>
  - Exactly ONE component per reply. Pick the most specific one that fits.
  - ALWAYS write inputs.message — it is shown above the component.
  - Only fill the inputs fields the chosen component needs. Leave the rest out entirely.
  - Never invent problem slugs, subject ids, or quotes — only use values returned by tools.
  - If you are unsure or need more information, use "text" and ask a clarifying question.
  - followUpSuggestions: 0-4 short strings the user could click next.
</rules>
`;
```

**Acceptance:** `npx tsc --noEmit -p backend/tsconfig.json` passes (files are unused so far; only syntax/type errors matter).

---

## STEP 2 — Backend: provider-aware `responseFormat` helper

**Goal:** one helper that picks the right structured-output strategy per model.

**Edit `app/backend/src/agents/model-factory.ts`** — append (keep everything already there, including `extractJson`):

```ts
import { toolStrategy } from 'langchain';
import type { z } from 'zod';

/**
 * Pick the structured-output strategy for a model.
 * - openai-like (gpt-oss-120b): native JSON-schema response format — pass the Zod schema directly.
 * - anthropic-vertex (ChatAnthropicVertex): no native structured output, but bindTools() works,
 *   so force the schema through a synthetic tool call.
 */
export function createResponseFormat(def: ModelDef, schema: z.ZodTypeAny) {
  return def.supportsStructuredOutput ? schema : toolStrategy(schema);
}
```

> Verified: `toolStrategy` is exported from `langchain` (`app/node_modules/langchain/dist/index.d.ts:43`) and `ChatAnthropicVertex.bindTools` exists (<ref_snippet file="/home/sio/Code/Interview/app/backend/src/llm/chat-anthropic-vertex.ts" lines="42-47" />).

**Acceptance:** `npx tsc --noEmit -p backend/tsconfig.json` passes.

---

## STEP 3 — Backend: rebuild the 4 agents on `createAgent`

**Goal:** replace every `createReactAgent` with `createAgent` + `responseFormat`. Keep each factory's exported name and signature `(modelId?: string) => Promise<{ agent, def }>` so `chat.routes.ts` needs no change yet.

**Pattern** (mirrors <ref_snippet file="/home/sio/Code/Interview/my-agents/src/agents/stocks/stocks.agent.ts" lines="151-157" />). Full replacement for `app/backend/src/agents/problem-finder/problem-finder.agent.ts`:

```ts
import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createSearchProblemsTool } from '../shared/tools/search-problems.tool.js';
import { createListFiltersTool } from '../shared/tools/list-filters.tool.js';
import { createGetProblemTool } from '../shared/tools/get-problem.tool.js';
import { createGetProblemHintTool } from '../shared/tools/get-problem-hint.tool.js';
import { createSearchSubjectsTool } from '../shared/tools/search-subjects.tool.js';
import { createGetSubjectTool } from '../shared/tools/get-subject.tool.js';
import { chatUiResponseSchema } from '../shared/ui-response.schema.js';
import { PROBLEM_FINDER_SYSTEM_PROMPT } from './problem-finder.prompt.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('problem-finder');

export async function createProblemFinderAgent(modelId?: string): Promise<{ agent: any; def: any }> {
  const { def, model } = await createChatModel(modelId);
  log.info(`Creating Problem Finder agent with model ${def.id}`);

  const tools = [
    createListFiltersTool(),
    createSearchProblemsTool(),
    createGetProblemTool(),
    createGetProblemHintTool(),
    createSearchSubjectsTool(),
    createGetSubjectTool(),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: PROBLEM_FINDER_SYSTEM_PROMPT,
    responseFormat: createResponseFormat(def, chatUiResponseSchema),
  });

  return { agent, def };
}
```

Apply the identical transformation to the other three, keeping **their existing tool lists unchanged**:
- `mock-interview/mock-interview.agent.ts` — tools: list_filters, search_problems, get_problem, get_problem_hint; prompt `MOCK_INTERVIEW_SYSTEM_PROMPT`.
- `subject-quiz/subject-quiz.agent.ts` — tools: search_subjects, get_subject; prompt `SUBJECT_QUIZ_SYSTEM_PROMPT`.
- `content-enricher/content-enricher.agent.ts` — tools: scan_problems, read_problem_file, enrich_problem_file, update_problem_metadata, read_audit_report; prompt `CONTENT_ENRICHER_SYSTEM_PROMPT`.

Changes in each file: drop `import { createReactAgent } from '@langchain/langgraph/prebuilt'` and `import { SystemMessage } from '@langchain/core/messages'`; add `createAgent`, `createResponseFormat`, `chatUiResponseSchema`; `llm:` → `model:`; `prompt: new SystemMessage(X)` → `systemPrompt: X`; add `responseFormat`.

**Acceptance:**
- `grep -r "createReactAgent" app/backend/src` returns **nothing**.
- `npx tsc --noEmit -p backend/tsconfig.json` passes.

---

## STEP 4 — Backend: rewrite the 4 system prompts

**Goal:** every prompt keeps its domain rules but replaces its old "## Response Format" section with the shared UI block.

For each of the 4 `*.prompt.ts` files:
1. **Delete** the trailing `## Response Format` section (in problem-finder that is <ref_snippet file="/home/sio/Code/Interview/app/backend/src/agents/problem-finder/problem-finder.prompt.ts" lines="29-39" />; the others have equivalent sections).
2. **Keep** all domain rules above it verbatim.
3. **Append** the shared block.

```ts
import { UI_RESPONSE_PROMPT } from '../shared/ui-response.prompt.js';

export const PROBLEM_FINDER_SYSTEM_PROMPT = `You are an Interview Coach AI ...

## Rules
... (unchanged existing rules 1-11) ...
${UI_RESPONSE_PROMPT}

## Component Choice For This Agent
- Recommending problems      → "chat-problem-list"
- Returning source material  → "chat-markdown-viewer"
- Giving a hint              → "chat-hint-card"
- Explaining / clarifying    → "text"
`;
```

Per-agent "Component Choice" tail blocks:
- **mock-interview**: asking a question → `chat-interview-question`; scoring an answer → `chat-evaluation-scorecard`; giving a hint mid-interview → `chat-hint-card`; small talk / plan summary → `text`.
- **subject-quiz**: quiz generated → `chat-quiz-cards`; user asked for the subject text → `chat-markdown-viewer`; anything else → `text`.
- **content-enricher**: run finished → `chat-enrichment-report`; progress note or clarification → `text`.

Also update the problem-finder rule that says *"Include the markdown body in the `subjectContent` response field"* → *"set component to `chat-markdown-viewer` and put the markdown in `inputs.content`"*.

**Acceptance:** `grep -rn "subjectContent\|wrap your JSON in" app/backend/src/agents/*/*.prompt.ts` returns nothing.

---

## STEP 5 — Backend: rewrite `chat.routes.ts` around the envelope

**Goal:** extract `structuredResponse`, validate it, emit it on SSE, persist it.

**Edit `app/backend/src/routes/chat.routes.ts`.** Keep unchanged: `detectMode()`, thread creation, history replay, context enrichment, agent switch, `saveDebugDump`, SSE plumbing.

Add near the top:

```ts
import { chatUiResponseSchema, type ChatUiResponse } from '../agents/shared/ui-response.schema.js';

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
function validateProblemSlugs(env: ChatUiResponse): ChatUiResponse {
  if (!env.inputs?.problems?.length) return env;
  const db = getDb();
  const stmt = db.prepare('SELECT 1 FROM problems WHERE slug = ?');
  const kept = env.inputs.problems.filter(p => {
    const exists = stmt.get(p.slug);
    if (!exists) log.warn(`Dropped unknown slug: ${p.slug}`);
    return !!exists;
  });
  return { ...env, inputs: { ...env.inputs, problems: kept } };
}
```

In the **streaming branch**, replace the body of the `for await` loop's post-processing (currently lines ~112-182):

```ts
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
          sendSseEvent(res, 'token', { delta: content });   // full-content replace, as today
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

if (env.DEBUG_RUNS) saveDebugDump(agentName, { message: body.message, modelId: def.id }, JSON.stringify(envelope, null, 2));
clearInterval(heartbeat);
if (!closed) sendSseDone(res);
```

In the **non-streaming branch**, do the same and respond:

```ts
res.json({ data: { threadId, modelId: def.id, agent: agentName, ui: envelope } });
```

Note: the assistant row's `content` column now stores `envelope.message`, and `payload_json` stores the whole envelope — so reloading a thread restores the exact UI.

**Acceptance:** `npx tsc --noEmit -p backend/tsconfig.json` passes; `grep -n "structured\b" app/backend/src/routes/chat.routes.ts` shows only the new helpers.

---

## STEP 6 — Backend: one-shot chat-history wipe

**Goal:** old messages use the pre-refactor payload shape; delete them once.

**Edit `app/backend/src/db/schema.sql`** — append:

```sql
CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

**Edit `app/backend/src/db/connection.ts`** — add and call from `initSchema()` (after the statement loop):

```ts
const CHAT_SCHEMA_VERSION = '2';

/** One-shot: pre-v2 chat rows use the legacy structured payload and cannot be rendered. */
function migrateChatHistory(): void {
  const database = getDb();
  const row = database.prepare("SELECT value FROM app_meta WHERE key = 'chat_schema_version'").get() as
    | { value: string } | undefined;
  if (row?.value === CHAT_SCHEMA_VERSION) return;

  const tx = database.transaction(() => {
    database.exec('DELETE FROM chat_messages');
    database.exec('DELETE FROM interview_sessions');
    database.exec('DELETE FROM chat_threads');
    database
      .prepare("INSERT OR REPLACE INTO app_meta (key, value) VALUES ('chat_schema_version', ?)")
      .run(CHAT_SCHEMA_VERSION);
  });
  tx();
  log.warn('Chat history wiped — migrated to GenUI envelope schema v2');
}
```

Call `migrateChatHistory();` at the end of `initSchema()`, before `log.info('Schema initialized')`.

**Acceptance:** start the backend twice (`npm run dev -w backend`); the warning appears on the first start only.

---

## STEP 7 — Frontend: models + registry + host component

**Goal:** the dispatch mechanism, with zero components wired yet.

**Edit `app/frontend/src/app/core/models/chat.model.ts`** — add (keep `ChatThread`, `ModelInfo`, `ChatMode`, `SseEvent`):

```ts
export type ChatComponentName =
  | 'text'
  | 'chat-markdown-viewer'
  | 'chat-quiz-cards'
  | 'chat-problem-list'
  | 'chat-hint-card'
  | 'chat-interview-question'
  | 'chat-evaluation-scorecard'
  | 'chat-enrichment-report';

export interface ChatUiEnvelope {
  component: ChatComponentName;
  message: string;
  inputs: Record<string, any>;
  followUpSuggestions: string[];
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  payloadJson: string | null;
  createdAt: string;
  ui?: ChatUiEnvelope;     // replaces the old `structured?: any`
  streaming?: boolean;
}
```
Delete the old `structured?: any` field.

**Create `app/frontend/src/app/features/chat/component-registry.ts`:**

```ts
import { Type } from '@angular/core';
import { ChatComponentName } from '../../core/models/chat.model';
import { ChatTextComponent } from './components/chat-text/chat-text.component';
import { ChatMarkdownViewerComponent } from './chat-markdown-viewer/chat-markdown-viewer.component';
import { ChatQuizCardsComponent } from './chat-quiz-cards/chat-quiz-cards.component';
import { ChatProblemListComponent } from './components/chat-problem-list/chat-problem-list.component';
import { ChatHintCardComponent } from './components/chat-hint-card/chat-hint-card.component';
import { ChatInterviewQuestionComponent } from './components/chat-interview-question/chat-interview-question.component';
import { ChatEvaluationScorecardComponent } from './components/chat-evaluation-scorecard/chat-evaluation-scorecard.component';
import { ChatEnrichmentReportComponent } from './components/chat-enrichment-report/chat-enrichment-report.component';

export interface ChatComponentDef {
  component: Type<unknown>;
  /** Envelope `inputs` keys this component accepts. The host passes ONLY these,
   *  because ComponentRef.setInput() throws for undeclared inputs. */
  inputKeys: string[];
}

export const CHAT_COMPONENT_REGISTRY: Record<ChatComponentName, ChatComponentDef> = {
  'text':                      { component: ChatTextComponent,               inputKeys: [] },
  'chat-markdown-viewer':      { component: ChatMarkdownViewerComponent,     inputKeys: ['content', 'title'] },
  'chat-quiz-cards':           { component: ChatQuizCardsComponent,          inputKeys: ['questions', 'studyTips', 'subject'] },
  'chat-problem-list':         { component: ChatProblemListComponent,        inputKeys: ['problems', 'interpretedFilters'] },
  'chat-hint-card':            { component: ChatHintCardComponent,           inputKeys: ['hints', 'problemTitle'] },
  'chat-interview-question':   { component: ChatInterviewQuestionComponent,  inputKeys: ['stage', 'questionText', 'currentProblemSlug', 'hintsGiven', 'sessionProgress', 'nextAction'] },
  'chat-evaluation-scorecard': { component: ChatEvaluationScorecardComponent,inputKeys: ['evaluation'] },
  'chat-enrichment-report':    { component: ChatEnrichmentReportComponent,   inputKeys: ['enrichment'] },
};

export const FALLBACK_COMPONENT: ChatComponentName = 'text';
```

**Create `app/frontend/src/app/features/chat/chat-component-host/chat-component-host.component.ts`:**

```ts
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUiEnvelope } from '../../../core/models/chat.model';
import { CHAT_COMPONENT_REGISTRY, FALLBACK_COMPONENT } from '../component-registry';

@Component({
  selector: 'app-chat-component-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (def()) {
      <ng-container *ngComponentOutlet="def()!.component; inputs: resolvedInputs()" />
    }
  `,
})
export class ChatComponentHostComponent {
  ui = input.required<ChatUiEnvelope>();

  readonly def = computed(() => {
    const name = this.ui().component;
    return CHAT_COMPONENT_REGISTRY[name] ?? CHAT_COMPONENT_REGISTRY[FALLBACK_COMPONENT];
  });

  /** Only pass declared inputs — setInput() on an undeclared input throws NG0303. */
  readonly resolvedInputs = computed<Record<string, unknown>>(() => {
    const inputs = this.ui().inputs ?? {};
    const out: Record<string, unknown> = {};
    for (const key of this.def().inputKeys) {
      if (inputs[key] !== undefined && inputs[key] !== null) out[key] = inputs[key];
    }
    return out;
  });
}
```

> `ngComponentOutletInputs` is supported in Angular 19 (added v16.2). Filtering by `inputKeys` is what keeps a weak model from crashing the page when the LLM stuffs extra keys into `inputs`.

**Acceptance:** file compiles once Step 8 creates the components (do Step 8 next; don't run the build in between).

---

## STEP 8 — Frontend: build/adapt the 8 registry components

All live under `app/frontend/src/app/features/chat/`. All are **standalone, presentational, and have NO `@Output()`** — outputs cannot be bound through `NgComponentOutlet`, so follow-up chips are rendered by the chat page instead.

**8a. Modify `chat-markdown-viewer/chat-markdown-viewer.component.ts`** — remove `followUpSuggestions`, `disabled`, and the `followUpClicked` output; keep `content` and `title`. Remove the follow-up chip block from its `.html`. (Consumers: registry + problem-detail + subject-detail in Step 10.)

**8b. Modify `chat-quiz-cards/chat-quiz-cards.component.ts`** — add an optional `subject = input<{ id: string; title: string; sourceFile: string }>()` and render its title as a small caption above the cards. Everything else stays.

**8c. Create `components/chat-text/chat-text.component.ts`** — deliberately empty; the message text is rendered by the chat page:

```ts
@Component({
  selector: 'app-chat-text',
  standalone: true,
  template: '',
})
export class ChatTextComponent {}
```

**8d. Create `components/chat-problem-list/`** — `MatCard` list. Inputs:
```ts
problems = input<ProblemCard[]>([]);
interpretedFilters = input<{ companies: string[]; difficulties: string[]; topics: string[]; seniority: string | null }>();
```
Renders filter chips, then one card per problem: title (`routerLink="/problems/{{p.slug}}"`), a difficulty chip (`difficulty-easy|medium|hard` classes — reuse the SCSS from `chat-quiz-cards.component.scss`), topic/company chips, and the `why` line. Show "No matching problems." when empty.

**8e. Create `components/chat-hint-card/`** — inputs `hints = input<Hint[]>([])`, `problemTitle = input<string>()`. Each hint starts collapsed behind a "Reveal hint N" button (mirror the reveal pattern in <ref_snippet file="/home/sio/Code/Interview/app/frontend/src/app/features/chat/chat-quiz-cards/chat-quiz-cards.component.ts" lines="59-65" />), then shows the text through `MarkdownService`.

**8f. Create `components/chat-interview-question/`** — inputs `stage`, `questionText`, `currentProblemSlug`, `hintsGiven`, `sessionProgress`, `nextAction`. Renders a stage chip, a `MatProgressBar` for `sessionProgress.step / total`, the question via `MarkdownService`, a hints-given counter, and a footer line derived from `nextAction`.

**8g. Create `components/chat-evaluation-scorecard/`** — input `evaluation`. Four labelled `MatProgressBar` rows (correctness / complexity / communication / edge cases, value `score * 20`), an average score badge, and the `notes` text.

**8h. Create `components/chat-enrichment-report/`** — input `enrichment`. Two stat tiles (`filesScanned`, `filesEnriched`), the `auditSummary` via `MarkdownService`, and a `MatTable`-free simple list of `items` with a status icon (`check_circle` / `remove_circle` / `error`).

Each component gets `.ts` + `.html` + `.scss`. Keep SCSS minimal and consistent with existing chat SCSS (CSS custom properties from `styles.scss`, no hard-coded light-mode colours — the app has a `ThemeService`).

**Acceptance:** `npm run build -w frontend` succeeds.

---

## STEP 9 — Frontend: rewrite the store and the chat page

**9a. Edit `app/frontend/src/app/state/chat.store.ts`:**
- Delete the module-level `extractJsonFromContent` helper entirely.
- `loadThread`: map each message's `payloadJson` into `ui`:
  ```ts
  const messages = data.messages.map(m => {
    if (m.role === 'assistant' && m.payloadJson) {
      try { return { ...m, ui: JSON.parse(m.payloadJson) as ChatUiEnvelope }; } catch { /* ignore */ }
    }
    return m;
  });
  ```
- `send`: in the SSE switch —
  - `'token'`: keep replacing `content` (live streaming text while tools run).
  - `'result'`: `msgs[lastIdx] = { ...msgs[lastIdx], ui: data.ui, content: data.ui.message, streaming: false };`
  - `'done'`: if `!msg.ui`, set `ui = { component: 'text', message: msg.content, inputs: {}, followUpSuggestions: [] }` so the bubble is never blank; then `streaming: false`.
  - `'error'`, `'meta'`, `'step'`, `'tool'`: unchanged.

**9b. Rewrite `app/frontend/src/app/features/chat/chat-page/chat-page.component.ts`** — delete `resolvedDataCache`, `resolveAnyStructured`, `resolveQuizStructured`, `tryParseJson`, `extractJsonFromContent`, `getDisplayContent`, `formatStructuredAsMarkdown`, `humanizeKey`, `hasQuizCards`, `getQuizQuestions`, `getStudyTips`, `hasSubjectContent`, `getSubjectContent`, `getFollowUpSuggestions`. What remains:

```ts
imports: [
  CommonModule, FormsModule,
  MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatListModule, MatProgressBarModule,
  MatSidenavModule, MatMenuModule, MatTooltipModule, ClipboardModule,
  MermaidDirective, ChatComponentHostComponent,
],
// ...
renderMd(text: string | null | undefined): string { return this.md.render(text); }

uiFor(msg: ChatMessage): ChatUiEnvelope | null {
  return msg.ui ?? null;
}

followUpsFor(msg: ChatMessage): string[] {
  return msg.streaming ? [] : (msg.ui?.followUpSuggestions ?? []);
}

sendFollowUp(text: string): void { this.userInput.set(text); this.sendMessage(); }
```
(`ngOnInit`, `ngAfterViewChecked`, `onSend`, `sendMessage`, `copyMessage` are unchanged.)

**9c. Rewrite the message loop in `chat-page.component.html`** (replaces lines 53-96):

```html
@for (msg of chatStore.messages(); track msg.id) {
  <div class="message" [class]="'message-' + msg.role">
    <div class="message-header">
      <span class="message-role">{{ msg.role === 'user' ? 'You' : 'Assistant' }}</span>
      @if (msg.content && !msg.streaming) {
        <button mat-icon-button class="copy-btn" matTooltip="Copy to clipboard"
                (click)="copyMessage(msg.content)">
          <mat-icon>content_copy</mat-icon>
        </button>
      }
    </div>

    @if (msg.role === 'user' || !uiFor(msg)) {
      @if (msg.content) {
        <div class="message-content markdown-body" appMermaid [innerHTML]="renderMd(msg.content)"></div>
      }
    } @else {
      @if (uiFor(msg)!.message) {
        <div class="message-content markdown-body" appMermaid [innerHTML]="renderMd(uiFor(msg)!.message)"></div>
      }
      <app-chat-component-host [ui]="uiFor(msg)!" />
    }

    @if (followUpsFor(msg).length > 0) {
      <div class="follow-up-suggestions">
        @for (s of followUpsFor(msg); track s) {
          <button mat-stroked-button class="follow-up-chip"
                  [disabled]="chatStore.streaming()" (click)="sendFollowUp(s)">{{ s }}</button>
        }
      </div>
    }

    @if (msg.streaming) { <span class="typing-indicator">...</span> }
  </div>
}
```

**9d. Update `chat-page.component.spec.ts`** — the existing test calls `component.renderMd('# test')`, which still exists, so it should pass unchanged. Remove any test referencing the deleted helpers; add one asserting `uiFor()` returns `null` for a user message.

**Acceptance:** `npm run build -w frontend` succeeds; `grep -rn "structured" app/frontend/src/app/state/chat.store.ts app/frontend/src/app/features/chat` returns nothing.

---

## STEP 10 — Frontend: reuse registry components in other pages

**10a. `features/problems/problem-detail/problem-detail.component.html`** — replace each of the 6 blocks
```html
<div class="markdown-body" appMermaid [innerHTML]="renderMd(d.descriptionMd)"></div>
```
with
```html
<app-chat-markdown-viewer [content]="d.descriptionMd ?? ''" />
```
Add `ChatMarkdownViewerComponent` to `imports`; drop `MermaidDirective` from imports if it becomes unused; keep `renderMd()` only if still referenced (it is used by the spec — keep it).

**10b. `features/subjects/subject-detail/subject-detail.component.html`** — same substitution for the single body block, passing the raw markdown (not `renderedBody()`).

**10c.** Leave `quiz-page` alone — it is store-driven with a different interaction model (answer submission, scoring across a session) and sharing `chat-quiz-cards` there would regress functionality.

**Acceptance:** `npm run build -w frontend` succeeds; both detail pages still render markdown, code highlighting, and mermaid diagrams.

---

## STEP 11 — Verification

Run from `/home/sio/Code/Interview/app`:

```bash
npx tsc --noEmit -p backend/tsconfig.json     # backend types
npm test -w backend                            # tsx --test on *.test.ts
npm run build -w frontend                      # Angular production build
```

Manual smoke test (backend on :3100, frontend `npm run dev -w frontend`):

| # | Action | Expected |
|---|---|---|
| 1 | First backend start | log: `Chat history wiped — migrated to GenUI envelope schema v2`; thread list empty |
| 2 | Mode **Find Problems**: "hard graph problems asked at Google" | `chat-problem-list` renders with filter chips; every slug links to a real `/problems/:slug` |
| 3 | Mode **Find Problems**: "show me the raw markdown on agent memory" | `chat-markdown-viewer` renders |
| 4 | Mode **Find Problems**: "give me a hint for two-sum" | `chat-hint-card` with collapsed hints |
| 5 | Mode **Subject Quiz**: "quiz me on vector databases" | `chat-quiz-cards` with working reveal/score |
| 6 | Mode **Mock Interview**: "interview me for a senior backend role" | `chat-interview-question` with progress bar; after an answer, `chat-evaluation-scorecard` |
| 7 | Anything conversational | `text` — message renders, no empty component slot |
| 8 | Reload the page, reopen the thread | identical components re-render from `payload_json` |
| 9 | Switch model to `claude-opus-4.6`, repeat #2 | still a valid envelope (via `toolStrategy`) |
| 10 | Force a bad response (temporarily break the prompt) | graceful `text` fallback, no blank bubble, warning in server log |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| `gpt-oss-120b` ignores the schema or returns prose | `toEnvelope()` triple fallback: `safeParse` → `extractJson` → `text` envelope. Never throws. |
| `ChatAnthropicVertex` has no native structured output | `createResponseFormat()` routes it through `toolStrategy()`, which only needs `bindTools` — already implemented. |
| `NgComponentOutlet` throws `NG0303` on unknown inputs | Host filters by the registry's `inputKeys`; extra LLM keys are silently dropped. |
| Streaming `token` events now conflict with the final envelope | `result` overwrites `content` with `envelope.message`; the streamed text is only a progress affordance. |
| Flat `inputs` bag lets the model fill the wrong fields | Every field's `.describe()` states which component requires it, plus the `<component-logic>` prompt block; unused keys are filtered out client-side anyway. |
| Wiping history is irreversible | Explicitly requested. The DB file is at `app/backend/data/interview.db` — back it up first if you want a rollback. |
| Adding a 9th component later | Two edits: add to `CHAT_COMPONENTS` (backend) and to `CHAT_COMPONENT_REGISTRY` (frontend). Keep the lists in sync — noted in a comment in both files. |

## Files Touched (summary)

**Backend — new (2):** `agents/shared/ui-response.schema.ts`, `agents/shared/ui-response.prompt.ts`
**Backend — modified (11):** `agents/model-factory.ts`, the 4 `*.agent.ts`, the 4 `*.prompt.ts`, `routes/chat.routes.ts`, `db/connection.ts`, `db/schema.sql`
**Backend — deleted (3):** `problem-finder.schema.ts`, `mock-interview.schema.ts`, `subject-quiz.schema.ts` *(superseded by the shared envelope; delete only after confirming nothing else imports them)*

**Frontend — new (8):** `features/chat/component-registry.ts`, `features/chat/chat-component-host/`, and 6 components under `features/chat/components/`
**Frontend — modified (8):** `core/models/chat.model.ts`, `state/chat.store.ts`, `chat-page.component.{ts,html,spec.ts}`, `chat-markdown-viewer.component.{ts,html}`, `chat-quiz-cards.component.{ts,html}`, `problem-detail.component.{ts,html}`, `subject-detail.component.{ts,html}`

**No dependency changes in either package.json.**
