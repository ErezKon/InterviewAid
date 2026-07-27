# Interview Prep Platform — Design & Implementation Plan

Build a monorepo in `/home/sio/Code/Interview` with a Node/TypeScript backend (non-agentic REST over an LLM-classified SQLite index of the existing markdown, plus OpenAI-like and Anthropic agents ported from `/home/sio/Code/agents`) and an Angular 18+ frontend (Angular Material + NgRx Signal Store) offering a metadata filter screen and a streaming chat that can fetch matching problems or run a mock interview.

## Confirmed Decisions

- **Agents code**: copy/port the needed pieces into the new backend; `/home/sio/Code/agents` stays untouched as reference.
- **Storage**: SQLite (`better-sqlite3`) + FTS5, built by an indexer script; also emits JSON metadata for inspection.
- **Classification**: LLM classifies **all** problems (`gpt-oss-120b`), results committed to disk so it runs once.
- **Included**: SSE streaming chat, persisted chat + mock-interview sessions, theory subjects in the filter screen, Docker Compose + tests.
- **Plan artifact**: after approval, copy this document to `/home/sio/Code/Interview/System Design Plan/system-design-plan.md`.

## Existing Content Facts (verified)

- `LeetCode/problems_data.json` — map keyed by problem id: `{ id, title, difficulty ("Easy"|"Medium"|"Hard"), url, acceptance ("39.1%"), companies: { "amazon": "12.5%", ... } }`. **No topic tags** → this is why the LLM classification pass exists.
- `LeetCode/Problems/*.md` — 3,415 files named `<Title>.md`. Header block: `# <id>. <Title>`, `**Difficulty:**`, `**Acceptance:**`, `**LeetCode:**`, `**Companies:** A, B, C`. Body sections numbered `## 1. Problem Description`, `## 2. Examples`, `## N. Approach ...`, `## Walkthrough`, `## Complexity Analysis`, `## Follow-Up Questions`, `## Key Takeaway` (see `@/home/sio/Code/Interview/LeetCode/Problems/3Sum.md:1-234`).
- `LeetCode/Raw By Company/<company>/` — 1,654 entries; used only to cross-check company names.
- Theory files at repo root: `interview-materials-summary.md` (89 KB, `## N. Title` sections → each becomes a subject), `AI-Harness-in-detail.md`, `LRU and LFU cache algorithms.md`, `Call Center Problem.md`, `Local Min-Max problem.md`, `SKILL.md`.
- Reference implementations to port: `@/home/sio/Code/agents/src/utils/chat-anthropic-vertex.ts`, `@/home/sio/Code/agents/src/utils/dell-auth.util.ts:17-85`, `@/home/sio/Code/agents/src/utils/log-colors.util.ts`, agent factory pattern `@/home/sio/Code/agents/src/agents/stocks/stocks.agent.ts:25-68`, tool pattern `@/home/sio/Code/agents/src/agents/stocks/tools/search-stock.tool.ts:7-50`, Anthropic factory `@/home/sio/Code/agents/src/agents/anthropic-agent/anthropic.agent.ts:6-24`, Express+stream endpoint `@/home/sio/Code/agents/src/index.ts:866-912`.

---

# 1. Repository Layout & Tooling

**1.1** Create directories (do not move/rename any existing markdown; content stays where it is):

```
/home/sio/Code/Interview/
├── System Design Plan/system-design-plan.md   (this doc, copied)
├── LeetCode/                                  (existing, read-only)
├── *.md                                       (existing theory files, read-only)
└── app/
    ├── package.json                (npm workspaces root: ["backend","frontend"])
    ├── docker-compose.yml
    ├── .env.example
    ├── README.md
    ├── backend/
    │   ├── package.json  tsconfig.json  Dockerfile  .dockerignore
    │   ├── data/                       (generated: interview.db, metadata/*.json — gitignored except taxonomy)
    │   └── src/
    │       ├── index.ts                (Express bootstrap)
    │       ├── config/env.ts  config/models.ts  config/paths.ts
    │       ├── db/{connection.ts,schema.sql,queries.ts}
    │       ├── indexer/{run-index.ts,parse-problem-md.ts,parse-theory-md.ts,classify-with-llm.ts,taxonomy.ts,build-db.ts}
    │       ├── routes/{problems.routes.ts,subjects.routes.ts,filters.routes.ts,models.routes.ts,chat.routes.ts,sessions.routes.ts,health.routes.ts}
    │       ├── services/{problem.service.ts,subject.service.ts,session.service.ts,sse.service.ts}
    │       ├── agents/
    │       │   ├── model-factory.ts
    │       │   ├── shared/tools/{search-problems.tool.ts,get-problem.tool.ts,list-filters.tool.ts,get-problem-hint.tool.ts,search-subjects.tool.ts,get-subject.tool.ts}
    │       │   ├── problem-finder/{problem-finder.agent.ts,problem-finder.prompt.ts,problem-finder.schema.ts}
    │       │   ├── mock-interview/{mock-interview.agent.ts,mock-interview.prompt.ts,mock-interview.schema.ts}
    │       │   └── subject-quiz/{subject-quiz.agent.ts,subject-quiz.prompt.ts,subject-quiz.schema.ts}
    │       ├── llm/{chat-anthropic-vertex.ts,dell-auth.util.ts}   (ported)
    │       ├── types/{problem.types.ts,chat.types.ts,api.types.ts}
    │       └── utils/{log-colors.util.ts,logger.ts,errors.ts}
    └── frontend/                        (Angular CLI project, see §5)
```

**1.2** Backend deps: `express@^5`, `better-sqlite3`, `zod@^4`, `dotenv`, `cors`, `langchain@^1`, `@langchain/core@^1`, `@langchain/openai@^1`, `@langchain/langgraph@^1`, `gray-matter` (optional), `marked` (optional for HTML preview).
Dev deps: `typescript@^5.9`, `tsx`, `@types/node`, `@types/express`, `@types/better-sqlite3`.
Pin the same major versions used by `@/home/sio/Code/agents/package.json:20-49` to avoid LangChain API drift.

**1.3** Backend npm scripts:
- `dev`: `NODE_TLS_REJECT_UNAUTHORIZED=0 tsx watch src/index.ts`
- `index:parse`: `tsx src/indexer/run-index.ts --stage=parse`
- `index:classify`: `tsx src/indexer/run-index.ts --stage=classify`
- `index:build`: `tsx src/indexer/run-index.ts --stage=build`
- `index:all`: parse → classify → build
- `test`: `tsx --test $(find src -name '*.test.ts')`

**1.4** `.env.example` (backend): `PORT=3100`, `CONTENT_ROOT=/home/sio/Code/Interview`, `DB_PATH=./data/interview.db`, `DELL_CLIENT_ID=`, `DELL_CLIENT_SECRET=`, `AIA_API_KEY=`, `AIA_OPENAI_BASE_URL=https://aia.gateway.dell.com/genai/dev/v1`, `AIA_VERTEX_BASE_URL=https://aia.gateway.dell.com/genai/gcp-dev/v1`. `config/env.ts` validates with zod and fails fast with a readable message.

---

# 2. Research & Indexing Phase (run once, output committed)

## 2.1 Taxonomy (`indexer/taxonomy.ts`)

Fixed, closed list — the LLM must pick only from these `id`s.

| id | label |
|---|---|
| `arrays-hashing` | Arrays & Hashing |
| `two-pointers` | Two Pointers |
| `sliding-window` | Sliding Window |
| `string-manipulation` | String Manipulation |
| `stack-queue` | Stack & Queue |
| `linked-list` | Linked List |
| `binary-search` | Binary Search |
| `trees` | Trees & BST |
| `tries` | Tries |
| `heap-priority-queue` | Heap / Priority Queue |
| `graphs` | Graphs |
| `backtracking` | Backtracking |
| `dynamic-programming` | Dynamic Programming |
| `greedy` | Greedy |
| `intervals` | Intervals |
| `math-geometry` | Math & Geometry |
| `bit-manipulation` | Bit Manipulation |
| `data-structures-design` | Data Structure Design |
| `concurrency` | Concurrency & Multithreading |
| `sql-database` | SQL / Database |
| `shell-scripting` | Shell Scripting |
| `system-design` | System Design |
| `oop-design` | OOP / Low-Level Design |
| `theory-ai` | AI / LLM / Agents Theory |
| `theory-architecture` | Architecture & Practices Theory |

Also export `DIFFICULTIES = ['Easy','Medium','Hard']` and `SENIORITY = ['junior','mid','senior','staff','principal']`.

## 2.2 Stage `parse` — `parse-problem-md.ts`

For each file in `LeetCode/Problems/*.md`:
- Parse first heading `# <id>. <title>` (fallback: filename as title, `id = null`).
- Parse `**Difficulty:**` (strip emoji), `**Acceptance:**` → float, `**LeetCode:**` → url, `**Companies:**` → split on `,`, trim, lowercase slug.
- Split body by `^## ` into `{heading, body}` sections. Derive:
  - `descriptionMd` = section matching `/problem description/i`
  - `examplesMd` = `/examples/i`
  - `solutionMd` = concat of `/approach|solution|walkthrough/i`
  - `complexityMd` = `/complexity/i`
  - `followUpsMd` = `/follow-up/i`
  - `takeawayMd` = `/key takeaway/i`
- Merge with `problems_data.json` by `id` (fallback: normalized title match). `problems_data.json` wins for `difficulty`/`acceptance`/company **percentages**; md `Companies:` list fills gaps.
- Output `data/metadata/problems.raw.json`: array of `RawProblem`.
- Also emit `data/metadata/parse-report.json` with counts and any files that failed to parse (must be a list, never a crash).

**`parse-theory-md.ts`**: for each root theory md, split into `## ` sections; a subject = `{ id: slug(file + '#' + heading), sourceFile, title, level, bodyMd, wordCount }`. `interview-materials-summary.md` yields ~24 subjects. Output `data/metadata/subjects.raw.json`.

## 2.3 Stage `classify` — `classify-with-llm.ts`

- Model: `gpt-oss-120b` via `ChatOpenAI` (`baseURL` = `AIA_OPENAI_BASE_URL`, `apiKey` = `AIA_API_KEY`), `temperature: 0`.
- **Batching**: 25 problems per request. Input per problem: `id`, `title`, `difficulty`, and the first 600 chars of `descriptionMd`.
- **Structured output**: `withStructuredOutput(zod)`:
```ts
z.object({ results: z.array(z.object({
  id: z.string(),
  topics: z.array(z.enum(TAXONOMY_IDS)).min(1).max(3),
  primaryTopic: z.enum(TAXONOMY_IDS),
  patterns: z.array(z.string()).max(4),          // e.g. "sort + two pointers", "monotonic stack"
  seniority: z.enum(SENIORITY),
  interviewValue: z.number().min(1).max(5),
  oneLiner: z.string().max(200),
})) })
```
- **Resumability (mandatory)**: append each batch result to `data/metadata/classification.jsonl` immediately; on startup skip ids already present. Retry a failed batch 3× with exponential backoff, then split the batch in half, then record the batch in `classification.errors.json` and continue.
- Concurrency 4 batches (≈137 batches total). Log progress `[classify] 250/3415`.
- Finally fold JSONL into `data/metadata/problems.classified.json`.
- Same pass for subjects with `topics ⊂ {theory-ai, theory-architecture, system-design, ...}` plus generated `keyConcepts: string[]`.
- **Commit** `problems.classified.json` and `subjects.classified.json` to git so the pass never needs rerunning; `--force` flag re-classifies.

## 2.4 Stage `build` — SQLite schema (`db/schema.sql`)

```sql
PRAGMA journal_mode = WAL;

CREATE TABLE problems (
  slug TEXT PRIMARY KEY,           -- kebab title, stable id
  leetcode_id INTEGER,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy','Medium','Hard')),
  acceptance REAL,
  url TEXT,
  file_path TEXT NOT NULL,         -- relative to CONTENT_ROOT
  primary_topic TEXT NOT NULL,
  seniority TEXT,
  interview_value INTEGER,
  one_liner TEXT,
  has_solution INTEGER NOT NULL DEFAULT 0,
  description_md TEXT, examples_md TEXT, solution_md TEXT,
  complexity_md TEXT, follow_ups_md TEXT, takeaway_md TEXT,
  updated_at TEXT NOT NULL
);
CREATE TABLE topics   (id TEXT PRIMARY KEY, label TEXT NOT NULL, kind TEXT NOT NULL);
CREATE TABLE companies(slug TEXT PRIMARY KEY, name TEXT NOT NULL, problem_count INTEGER DEFAULT 0);
CREATE TABLE problem_topics    (problem_slug TEXT, topic_id TEXT, PRIMARY KEY (problem_slug, topic_id));
CREATE TABLE problem_companies (problem_slug TEXT, company_slug TEXT, frequency REAL, PRIMARY KEY (problem_slug, company_slug));
CREATE TABLE problem_patterns  (problem_slug TEXT, pattern TEXT, PRIMARY KEY (problem_slug, pattern));

CREATE TABLE subjects (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, source_file TEXT NOT NULL,
  heading_level INTEGER, primary_topic TEXT, key_concepts TEXT, -- JSON array
  word_count INTEGER, body_md TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE subject_topics (subject_id TEXT, topic_id TEXT, PRIMARY KEY (subject_id, topic_id));

CREATE VIRTUAL TABLE problems_fts USING fts5(
  slug UNINDEXED, title, one_liner, description_md, solution_md, patterns,
  tokenize='porter unicode61'
);
CREATE VIRTUAL TABLE subjects_fts USING fts5(
  id UNINDEXED, title, key_concepts, body_md, tokenize='porter unicode61'
);

-- session persistence (§4.6)
CREATE TABLE chat_threads  (id TEXT PRIMARY KEY, title TEXT, mode TEXT NOT NULL, model_id TEXT NOT NULL, created_at TEXT, updated_at TEXT);
CREATE TABLE chat_messages (id TEXT PRIMARY KEY, thread_id TEXT NOT NULL, role TEXT NOT NULL, content TEXT NOT NULL, payload_json TEXT, created_at TEXT);
CREATE TABLE interview_sessions (
  id TEXT PRIMARY KEY, thread_id TEXT NOT NULL, target_company TEXT, target_role TEXT,
  plan_json TEXT NOT NULL, current_step INTEGER DEFAULT 0, stage TEXT, status TEXT, created_at TEXT, updated_at TEXT
);

CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_primary_topic ON problems(primary_topic);
CREATE INDEX idx_pc_company ON problem_companies(company_slug);
CREATE INDEX idx_pt_topic ON problem_topics(topic_id);
CREATE INDEX idx_msg_thread ON chat_messages(thread_id, created_at);
```

**2.5** `build-db.ts`: drop & recreate content tables inside one transaction (never touch chat/session tables), insert rows from the classified JSON, populate FTS, recompute `companies.problem_count`, then `VACUUM`. Print a summary table (problems, subjects, companies, topics, orphan rows). Re-running must be idempotent.

**2.6** Also write human-readable `data/metadata/filters.json` = `{ companies: [{slug,name,problemCount}], difficulties, topics: [{id,label,problemCount}], seniority }` — this is the file the non-agentic filter dropdowns are seeded from (served from DB, cached in memory).

---

# 3. Backend — Non-Agentic REST API

Base `/api`. All responses `{ data, meta? }`; errors `{ error: { code, message, details? } }`. Every query object validated by a zod schema in `types/api.types.ts`. CORS enabled (mirror `@/home/sio/Code/agents/src/index.ts:49-58`).

**3.1** `GET /api/health` → `{ status:'ok', dbPath, problemCount, subjectCount, indexedAt }`.

**3.2** `GET /api/filters` → contents of §2.6 (in-memory cached, 60 s TTL).

**3.3** `GET /api/problems` — the core filter endpoint.
Query params (all optional, repeatable → CSV or repeated key):
`companies`, `difficulties`, `topics`, `patterns`, `seniority`, `minAcceptance`, `maxAcceptance`, `minInterviewValue`, `hasSolution`, `q` (FTS), `matchMode=any|all` (default `any`, applies to companies & topics), `sort=title|difficulty|acceptance|interviewValue|companyFrequency` (default `interviewValue`), `order=asc|desc`, `page` (1-based), `pageSize` (default 25, max 100).
Behavior: build one parameterized SQL statement; `matchMode=all` uses `GROUP BY ... HAVING COUNT(DISTINCT x) = :n`; `q` joins `problems_fts MATCH`. Return list items **without** heavy md bodies:
```ts
interface ProblemListItem { slug; leetcodeId; title; difficulty; acceptance; url;
  primaryTopic; topics: string[]; patterns: string[]; seniority; interviewValue;
  oneLiner; hasSolution; companies: {slug;name;frequency}[]; }
```
`meta`: `{ page, pageSize, total, totalPages, appliedFilters }`.

**3.4** `GET /api/problems/:slug` → full record incl. all md sections + `rawMarkdown` (read from `file_path`, fall back to DB columns) + `relatedSlugs` (same `primary_topic`, nearest `interview_value`, limit 5).

**3.5** `GET /api/problems/:slug/solution` → `{ solutionMd, complexityMd, followUpsMd, takeawayMd }` (lets the UI gate spoilers behind a click).

**3.6** `GET /api/problems/random?difficulties=&topics=&companies=` → one random matching problem (used by "surprise me").

**3.7** `GET /api/subjects` — filters `topics`, `sourceFile`, `q`, pagination; returns `{id,title,sourceFile,primaryTopic,topics,keyConcepts,wordCount}`.
`GET /api/subjects/:id` → full `bodyMd`.

**3.8** `GET /api/companies?q=&limit=` → typeahead for the multiselect (1,600+ companies, so the UI must not load all at once for search; it loads the full list once for the dropdown but filters server-side when `q` is present).

**3.9** `GET /api/models` → model registry (§4.1) so the UI dropdown is data-driven.

**3.10** Cross-cutting: request-id logger (`utils/logger.ts` using ported `log-colors.util.ts`), 404 handler, error middleware that maps `ZodError`→400 and unknown→500, `helmet`-style basic headers optional.

---

# 4. Backend — Agentic Layer

## 4.1 Model registry (`config/models.ts`) — single place to extend

```ts
export type Provider = 'openai-like' | 'anthropic-vertex';
export interface ModelDef { id: string; label: string; provider: Provider;
  supportsTools: boolean; supportsStructuredOutput: boolean;
  defaultTemperature: number; maxTokens: number; }

export const MODELS: ModelDef[] = [
  { id:'gpt-oss-120b',    label:'GPT-OSS 120B',   provider:'openai-like',     supportsTools:true, supportsStructuredOutput:true,  defaultTemperature:0.3, maxTokens:4096 },
  { id:'claude-opus-4.6', label:'Claude Opus 4.6', provider:'anthropic-vertex', supportsTools:true, supportsStructuredOutput:false, defaultTemperature:0.5, maxTokens:4096 },
];
export const DEFAULT_MODEL_ID = 'gpt-oss-120b';
export const getModel = (id?: string) => MODELS.find(m => m.id === id) ?? MODELS[0];
```
Adding a model later = one array entry, nothing else. (Note: user wrote "claude-opus-4.6"; the gateway id is `claude-opus-4.6` per `@/home/sio/Code/agents/src/anthropic-agent-cli.ts:35` — expose the pretty label in the UI, use the gateway id on the wire.)

## 4.2 `agents/model-factory.ts`

```ts
export async function createChatModel(modelId?: string) {
  const def = getModel(modelId);
  if (def.provider === 'anthropic-vertex') {
    const token = await getDellAccessToken();
    return { def, model: new ChatAnthropicVertex({ accessToken: token, model: def.id,
      temperature: def.defaultTemperature, maxTokens: def.maxTokens }) };
  }
  return { def, model: new ChatOpenAI({ model: def.id, apiKey: env.AIA_API_KEY,
    temperature: def.defaultTemperature, maxRetries: 3, timeout: 60000,
    configuration: { baseURL: env.AIA_OPENAI_BASE_URL } }) };
}
```
Port `chat-anthropic-vertex.ts` and `dell-auth.util.ts` verbatim into `src/llm/`. Agent factories accept `modelId` and are **provider-agnostic** — the only provider-dependent choice is `responseFormat`: pass the zod schema only when `def.supportsStructuredOutput`, otherwise instruct JSON output in the prompt and parse defensively (`extractJson()` helper that strips ``` fences and falls back to returning raw text).

## 4.3 Shared tools (`agents/shared/tools/`) — LangChain `tool()` pattern per `@/home/sio/Code/agents/src/agents/stocks/tools/search-stock.tool.ts:7-50`

All tools call the **same service layer** as the REST API (`services/problem.service.ts`), never re-implement SQL, and return a JSON string. Each logs `INPUT`/`OUTPUT` with a colored tag.

1. `search_problems` — `{ query?, companies?, difficulties?, topics?, patterns?, seniority?, matchMode?, minInterviewValue?, limit? (default 10, max 25) }` → compact list (`slug,title,difficulty,primaryTopic,oneLiner,topCompanies`). Description tells the model to resolve free-text company/topic names via `list_filters` first.
2. `list_filters` — `{ kind: 'companies'|'topics'|'difficulties', q? }` → canonical slugs, so the agent maps "Dell"→`dell`, "system design"→`system-design`.
3. `get_problem` — `{ slug, include: ('description'|'examples'|'solution'|'complexity'|'followUps')[] }` → requested sections only (token control). **Default excludes `solution`.**
4. `get_problem_hint` — `{ slug, hintLevel: 1|2|3 }` → level 1 = restate + observations, 2 = pattern/technique name + data structure, 3 = step outline without final code. Implemented by returning the relevant md plus a strict instruction in the tool result: *"Deliver only hint level N; never reveal full code."*
5. `search_subjects` — `{ query, topics?, limit? }` → subject list.
6. `get_subject` — `{ id, maxChars? (default 12000) }` → `bodyMd`, truncated on section boundaries.

## 4.4 Agent A — Problem Finder / Interview Coach (`agents/problem-finder/`)

- **Purpose**: handle prompts like *"I am interviewing for a senior software developer at Dell, give me difficult questions about data structures and system design, that were asked by Dell, Microsoft, Google, Amazon"*.
- Tools: `list_filters`, `search_problems`, `get_problem`, `get_problem_hint`, `search_subjects`.
- Prompt requirements (`problem-finder.prompt.ts`): extract role/seniority → `seniority`; company names → slugs via `list_filters`; "difficult/hard" → `Hard` (+`Medium` when few results); topic words → taxonomy ids; **always call `list_filters` before `search_problems` for named entities**; use `matchMode:'any'` for companies and `'all'` only when the user says "and"; if 0 results, relax one filter at a time and say what was relaxed; never invent problems that are not in tool output; never reveal solutions unless asked, offer hints instead.
- Response schema (`problem-finder.schema.ts`):
```ts
z.object({
  intent: z.enum(['find_problems','explain','hint','clarify']),
  summary: z.string(),
  interpretedFilters: z.object({ companies: z.array(z.string()), difficulties: z.array(z.string()),
    topics: z.array(z.string()), seniority: z.string().nullable() }),
  problems: z.array(z.object({ slug: z.string(), title: z.string(), difficulty: z.string(),
    topics: z.array(z.string()), companies: z.array(z.string()), why: z.string() })),
  hints: z.array(z.object({ slug: z.string(), level: z.number(), text: z.string() })).optional(),
  followUpSuggestions: z.array(z.string()),
})
```
- Checkpointer: `MemorySaver` for in-process multi-turn; durable history via §4.6.

## 4.5 Agent B — Mock Interview (`agents/mock-interview/`)

- **Trigger**: the chat route routes to this agent when `mode==='mock-interview'` (explicit UI toggle) **or** Agent A returns `intent==='find_problems'` and the user text matches `/mock|simulate|interview me|practice session/i`.
- Flow (state machine driven by `interview_sessions`):
  1. `plan` — pick 3–5 problems via `search_problems` honoring company/role/difficulty; persist `plan_json`.
  2. `ask_basic` — present the problem in its **basic form only** (no examples beyond one, no solution).
  3. `probe` — evaluate the candidate's reply: correctness, complexity, edge cases; ask one follow-up at a time.
  4. `expand` — escalate using the problem's own `followUpsMd` (e.g. 3Sum → 3Sum Closest → 4Sum → k-Sum) or constraint changes (streaming input, memory limit, distributed).
  5. `hint` — on request or after two stalls, escalate hint level 1→2→3 via `get_problem_hint`.
  6. `feedback` — per-problem score 1–5 on correctness / complexity / communication / edge cases, plus concrete study links (slugs & subject ids).
  7. `next` / `end`.
- Response schema includes `stage`, `currentProblemSlug`, `questionText`, `hintsGiven`, `evaluation?`, `sessionProgress: {step,total}`, `nextAction`.
- Prompt rules: ask **one** question per turn; never volunteer the solution; keep interviewer persona; on wrong answers, Socratic nudge before correction; always end a problem with a short verdict.

## 4.6 Agent C — Subject Quiz (`agents/subject-quiz/`)

- **Purpose**: take a theoretical subject (id or free text), fetch its md, and draft questions from that material only.
- Tools: `search_subjects`, `get_subject`.
- Input: `{ subjectId?, query?, questionCount=5, difficulty='mixed', style: 'open'|'multiple-choice'|'mixed', includeAnswers=true }`.
- Schema: `{ subject: {id,title,sourceFile}, questions: [{ id, type, difficulty, question, options?: string[], expectedAnswer, referenceQuote, followUp? }], studyTips: string[] }`.
- Prompt rule: every question must be answerable from the retrieved material and must carry a `referenceQuote` copied verbatim from it — no outside knowledge, no hallucinated quotes.

## 4.7 Chat routes & SSE

**`POST /api/chat`** — body:
```ts
{ message: string; modelId?: string; threadId?: string;
  mode?: 'auto'|'find-problems'|'mock-interview'|'subject-quiz';
  stream?: boolean; context?: { subjectId?: string; problemSlug?: string; filters?: ProblemFilters } }
```
- Non-stream → `{ data: { threadId, modelId, agent, content, structured } }`.
- `stream: true` → `text/event-stream`, named events (mirror the streaming block at `@/home/sio/Code/agents/src/index.ts:99-116` but with typed events):
  - `event: meta` → `{ threadId, modelId, agent }`
  - `event: step` → `{ index, nodes: string[] }` (from `agent.stream()` chunk keys)
  - `event: token` → `{ delta }` (when the model streams text)
  - `event: tool` → `{ name, phase:'start'|'end', summary }`
  - `event: result` → final structured payload
  - `event: error` → `{ message }`
  - `event: done` → `{}`
  Always `res.write` a heartbeat comment every 15 s; clean up on `req.on('close')`.
- Routing: `mode==='auto'` → keyword/LLM-light router in `chat.routes.ts` (regex first: `/mock interview|interview me/i` → B; `/quiz|questions about|test me on/i` + subject hit → C; else A).
- Persistence: create/lookup `chat_threads`, append user + assistant `chat_messages` (assistant `payload_json` = structured result). LangGraph `thread_id` = `chat_threads.id` so `MemorySaver` and DB agree in-process; on a cold start, replay the last N (default 12) DB messages into the first agent invocation so context survives restarts.

**Session endpoints**: `GET /api/threads`, `GET /api/threads/:id` (with messages), `DELETE /api/threads/:id`, `POST /api/threads/:id/title`, `GET /api/interview-sessions/:threadId`.

**4.8** Every agent run also writes a debug dump to `data/runs/<agent>-<timestamp>/` (input, final state, captured logs) — cheap port of the `saveAgentOutput`/`startLogCapture` pattern, behind `DEBUG_RUNS=true`.

---

# 5. Frontend — Angular + Angular Material + NgRx Signal Store

**5.1** Scaffold: `ng new frontend --style=scss --routing --standalone --ssr=false`; add `@angular/material` (Azure/Blue prebuilt or custom M3 theme, dark mode toggle), `@ngrx/signals`, `marked` + `ngx-highlightjs` for markdown/code rendering. Proxy `/api` → `http://localhost:3100` via `proxy.conf.json`.

**5.2** Structure (standalone components, `ChangeDetectionStrategy.OnPush`, new control flow `@if/@for`):

```
src/app/
├── app.routes.ts, app.config.ts
├── core/
│   ├── api/{problems.api.ts,subjects.api.ts,filters.api.ts,models.api.ts,chat.api.ts,threads.api.ts}
│   ├── models/{problem.model.ts,subject.model.ts,filter.model.ts,chat.model.ts}
│   └── services/{sse.service.ts,markdown.service.ts,theme.service.ts}
├── state/{filters.store.ts,problems.store.ts,subjects.store.ts,chat.store.ts,models.store.ts}
├── layout/{shell.component.ts,nav.component.ts}
└── features/
    ├── browse/{browse-page.component.ts,filter-panel.component.ts,problem-list.component.ts,problem-card.component.ts}
    ├── problem-detail/{problem-detail-page.component.ts,solution-reveal.component.ts}
    ├── subjects/{subjects-page.component.ts,subject-detail.component.ts}
    └── chat/{chat-page.component.ts,message-list.component.ts,message-bubble.component.ts,composer.component.ts,model-picker.component.ts,problem-suggestion-card.component.ts,mock-interview-panel.component.ts}
```

**5.3** Routes: `/browse` (default), `/problems/:slug`, `/subjects`, `/subjects/:id`, `/chat`, `/chat/:threadId`, `**`→`/browse`.

**5.4** `filters.store.ts` (`signalStore` with `withState`/`withComputed`/`withMethods`):
- State: `companies`, `topics`, `difficulties`, `seniority` option lists + `selected: { companies: string[]; difficulties: string[]; topics: string[]; seniority: string|null; q: string; matchMode: 'any'|'all'; minInterviewValue: number|null }` + `loading`, `error`.
- Methods: `loadOptions()` (once, `GET /api/filters`), `toggleCompany`, `setDifficulties`, `setTopics`, `setQuery` (debounced 300 ms via `rxMethod` + `debounceTime`), `reset()`, `applyFromAgent(interpretedFilters)` (chat → filter screen handoff).
- Persist `selected` to `localStorage` and to the URL query string (`Router.navigate` with `queryParamsHandling:'merge'`) so filters are shareable/restorable.

**5.5** `problems.store.ts`: state `items`, `total`, `page`, `pageSize`, `sort`, `order`, `status: 'idle'|'loading'|'error'`, `error`. `rxMethod` `load()` uses `switchMap` on the serialized filter + paging signal; expose `computed` `hasResults`, `emptyBecauseTooNarrow`. Also `loadDetail(slug)` cached in a `Map`.

**5.6** `chat.store.ts`: `threads`, `activeThreadId`, `messages: ChatMessage[]`, `selectedModelId` (from `models.store`, persisted), `mode`, `streaming: boolean`, `currentSteps: string[]`, `interviewSession`. `send(text)` → optimistically append user message, open SSE via `sse.service.ts` (`fetch` + `ReadableStream` reader so POST-SSE works — `EventSource` cannot POST), patch the streaming assistant message on each `token`, replace with `structured` on `result`, set `streaming=false` on `done`/`error`. Support `abort()` via `AbortController`.

**5.7** Browse/filter screen UI:
- Left sidenav `mat-expansion-panel` groups: **Companies** (`mat-select multiple` + `mat-form-field` search input, virtual-scroll `cdk-virtual-scroll-viewport` because of ~1,600 companies, shows top-N by problem count first), **Difficulty** (`mat-button-toggle` multi), **Question type / classification** (`mat-select multiple` grouped by kind: algorithmic vs design vs theory), **Seniority** (`mat-select`), **Free text** (`mat-input`), `matchMode` toggle, Reset button, and live "N problems match" counter chips.
- Results: `mat-table` (columns: title, difficulty chip, topics chips, top companies, interview value stars) with `mat-paginator` and sortable headers; plus a card/grid view toggle. Row click → `/problems/:slug`. `mat-progress-bar` while loading, `mat-error` empty state with "relax filters" suggestions.
- Toolbar action **"Ask the coach about these filters"** → prefills the chat composer with a natural-language prompt built from the current selection.

**5.8** Problem detail: title + difficulty chip + company chips + topic chips + LeetCode link; rendered markdown for description/examples/complexity; **solution and follow-ups collapsed behind an explicit "Reveal solution" button** (`solution-reveal.component.ts`) with a "Get a hint instead" button that opens chat with `mode='auto'`, `context.problemSlug`, hint request; related problems list.

**5.9** Chat page: message list with role-styled bubbles and markdown; model picker (`mat-select` fed by `GET /api/models`, labels "GPT-OSS 120B" / "Claude Opus 4.6"); mode selector chips (`Auto | Find problems | Mock interview | Subject quiz`); live step indicator while streaming; thread sidebar (`GET /api/threads`) with new/delete; structured results rendered as `problem-suggestion-card`s with **Open** (→ detail), **Add to filters** (→ `filters.store.applyFromAgent`), **Hint** buttons; `mock-interview-panel` shows stage, progress `mat-stepper`, hint-level buttons, and per-problem feedback scores; example prompt chips seeded with the user's sample prompt.

**5.10** A11y/UX: keyboard-navigable filter panel, `aria-live="polite"` on streaming assistant text, `mat-snack-bar` for errors, responsive layout (sidenav collapses under 960 px).

---

# 6. Tests

**6.1** Backend unit (`node:test` via `tsx --test`):
- `parse-problem-md.test.ts` — parse `3Sum.md` fixture, assert id 15, difficulty Medium, ≥50 companies, non-empty description/solution/followUps.
- `parse-theory-md.test.ts` — `interview-materials-summary.md` yields ≥20 subjects with unique ids.
- `problem.service.test.ts` — against a temp DB seeded with ~20 fixture rows: each filter, `matchMode` any vs all, pagination, sorting, FTS query, empty result.
- `classify-with-llm.test.ts` — mock the model; assert batching, JSONL resume skips existing ids, retry/split on failure.
- `model-factory.test.ts` — provider selection per id; anthropic path requests a Dell token (mocked).
- Tool tests — each tool returns valid JSON and respects `limit`; `get_problem` excludes solution by default.

**6.2** Backend integration: `supertest`-style over the Express app with a temp DB — `/api/filters`, `/api/problems` (multi-filter), `/api/problems/:slug`, 404, zod-400 on bad params, `/api/chat` with a stubbed agent for both stream and non-stream.

**6.3** Frontend: store unit tests (`filters.store`, `problems.store`, `chat.store` with a fake SSE source), component tests for `filter-panel` and `message-list`, and one Playwright e2e: load `/browse` → select Dell + Hard + data-structures → assert result count changes → open a problem → reveal solution → go to `/chat` → send the sample prompt (stubbed backend) → assert suggestion cards render.

**6.4** Acceptance checklist (must all pass before "done"): index builds with 0 parse crashes and ≥3,400 classified problems; `/api/problems?companies=dell&difficulties=Hard&topics=data-structures-design,system-design` returns sane results in <100 ms; the sample prompt through `/api/chat` on **both** models returns real slugs that exist in the DB; mock interview asks a basic question first and only expands after a reply; subject quiz questions all include verbatim `referenceQuote`s.

---

# 7. Docker & Runbook

**7.1** `backend/Dockerfile` — `node:22-slim`, install build tools for `better-sqlite3` (`python3 make g++`) in a builder stage, copy source, `tsx src/index.ts`, expose 3100, mount `CONTENT_ROOT` read-only.
**7.2** `frontend/Dockerfile` — build stage `ng build`, serve stage `nginx:alpine` with `/api` proxied to `backend:3100`.
**7.3** `docker-compose.yml` — services `backend` (env from `.env`, volumes `../..:/content:ro` and `./backend/data:/app/data`) and `frontend` (port 4200→80). No DB service needed (SQLite file).
**7.4** `README.md` runbook: `npm i` → fill `.env` → `npm run index:all` (one-time, ~10–20 min for classification) → `npm run dev:backend` + `npm run dev:frontend` → open `http://localhost:4200`. Document `NODE_TLS_REJECT_UNAUTHORIZED=0` need for the Dell gateway and that `AIA_API_KEY` / `DELL_CLIENT_*` are secrets that must never be committed or sent to the browser.

---

# 8. Implementation Order (milestones)

1. **M1 — Skeleton**: §1 layout, env config, `/api/health`, Angular shell with Material + routing. *Verify: both dev servers boot.*
2. **M2 — Index**: §2.1–2.2 parsers + `parse-report.json`. *Verify: 3,415 problems and ~30 subjects parsed, 0 crashes.*
3. **M3 — Classification**: §2.3 LLM pass with resumable JSONL. *Verify: `problems.classified.json` covers every slug; spot-check 20 tags.*
4. **M4 — DB + REST**: §2.4–2.6, §3. *Verify: §6.2 integration tests green.*
5. **M5 — Filter UI**: §5.4–5.8. *Verify: end-to-end filtering in the browser, URL-restorable state.*
6. **M6 — Agents**: §4.1–4.4 (Problem Finder on both providers) + `/api/chat` non-stream. *Verify: sample prompt returns real problems on `gpt-oss-120b` and `claude-opus-4.6`.*
7. **M7 — Chat UI + SSE**: §4.7 streaming, §5.6, §5.9. *Verify: tokens stream, suggestion cards actionable, threads persist across reload.*
8. **M8 — Mock interview + Subject quiz**: §4.5, §4.6, `mock-interview-panel`, subject pages. *Verify: full 3-problem mock session with hints and feedback; quiz from an `interview-materials-summary.md` section.*
9. **M9 — Hardening**: §6 remaining tests, §7 Docker, README, error/empty states, dark mode.

## Risks & Mitigations

- **Classification cost/time (3,415 items)** → batches of 25, concurrency 4, resumable JSONL, committed output, `--force` to redo.
- **Anthropic provider lacks structured output** → prompt-driven JSON + tolerant `extractJson()`; schema validation is best-effort with graceful degradation to plain text.
- **Company list size (1,600+)** → server-side typeahead + virtual scroll + "top by problem count" default ordering.
- **Agent hallucinating problems** → all problem facts must come from tool output; validate returned slugs against the DB in `chat.routes.ts` and drop unknown ones before responding.
- **Token blowup from huge md bodies** → `get_problem` section selection, `get_subject` truncation, FTS snippets instead of full text in search results.
- **Solution leakage during mock interviews** → `get_problem` excludes solutions by default; only `get_problem_hint` may touch solution text, and it is level-capped.
