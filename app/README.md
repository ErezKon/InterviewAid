# Interview Prep Platform

A Node/TypeScript backend (REST API over an LLM-classified SQLite index of 3,415 LeetCode problems and theory markdown) and an Angular 19 frontend (Angular Material + NgRx Signal Store) offering metadata filtering, streaming **Generative UI** chat with AI agents, mock interviews, subject quizzes, and **user content uploads** (manual or LLM-agentic classification). Supports **multi-provider LLM** (OpenAI-compatible, Anthropic, Google Gemini) with automatic provider detection from model names.

The chat system uses a **GenUI architecture**: every agent response is a structured `{ component, message, inputs, followUpSuggestions }` envelope that tells the frontend which Angular component to render, eliminating all client-side JSON heuristics.

> **Docs:** this README covers setup and usage. [`AGENTS.md`](./AGENTS.md) is the architecture deep dive and the rulebook for AI coding agents working in this folder (agents must read both files before starting a task and keep them up to date).

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js 22+** and **npm 10+**
- The **Interview content repo**: `app/` lives inside it, and the backend reads `Data/Problems/LeetCode/`, `Data/Material/` and `LeetCode/problems_data.json` from the repo root (`CONTENT_ROOT`)
- A C/C++ toolchain (`python3`, `make`, `g++`) only if no prebuilt `better-sqlite3` binary is available for your platform
- API keys for your LLM provider(s): OpenAI-compatible, Anthropic, and/or Google Gemini — or OAuth client credentials as fallback for OpenAI-compatible models (see [Environment Variables](#environment-variables))

### 1. Install dependencies

```bash
cd app
npm install --prefix backend
npm install --prefix frontend --legacy-peer-deps
```

The root `package.json` only contains helper scripts (it is **not** an npm workspace), so a plain `npm install` in `app/` installs nothing. The frontend needs `--legacy-peer-deps` (its Dockerfile uses the same flag) because the unused `ngx-markdown@22` dependency declares Angular 22 peer dependencies.

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env:
#  - CONTENT_ROOT: absolute path of the Interview repo root (the parent of app/)
#  - Set one or more provider API keys:
#    - OPENAI_API_KEY (and optional OPENAI_BASE_URL) for OpenAI-compatible models, incl. the default gpt-oss-120b
#    - ANTHROPIC_API_KEY (and optional ANTHROPIC_BASE_URL) for Anthropic (Claude) models
#    - GOOGLE_API_KEY for Google Gemini models
#  - OAuth is optional: it is only used for OpenAI-compatible models when OPENAI_API_KEY is empty.
#    In that case set OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_TOKEN_URL (OpenAI-compatible only)
```

> The default model `gpt-oss-120b` is OpenAI-compatible and is always used by `index:classify`, so the indexer needs `OPENAI_API_KEY` or the OAuth credentials. With only Anthropic/Google keys, select a Claude/Gemini model in the chat model dropdown.

### 3. Run the indexer (one-time, ~10-20 min for classification)

```bash
npm run index:parse       # Parse 3,415 problem .md + theory docs -> JSON
npm run index:classify    # LLM classification (needs OPENAI_API_KEY or OAuth fallback) -- resumable
npm run index:build       # Build SQLite DB + FTS5 indexes

# Or all at once:
npm run index:all

# Optional: pre-generate quiz questions for the Quiz page (backend-only script)
npm run index:questions --prefix backend
```

Everything is written to `backend/data/` (`interview.db` + `metadata/`). Keep `metadata/classification.jsonl` and `metadata/subjects.classification.jsonl`: they make classification resumable, so the LLM classification pass only needs to run once and later `index:classify` runs only call the LLM for new items. See [Re-running classification](#re-running-classification-force) to force a full re-classification.

> `index:parse` resets the classification fields in `problems.json`/`subjects.json`, so always run `index:classify` after it (fast when the JSONL caches are complete). `index:build` fails on unclassified problems (`problems.primary_topic` is `NOT NULL`).

### 4. Start development servers

```bash
# Terminal 1 -- Backend (http://localhost:3100, tsx watch)
npm run dev:backend

# Terminal 2 -- Frontend (http://localhost:4200, proxies /api -> backend)
npm run dev:frontend
```

`dev:frontend` runs `ng serve --open`, which opens **http://localhost:4200** in your browser.

> **Note:** For corporate networks with TLS interception, TLS verification is disabled in several places: the backend npm scripts that call LLMs or run the server (`dev`, `start`, `index:classify`, `index:all`, `index:questions`, `enrich`, `enrich:audit`) prefix `NODE_TLS_REJECT_UNAUTHORIZED=0`; both Dockerfiles run `npm config set strict-ssl false`; the backend image sets `NODE_TLS_REJECT_UNAUTHORIZED=0` for its build steps **and** at runtime; and `docker-compose.yml` sets it for the backend service. Remove these for production. **Never commit API keys or secrets.**

---

## Docker (Production)

### Prerequisites

- **Docker** and **Docker Compose v2+**

### Build & Run

```bash
cd app

# Fill in secrets
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys (CONTENT_ROOT and DB_PATH are overridden by docker-compose.yml)

# Ensure the DB and metadata exist in backend/data (run the indexer locally first, or provide pre-built data)
npm run index:all

# Build and start containers
docker compose up --build -d

# Frontend:  http://localhost:4200
# Backend:   http://localhost:3100
```

### Services

| Service | Image Base | Port | Description |
|---|---|---|---|
| `backend` | `node:22-slim` (multi-stage, compiles native `better-sqlite3`) | 3100 | Express + SQLite + multi-provider LangChain agents, started with `npx tsx src/index.ts`; healthcheck on `GET /api/health` every 30 s |
| `frontend` | `node:22-slim` build → `nginx:alpine` | 4200->80 | Angular production build, `/api` proxied to backend; starts once the backend is healthy |

nginx (`frontend/nginx.conf`) is tuned for SSE (`proxy_buffering off`, `proxy_read_timeout 300s`), serves the SPA with an `index.html` fallback, gzips responses and caches static assets for one year.

### Volumes & Environment

- `../:/content` -- mounts the Interview repo root as the backend's content root. It is **read-write**: uploads and the content enricher write markdown files into it.
- `./backend/data:/app/data` -- persists the SQLite DB and metadata between container restarts
- `docker-compose.yml` sets `CONTENT_ROOT=/content`, `DB_PATH=/app/data/interview.db` and `NODE_TLS_REJECT_UNAUTHORIZED=0`; everything else comes from `backend/.env`

### Stop & Clean

```bash
docker compose down              # stop and remove containers
docker compose down -v           # also remove named/anonymous volumes (the bind-mounted ./backend/data is kept)
docker compose build --no-cache  # full rebuild
```

---

## Architecture

```
app/
├── package.json                      # Helper scripts only (npm run ... --prefix backend|frontend), no workspaces
├── docker-compose.yml
├── README.md / AGENTS.md             # Docs for humans / AI agents
├── backend/
│   ├── Dockerfile
│   ├── .env.example
│   ├── data/                         # interview.db + metadata/ (indexer output, runtime data)
│   └── src/
│       ├── index.ts                  # Express bootstrap
│       ├── config/                   # env (Zod), models (registry), paths
│       ├── db/                       # SQLite connection, schema (with app_meta), queries
│       ├── indexer/                  # parse -> classify -> build (+ questions) pipeline, taxonomy
│       ├── routes/
│       │   ├── chat.routes.ts        # SSE streaming, mode detection, envelope validation, slug guard
│       │   ├── upload.routes.ts      # POST /upload — multipart file upload (manual + agentic)
│       │   └── ...                   # problems, subjects, filters, companies, models, sessions, quiz, health
│       ├── services/                 # Business logic: problem, subject, session, quiz, quiz-generator, upload, sse
│       ├── agents/
│       │   ├── model-factory.ts      # Multi-provider: ChatOpenAI / ChatAnthropic / ChatGoogleGenerativeAI + createResponseFormat()
│       │   ├── shared/
│       │   │   ├── ui-response.schema.ts   # chatUiResponseSchema (Zod) -- shared by all GenUI agents
│       │   │   ├── ui-response.prompt.ts   # <component-logic> prompt block
│       │   │   └── tools/                  # 6 shared tool factories
│       │   ├── free-chat/            # createAgent + 6 tools (tutor / study partner)
│       │   ├── problem-finder/       # createAgent + 6 tools
│       │   ├── mock-interview/       # createAgent + 4 tools
│       │   ├── subject-quiz/         # createAgent + 2 tools
│       │   ├── content-enricher/     # createAgent + 5 tools, audit-report parser, batch CLI loop
│       │   └── content-uploader/     # createAgent + 3 tools (classify, split, save)
│       ├── types/                    # API (Zod), chat, problem types
│       └── utils/                    # logger, errors, OAuth token cache
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── styles.scss                     # Global styles + dark theme
        ├── proxy.conf.json                 # Dev proxy /api -> http://localhost:3100
        └── app/
            ├── app.routes.ts               # Lazy routes: /problems, /subjects, /quiz, /chat, /upload
            ├── core/
            │   ├── api/                    # HTTP + SSE clients (chat, problems, subjects, filters, models, threads, quiz, upload)
            │   ├── models/chat.model.ts    # ChatUiEnvelope, ChatComponentName, ChatMessage, ChatMode
            │   ├── services/               # markdown.service.ts (marked + highlight.js), theme.service.ts
            │   └── directives/             # mermaid.directive.ts
            ├── state/                      # NgRx Signal Stores (chat, filters, models, problems, quiz, subjects, upload)
            │   └── chat.store.ts           # SSE handler: result -> ui envelope, done -> fallback
            └── features/
                ├── problems/               # Problem list (filters, pagination) + problem detail
                ├── subjects/               # Subject list (grouped by main subject) + subject detail
                ├── quiz/                   # Quiz page (pre-generated questions, local scoring)
                ├── upload/                 # Upload page -- drag & drop .md files
                └── chat/
                    ├── component-registry.ts          # CHAT_COMPONENT_REGISTRY map
                    ├── chat-component-host/           # NgComponentOutlet dynamic host
                    ├── chat-page/                     # Main chat page (threads, mode/model selects, message loop, follow-up chips)
                    ├── chat-markdown-viewer/          # Reused in chat, problem-detail, subject-detail
                    ├── chat-quiz-cards/               # Interactive quiz with reveal/score
                    └── components/
                        ├── chat-text/                  # Empty (message rendered by chat page)
                        ├── chat-problem-list/          # Problem cards with filter chips + router links
                        ├── chat-hint-card/             # Progressive hint reveal
                        ├── chat-interview-question/    # Stage chip + progress bar + question
                        ├── chat-evaluation-scorecard/  # 4-axis score bars + average badge
                        └── chat-enrichment-report/     # Stat tiles + file status list
```

The full file-by-file layout is in [`AGENTS.md`](./AGENTS.md#repository-layout).

---

## Generative UI Chat System

### How It Works

The chat uses a **Generative UI (GenUI)** pattern where the LLM decides which Angular component renders each response. Instead of the frontend parsing raw text and guessing at the format, every agent returns a typed envelope:

```
User message
    |
    v
detectMode() (Auto mode only) -> one of 5 agents (createAgent + responseFormat: chatUiResponseSchema)
    |
    v
agent.stream() -> ... -> final state.structuredResponse
    |
    v
SSE: event: result   data: { threadId, ui: ChatUiEnvelope }
    |
    v
ChatStore stores msg.ui
    |
    v
chat-page renders:  message text (markdown)
                    <app-chat-component-host [ui]="msg.ui" />
                    follow-up chips
```

The **UI envelope** (`ChatUiEnvelope`):

```ts
{
  component: 'text' | 'chat-markdown-viewer' | 'chat-quiz-cards' | ...
  message:   string          // markdown text shown ABOVE the component
  inputs:    Record<string, any>  // data for the chosen component
  followUpSuggestions: string[]   // clickable next-question chips (0-4)
}
```

The frontend's `ChatComponentHostComponent` uses Angular's `NgComponentOutlet` with a `CHAT_COMPONENT_REGISTRY` map to dynamically render the named component. It filters `inputs` to only pass keys the component declares, preventing `NG0303` errors from undeclared inputs.

### Backend Agents

All five chat agents are built with `createAgent` + the appropriate LLM class (via `model-factory.ts`) and share one `responseFormat` (`chatUiResponseSchema`). The `createResponseFormat()` helper is provider-aware: native JSON-schema for OpenAI-compatible models, `toolStrategy()` (synthetic tool call) for Anthropic and Google models. The content uploader is a sixth, internal agent without a response format (it reports progress over SSE). The model factory supports three providers:

| Provider | LangChain Class | API Key Env Var | Models |
|---|---|---|---|
| `openai-like` | `ChatOpenAI` | `OPENAI_API_KEY` (or OAuth fallback) | `gpt-oss-120b` (default), any OpenAI-compatible |
| `anthropic` | `ChatAnthropic` | `ANTHROPIC_API_KEY` | `claude-opus-4.6`, `claude-sonnet-4` |
| `google` | `ChatGoogleGenerativeAI` | `GOOGLE_API_KEY` | `gemini-2.5-pro`, `gemini-2.5-flash` |

Unknown model IDs are auto-detected by name pattern (`/claude|anthropic/` -> anthropic, `/gemini/` -> google, else -> openai-like).

| Agent | Tools | UI Components |
|---|---|---|
| **Free Chat** | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint`, `search_subjects`, `get_subject` | `text`, `chat-hint-card`, `chat-markdown-viewer`, `chat-problem-list` |
| **Problem Finder** | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint`, `search_subjects`, `get_subject` | `chat-problem-list`, `chat-markdown-viewer`, `chat-hint-card`, `text` |
| **Mock Interview** | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint` | `chat-interview-question`, `chat-evaluation-scorecard`, `chat-hint-card`, `text` |
| **Subject Quiz** | `search_subjects`, `get_subject` | `chat-quiz-cards`, `chat-markdown-viewer`, `text` |
| **Content Enricher** | `scan_problems`, `read_problem_file`, `enrich_problem_file`, `update_problem_metadata`, `read_audit_report` | `chat-enrichment-report`, `text` |
| **Content Uploader** | `classify_content`, `split_material`, `save_uploaded_files` | _(SSE progress events, not GenUI)_ |

### Safety & Reliability

- **3-tier envelope validation**: `safeParse(structuredResponse)` -> `extractJson(rawText)` -> graceful `text` fallback. Responses never throw.
- **Slug validation**: problem slugs in `inputs.problems` are checked against the DB; hallucinated slugs are silently dropped.
- **Input filtering**: the host component only passes keys listed in the registry's `inputKeys`, so extra LLM-generated keys are silently ignored.
- **Streaming resilience**: the `done` SSE event applies a fallback `text` envelope if `result` never arrived, so the bubble is never blank.
- **Heartbeats**: SSE streams send a `: heartbeat` comment every 15 s so proxies keep long agent runs open.

### Component Catalog

| Component | When Used | Key Inputs |
|---|---|---|
| `text` | Plain conversational reply, clarifying question, error | _(none -- message is rendered by the chat page)_ |
| `chat-markdown-viewer` | Raw study material, source content | `content` (markdown), `title` |
| `chat-quiz-cards` | Generated quiz questions with interactive reveal/score | `questions`, `studyTips`, `subject` |
| `chat-problem-list` | Recommended coding problems with filter chips | `problems` (cards with slug, title, difficulty, topics, companies, why), `interpretedFilters` |
| `chat-hint-card` | Progressive hints (collapsed behind reveal buttons) | `hints` (slug, level, text), `problemTitle` |
| `chat-interview-question` | Mock interview question with progress tracking | `stage`, `questionText`, `currentProblemSlug`, `sessionProgress`, `nextAction`, `hintsGiven` |
| `chat-evaluation-scorecard` | Candidate answer scoring (4 axes, 1-5 scale) | `evaluation` (correctness, complexity, communication, edgeCases, notes) |
| `chat-enrichment-report` | Content enrichment run results | `enrichment` (filesScanned, filesEnriched, auditSummary, items) |

### Chat Capabilities -- Examples

Below are example questions you can ask in each mode, and what the response looks like.

#### Free Chat (mode: `free-chat`, the default in the UI)

| Example Question | Response View |
|---|---|
| _"help me understand how to approach two-sum"_ | **`text`** -- a Socratic, step-by-step explanation (observations and guiding questions first, no full solution unless you ask for it) with follow-up chips such as "Want a hint?". |
| _"give me a hint for longest palindromic substring"_ | **`chat-hint-card`** -- progressive hints behind "Reveal Hint N" buttons. |
| _"surprise me with a random medium problem"_ | **`chat-problem-list`** -- the agent searches with `randomize: true` (and excludes already-shown slugs when you ask for "another one"). |
| _"explain how a trie works"_ | **`text`** or **`chat-markdown-viewer`** -- an explanation, or the matching study material. |

#### Find Problems (mode: `find-problems`)

| Example Question | Response View |
|---|---|
| _"hard graph problems asked at Google"_ | **`chat-problem-list`** -- filter chips with the interpreted filters (e.g. `google`, `Hard`, `graphs`) above a list of problem cards, each with title (linked to `/problems/:slug`), difficulty badge, topic/company chips, and a "why" sentence explaining relevance. |
| _"show me the study material on agent memory"_ | **`chat-markdown-viewer`** -- a card with the raw markdown content from the matching subject (or just the matching section), rendered with code highlighting and mermaid diagrams. |
| _"give me a hint for two-sum"_ | **`chat-hint-card`** -- progressive hints (level 1 = nudge, level 2 = approach, level 3 = near-solution), each hidden behind a "Reveal Hint N" button. |
| _"what topics should I study for a senior backend role?"_ | **`text`** -- a conversational markdown response with advice and follow-up suggestion chips like "Find Hard problems on system design" or "Quiz me on distributed systems". |
| _"medium dynamic programming problems for Amazon"_ | **`chat-problem-list`** -- filter chips (`amazon`, `Medium`, `dynamic-programming`) and matching problem cards with links. |

#### Mock Interview (mode: `mock-interview`)

| Example Question | Response View |
|---|---|
| _"interview me for a senior backend role at Google"_ | **`chat-interview-question`** -- a stage chip (`plan`), a progress bar (1/N), and the first interview question rendered in markdown. Footer shows "Waiting for your answer...". |
| _(after answering a question)_ _"I would use a hash map to store the complements"_ | **`chat-evaluation-scorecard`** -- four labeled progress bars (Correctness, Complexity, Communication, Edge Cases) scored 1-5, an average score badge, and qualitative feedback notes. Then a follow-up `chat-interview-question` on the next turn. |
| _"I'm stuck, can I get a hint?"_ | **`chat-hint-card`** -- Socratic nudge without revealing the solution, with hints hidden behind reveal buttons. |
| _(after all problems)_ | **`chat-interview-question`** -- stage chip shows `end`, progress bar at 100%, with a summary message and "Interview complete" footer. |

#### Subject Quiz (mode: `subject-quiz`)

| Example Question | Response View |
|---|---|
| _"quiz me on vector databases"_ | **`chat-quiz-cards`** -- a subject caption ("Vector Databases"), then 5 cards, each with a question number, difficulty chip (`easy`/`medium`/`hard`), type chip (`MC`/`Open`). Multiple-choice cards show lettered options that highlight green/red on selection. Open questions have a "Reveal Answer" button followed by "Got it / Missed it" self-assessment. Each revealed answer shows the expected answer, a verbatim reference quote from the source material, and an optional follow-up. A running score appears once you answer, followed by study tips. |
| _"show me the material on B-trees"_ | **`chat-markdown-viewer`** -- the raw theory markdown for the B-trees subject, rendered with headings, code blocks, and diagrams. |
| _"quiz me on both graph algorithms and dynamic programming, 3 questions each"_ | **`chat-quiz-cards`** -- 6 cards covering both subjects, with the subject caption, mixed difficulty levels, and study tips at the bottom. |

#### Content Enricher (mode: `content-enricher`)

| Example Question | Response View |
|---|---|
| _"enrich all insufficient problems in the arrays folder"_ | **`chat-enrichment-report`** -- two stat tiles ("Scanned: 42", "Enriched: 8"), an audit summary in markdown, and a file-by-file list with status icons (green check for enriched, orange minus for skipped, red error for failed) and notes. |
| _"fix the audit findings for wrong primary topics"_ | **`chat-enrichment-report`** -- shows metadata corrections applied, with each file listed as enriched/skipped. |

#### General / Auto Mode

In Auto mode, messages without mock-interview / quiz / enrichment keywords are routed to the Problem Finder agent (see [Chat Modes & Auto-Detection](#chat-modes--auto-detection)).

| Example Question | Response View |
|---|---|
| _"what's the difference between BFS and DFS?"_ | **`text`** -- a conversational markdown answer with follow-up suggestion chips. |
| _"hello"_ | **`text`** -- a greeting with suggested next actions like "Find problems for your next interview" or "Quiz me on a topic". |

### SSE Event Flow

The chat uses Server-Sent Events for real-time streaming:

| Event | Payload | Purpose |
|---|---|---|
| `meta` | `{ threadId, modelId, agent }` | Thread identification, sent first |
| `step` | `{ index, nodes }` | Agent graph step progress |
| `token` | `{ delta }` | Full text of the latest AI message so far (the client replaces, not appends) |
| `tool` | `{ name, phase, summary }` | Tool call start/end with argument/result previews |
| `result` | `{ threadId, ui: ChatUiEnvelope }` | Final validated envelope |
| `done` | `{}` | Stream complete |
| `error` | `{ message }` | Error message |

### Adding a New Component

To add a 9th (or Nth) component:

1. **Backend**: add the component name to `CHAT_COMPONENTS` in `agents/shared/ui-response.schema.ts`, add its input fields to `chatInputsSchema`, and update the `<component-logic>` block in `agents/shared/ui-response.prompt.ts` (plus the "Component Choice" section of the relevant agent prompts).
2. **Frontend**: add the name to `ChatComponentName` in `core/models/chat.model.ts`, create the Angular component under `features/chat/components/`, then add it to `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` with its `inputKeys`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: `3100`) |
| `CONTENT_ROOT` | Yes | Absolute path to the Interview repo root (the parent of `app/`); Docker sets `/content` |
| `DB_PATH` | No | SQLite DB path (default: `./data/interview.db`, resolved from `app/backend/` when using the npm scripts) |
| `OPENAI_API_KEY` | Optional | API key for OpenAI-compatible models; if not set, OAuth fallback will be used |
| `OPENAI_BASE_URL` | Optional | Base URL for OpenAI-compatible endpoints (e.g., OSS gateways) |
| `ANTHROPIC_API_KEY` | Optional | API key for Anthropic (Claude) models |
| `ANTHROPIC_BASE_URL` | Optional | Base URL override for Anthropic (for proxies) |
| `GOOGLE_API_KEY` | Optional | API key for Google Gemini models |
| `GOOGLE_BASE_URL` | Optional | Accepted by the env schema but currently **not applied** (the Google client always uses its default endpoint) |
| `OAUTH_CLIENT_ID` | Optional | OAuth client ID used to request bearer tokens when API keys are absent |
| `OAUTH_CLIENT_SECRET` | Optional | OAuth client secret used with client credentials flow |
| `OAUTH_TOKEN_URL` | Optional | OAuth token URL (client_credentials) used to mint bearer tokens |
| `DEBUG_RUNS` | No | Save chat agent input/output dumps to `backend/data/runs/` (default: `false`) |

Behavior:
- **OAuth is optional**: it is only a fallback for OpenAI-compatible models when `OPENAI_API_KEY` is empty. If you have a direct API key (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GOOGLE_API_KEY`) for the provider(s) you use, the `OAUTH_*` variables can be left empty.
- For the **OpenAI-like** provider, the backend uses `OPENAI_API_KEY` if present; otherwise it calls the OAuth client-credentials flow (`OAUTH_*`) to obtain a bearer token (cached, refreshed 60 s before expiry).
- For the **Anthropic** provider, the backend uses `ANTHROPIC_API_KEY` directly. No OAuth fallback.
- For the **Google** provider, the backend uses `GOOGLE_API_KEY` directly. No OAuth fallback.
- OpenAI-compatible models (including the default `gpt-oss-120b`) still need `OPENAI_API_KEY` or the OAuth credentials: with only Anthropic/Google keys, requests to OpenAI-compatible models fail with an authentication error.
- The backend exits on startup if the environment is invalid (e.g. `CONTENT_ROOT` missing).

---

## Indexer Pipeline

| Stage | Command | Output |
|---|---|---|
| **Parse** | `npm run index:parse` | `problems.json`, `subjects.json`, `parse-report.json` (classification fields reset) |
| **Classify** | `npm run index:classify` | Enriches `problems.json` (topics, primary topic, patterns, seniority, interview value, one-liner) and `subjects.json` (topics, primary topic, key concepts) with LLM output; caches results in `classification.jsonl` / `subjects.classification.jsonl` for resumability |
| **Build** | `npm run index:build` | `interview.db` (tables + FTS5 indexes), `filters.json` |
| **Questions** (optional) | `npm run index:questions --prefix backend` | Quiz questions in the `subject_questions` table (5/10/15 per subject depending on its length) |

All outputs live in `backend/data/` (`interview.db`, `metadata/*.json`, `metadata/*.jsonl`); none of them are git-ignored.

- Classification is **resumable**: appends to JSONL, skips already-classified IDs on restart
- Problems: batches of 25 problems, 4 batches in parallel (~137 batches total); failed batches are retried 3x with exponential backoff, then split in half recursively; permanent failures are recorded in `classification.errors.json`
- Subjects: batches of 25, no retries
- Classification always uses the default model (`gpt-oss-120b`) at temperature 0; `--model` only affects the questions stage
- Build drops and recreates only the content tables — chat threads/messages, interview sessions and quiz questions are preserved (quiz questions are imported from `metadata/subject_questions.json` only when that file exists and the table is empty)
- `index:questions` only processes subjects without questions unless `--force` is passed; the Quiz page only lists subjects that have questions, so it stays empty until this stage has run

### Re-running classification (force)

The root scripts don't forward extra flags (`npm run index:classify -- --force` run from `app/` does **not** reach the indexer), so call the backend scripts directly:

- **All items, even previously classified**

  ```bash
  # Re-run LLM classification from scratch (deletes the JSONL caches)
  npm run index:classify --prefix backend -- --force

  # Rebuild the database and filters
  npm run index:build

  # Regenerate all quiz questions (optionally with another model)
  npm run index:questions --prefix backend -- --force --model=claude-sonnet-4
  ```

- **Docker tip**

  The DB lives in the bind-mounted `backend/data/`, so after rebuilding it locally just restart the backend (`docker compose restart backend`). `docker compose down -v` does not delete it.

- **Environment requirements**

  - Classification uses the default OpenAI-compatible model: provide `OPENAI_API_KEY` (and optional `OPENAI_BASE_URL`) or rely on OAuth fallback with `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_TOKEN_URL`.
  - Anthropic/Google keys alone are not enough for classification; they can be used for quiz questions via `--model=<claude or gemini model id>`.

---

## Content Enrichment CLI

The content enricher fills in thin problem files (description, examples, pseudocode approach, walkthrough, complexity, follow-ups, key takeaway) and applies fixes from an audit report. Besides the `content-enricher` chat mode, it has a batch CLI (backend-only scripts):

```bash
cd backend
npm run enrich -- --batch=5 --max-batches=10                  # enrich insufficient problem files
npm run enrich:audit -- --fix=all                              # apply fixes from audit_report.md
npm run enrich:audit -- --fix=insufficient_content --audit-file=/abs/path/audit_report.md
```

| Flag | Default | Description |
|---|---|---|
| `--model=<id>` | `gpt-oss-120b` | Model used by the enricher agent |
| `--batch=<n>` | `5` | Insufficient files per batch (capped at 10); also the batch size for audit `insufficient_content` fixes |
| `--max-batches=<n>` | unlimited | Stop after N batches (per issue type in audit mode) |
| `--audit` | — | Audit mode (already included in `enrich:audit`) |
| `--audit-file=<path>` | `<CONTENT_ROOT>/Data/Problems/LeetCode/audit_report.md` | Audit report to process |
| `--fix=<type>` | `all` | `wrong_primary_topic`, `missing_sub_topics`, `insufficient_content` or `all` |

- A problem file is "insufficient" when it has 12 lines or fewer, contains the placeholder "Solution approach and pseudocode to be added", or lacks a `## Problem Description` section (`INDEX.md` is skipped)
- Each batch uses a fresh agent; rate-limit errors back off 1-5 minutes and connection errors 15-75 s (up to 5 consecutive retries, then the loop aborts); other errors abort the loop after 3 consecutive failures
- `wrong_primary_topic` and `missing_sub_topics` fixes are applied directly to `metadata/problems.json` without the LLM; `insufficient_content` uses the LLM
- Enriched files are overwritten in place (no backup). The app renders problem sections from the DB, so enriched content appears only after `index:parse` -> `index:classify` -> `index:build`. Note that this re-index replaces metadata edits that were only written to `problems.json` (enricher classifications, audit fixes) with the values from `classification.jsonl`; running only `index:build` keeps those edits.

---

## API Endpoints

All endpoints are under `/api` and return `{ data, meta? }` on success or `{ error: { code, message, details? } }` on failure (unknown routes: `404 NOT_FOUND`; invalid input: `400 VALIDATION_ERROR`).

### Non-Agentic REST

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check with DB stats (`status`, `dbPath`, `problemCount`, `subjectCount`, `indexedAt`) |
| `GET` | `/api/filters` | Filter options: companies, difficulties, topics (with kind + problem counts), seniority (cached 60s) |
| `GET` | `/api/problems` | Filtered problem list (paginated, sortable) |
| `GET` | `/api/problems/random` | Random matching problem (`difficulties`, `topics`, `companies`; 404 if none) |
| `GET` | `/api/problems/:slug` | Full problem detail with markdown sections, raw file markdown and related slugs |
| `GET` | `/api/problems/:slug/solution` | Solution sections (spoiler-gated) |
| `GET` | `/api/subjects` | Filtered subject list (`topics`, `sourceFile`, `mainSubject`, `q`, `page`, `pageSize`) |
| `GET` | `/api/subjects/:id` | Full subject body |
| `GET` | `/api/companies` | Company typeahead (`q`, `limit` default 50, max 200) |
| `GET` | `/api/models` | Available AI model registry + `defaultModelId` |
| `GET` | `/api/quiz/stats` | Subjects grouped by main subject with question counts |
| `GET` | `/api/quiz` | Quiz questions: `subjects` (comma-separated ids, required), `limit` (1-200), `shuffle` (default `true`) |
| `POST` | `/api/quiz/regenerate/:subjectId` | Regenerate a subject's questions with the LLM (body: `{ modelId? }`) |

`GET /api/problems` query parameters:

| Param | Description |
|---|---|
| `companies`, `difficulties`, `topics`, `patterns` | Comma-separated (or repeated) values — company slugs, `Easy`/`Medium`/`Hard`, taxonomy topic ids, pattern strings |
| `seniority` | `junior`, `mid`, `senior`, `staff` or `principal` |
| `minAcceptance`, `maxAcceptance` | Acceptance-rate range |
| `minInterviewValue` | 1-5 |
| `hasSolution` | `true` / `false` |
| `q` | Full-text search (SQLite FTS5 syntax) |
| `matchMode` | `any` (default) or `all` — how multiple topics/companies combine |
| `sort` / `order` | `title`, `difficulty`, `acceptance`, `interviewValue` (default) / `asc`, `desc` (default); `companyFrequency` is accepted but falls back to `interviewValue` |
| `page` / `pageSize` | Default `1` / `25` (max 100) |

Responses include `meta: { page, pageSize, total, totalPages, appliedFilters }`.

### Agentic Chat

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send message; returns SSE stream with UI envelope |
| `GET` | `/api/threads` | List chat threads (most recently updated first) |
| `GET` | `/api/threads/:id` | Thread with messages (first 50, oldest first; each assistant message has `payloadJson` containing the full `ChatUiEnvelope`) |
| `DELETE` | `/api/threads/:id` | Delete thread (with its messages and interview sessions) |
| `POST` | `/api/threads/:id/title` | Update thread title (body: `{ title }`) |
| `GET` | `/api/interview-sessions/:threadId` | Mock interview session state (404 if none) |

`POST /api/chat` body:

| Field | Type | Required | Description |
|---|---|---|---|
| `message` | `string` | Yes | User message |
| `mode` | `auto` \| `free-chat` \| `find-problems` \| `mock-interview` \| `subject-quiz` \| `content-enricher` | No | Agent selection (default: `auto`) |
| `modelId` | `string` | No | Model id from `/api/models` (default: `gpt-oss-120b`) |
| `threadId` | `string` | No | Continue an existing thread (a new thread is created otherwise) |
| `stream` | `boolean` | No | `true` (default) = SSE stream; `false` = JSON `{ data: { threadId, modelId, agent, ui } }` |
| `context` | `{ subjectId?, problemSlug?, filters? }` | No | Extra context appended to the message for the agent |

### Content Upload

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload `.md` files as study material or interview problems |

Upload accepts `multipart/form-data` with the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `files` | `File[]` | Yes | One or more `.md` files (max 20, 5 MB each) |
| `type` | `"material" \| "problem"` | Yes | Content type |
| `title` | `string` | Yes | Title (for problems) or subject name (for material) |
| `agentic` | `boolean` | No | Enable LLM-based auto-classification (default: `false`) |
| `mainSubject` | `string` | No | Material only -- broad subject area (e.g., "AI", "JavaScript"); defaults to `title` |
| `subSubject` | `string` | No | Material only -- specific sub-topic (derived from the filename when empty) |
| `classification` | `string` | No | Problem only -- primary topic from taxonomy |
| `subClassification` | `string` | No | Problem only -- secondary topic |
| `difficulty` | `"Easy" \| "Medium" \| "Hard"` | No | Problem only -- difficulty level (used when the file has no `**Difficulty:**` line) |

**Non-agentic mode** saves files to `Data/Material/<subject>/` or `Data/Problems/LeetCode/`, updates `subjects.json`/`problems.json`, and inserts into the SQLite DB. Returns `{ data: { type, filesProcessed, items, message } }`.

**Agentic mode** (`agentic=true`) streams SSE events while an LLM agent classifies the content, optionally splits multi-topic material files into per-topic sub-files with renumbered headings, and saves the results. Events: `status` (`{ phase: 'starting' | 'complete', message }`), `tool` (`{ name, phase: 'start' | 'end', result? }`), then `result` (same shape as the non-agentic response data) and `done`, or `error`.

A request without files returns `400 NO_FILES`; non-`.md` files and files over 5 MB are rejected by the upload middleware.

### Chat Modes & Auto-Detection

The mode dropdown selects which agent handles the request (the UI defaults to **Free Chat**; API requests without `mode` use **Auto**). In **Auto** mode, the backend uses regex keyword matching to route:

| Keyword Pattern | Resolved Agent |
|---|---|
| `mock interview`, `interview me`, `practice session`, `simulate` | Mock Interview |
| `quiz`, `question(s) about`, `test me on` | Subject Quiz |
| `enrich`, `insufficient`, `fill in`, `add description(s)`, `improve content` | Content Enricher |
| _(fallback)_ | Find Problems |

Free Chat is never selected automatically.

---

## NPM Scripts

### Root (`app/`)

| Script | Description |
|---|---|
| `npm run dev:backend` | Start backend dev server with hot reload |
| `npm run dev:frontend` | Start Angular dev server (opens the browser) |
| `npm run index:parse` | Run parse stage |
| `npm run index:classify` | Run LLM classification |
| `npm run index:build` | Build SQLite DB |
| `npm run index:all` | Run full indexer pipeline (parse + classify + build) |
| `npm run test:backend` | Run backend tests |

Root scripts only delegate to `backend/` and `frontend/` (`npm run <script> --prefix ...`) and do not forward extra CLI flags.

### Backend (`app/backend/`)

| Script | Description |
|---|---|
| `npm run dev` | `tsx watch` with TLS bypass |
| `npm run start` | Production start (`tsx src/index.ts`, TLS bypass) |
| `npm run index:parse` / `index:classify` / `index:build` / `index:all` | Indexer stages (`index:classify -- --force` re-classifies everything) |
| `npm run index:questions` | Generate quiz questions (`-- --force`, `-- --model=<id>`) |
| `npm run enrich` | Content-enricher batch loop (see [Content Enrichment CLI](#content-enrichment-cli)) |
| `npm run enrich:audit` | Content-enricher audit-fix loop |
| `npm test` | Run all `*.test.ts` files |

### Frontend (`app/frontend/`)

| Script | Description |
|---|---|
| `npm run dev` | `ng serve --open` |
| `npm start` | `ng serve` |
| `npm run build` | Production build (`dist/frontend/browser`) |
| `npm run watch` | Development build in watch mode |
| `npm test` | Karma + Jasmine unit tests (requires Chrome) |

---

## Testing

```bash
# Backend unit + integration tests (100 tests, no LLM or network calls)
npm run test:backend

# Full verification (from app/)
(cd backend && npx tsc --noEmit --skipLibCheck)   # backend types
npm test --prefix backend                         # backend tests
npm run build --prefix frontend                   # Angular production build

# Frontend unit tests (Karma, requires Chrome)
npm test --prefix frontend
```

Notes:
- The backend tests use temporary SQLite DBs in `/tmp` and fake API keys. Several test files default `CONTENT_ROOT` to `/home/sio/Code/Interview`, and the parser tests read real content files from it — adjust that path when running on another machine.
- `frontend/src/app/app.component.spec.ts` is still the Angular CLI scaffold (it expects a `title` property and an `<h1>` the app no longer has), so the Karma run fails to compile until that spec is updated.
