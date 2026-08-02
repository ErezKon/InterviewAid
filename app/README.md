# Interview Prep Platform

A monorepo with a Node/TypeScript backend (REST API over an LLM-classified SQLite index of 3,415 LeetCode problems and theory markdown) and an Angular 19 frontend (Angular Material + NgRx Signal Store) offering metadata filtering, streaming **Generative UI** chat with AI agents, mock interviews, and subject quizzes.

The chat system uses a **GenUI architecture**: every agent response is a structured `{ component, message, inputs, followUpSuggestions }` envelope that tells the frontend which Angular component to render, eliminating all client-side JSON heuristics.

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js 22+** and **npm 10+**
- API keys for your OpenAI-compatible and/or Anthropic providers, or OAuth client credentials (see [Environment Variables](#environment-variables))

### 1. Install dependencies

```bash
cd app
npm install            # installs both backend and frontend workspaces
```

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env — either:
#  - set OPENAI_API_KEY (and optional OPENAI_BASE_URL), and/or ANTHROPIC_API_KEY (and optional ANTHROPIC_BASE_URL)
#  - or set OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_TOKEN_URL to enable OAuth token fallback when API keys are not provided
```

### 3. Run the indexer (one-time, ~10-20 min for classification)

```bash
npm run index:parse       # Parse 3,415 problem .md + theory docs -> JSON
npm run index:classify    # LLM classification (needs OPENAI_API_KEY or OAuth fallback) -- resumable
npm run index:build       # Build SQLite DB + FTS5 indexes

# Or all at once:
npm run index:all
```

The indexer outputs are committed so the LLM classification pass only needs to run once. Use `--force` flag to re-classify.

### 4. Start development servers

```bash
# Terminal 1 -- Backend (http://localhost:3100)
npm run dev:backend

# Terminal 2 -- Frontend (http://localhost:4200, proxies /api -> backend)
npm run dev:frontend
```

Open **http://localhost:4200** in your browser.

> **Note:** In some corporate networks, TLS interception may require temporarily disabling strict TLS verification during native builds. The Dockerfiles set `NODE_TLS_REJECT_UNAUTHORIZED=0` inline only for build steps that fetch native dependencies. Do not use this in production. **Never commit API keys or secrets.**

---

## Docker (Production)

### Prerequisites

- **Docker** and **Docker Compose v2+**

### Build & Run

```bash
cd app

# Fill in secrets
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

# Ensure the DB and metadata exist (run indexer locally first, or mount pre-built data)
npm run index:all

# Build and start containers
docker compose up --build -d

# Frontend:  http://localhost:4200
# Backend:   http://localhost:3100
```

### Services

| Service | Image Base | Port | Description |
|---|---|---|---|
| `backend` | `node:22-slim` | 3100 | Express + SQLite + LangChain agents |
| `frontend` | `nginx:alpine` | 4200->80 | Angular production build, `/api` proxied to backend |

### Volumes

- `../:/content:ro` -- mounts the Interview repo root as read-only content for the backend
- `./backend/data:/app/data` -- persists SQLite DB and metadata between container restarts

### Stop & Clean

```bash
docker compose down          # stop containers
docker compose down -v       # stop + remove volumes
docker compose build --no-cache  # full rebuild
```

---

## Architecture

```
app/
├── package.json                      # npm workspaces root
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── src/
│       ├── index.ts                  # Express bootstrap
│       ├── config/                   # env, models, paths
│       ├── db/                       # SQLite connection, schema (with app_meta), queries
│       ├── indexer/                  # parse -> classify -> build pipeline
│       ├── routes/
│       │   └── chat.routes.ts        # SSE streaming, envelope validation, slug guard
│       ├── services/                 # Business logic layer
│       ├── agents/
│       │   ├── model-factory.ts      # ChatOpenAI / ChatAnthropicVertex + createResponseFormat()
│       │   ├── shared/
│       │   │   ├── ui-response.schema.ts   # chatUiResponseSchema (Zod) -- shared by all agents
│       │   │   ├── ui-response.prompt.ts   # <component-logic> prompt block
│       │   │   └── tools/                  # Shared tool factories
│       │   ├── problem-finder/       # createAgent + 6 tools
│       │   ├── mock-interview/       # createAgent + 4 tools
│       │   ├── subject-quiz/         # createAgent + 2 tools
│       │   └── content-enricher/     # createAgent + 5 tools
│       ├── llm/                      # ChatAnthropicVertex (bindTools, streaming)
│       ├── types/
│       └── utils/
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    └── src/app/
        ├── core/
        │   ├── models/chat.model.ts        # ChatUiEnvelope, ChatComponentName, ChatMessage
        │   └── services/markdown.service.ts
        ├── state/
        │   └── chat.store.ts               # SSE handler: result -> ui envelope, done -> fallback
        └── features/
            └── chat/
                ├── component-registry.ts          # CHAT_COMPONENT_REGISTRY map
                ├── chat-component-host/           # NgComponentOutlet dynamic host
                ├── chat-page/                     # Main chat page (message loop + follow-up chips)
                ├── chat-markdown-viewer/           # Reused in chat, problem-detail, subject-detail
                ├── chat-quiz-cards/                # Interactive quiz with reveal/score
                └── components/
                    ├── chat-text/                  # Empty (message rendered by chat page)
                    ├── chat-problem-list/           # Problem cards with filter chips + router links
                    ├── chat-hint-card/              # Progressive hint reveal
                    ├── chat-interview-question/     # Stage chip + progress bar + question
                    ├── chat-evaluation-scorecard/   # 4-axis score bars + average badge
                    └── chat-enrichment-report/      # Stat tiles + file status list
```

---

## Generative UI Chat System

### How It Works

The chat uses a **Generative UI (GenUI)** pattern where the LLM decides which Angular component renders each response. Instead of the frontend parsing raw text and guessing at the format, every agent returns a typed envelope:

```
User message
    |
    v
detectMode() -> one of 4 agents (createAgent + responseFormat: chatUiResponseSchema)
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

All four agents are built with `createAgent` + `ChatOpenAI` (via `model-factory.ts`) and share one `responseFormat` (`chatUiResponseSchema`). The `createResponseFormat()` helper is provider-aware: native JSON-schema for OpenAI-compatible models, `toolStrategy()` (synthetic tool call) for `ChatAnthropicVertex`.

| Agent | Tools | UI Components |
|---|---|---|
| **Problem Finder** | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint`, `search_subjects`, `get_subject` | `chat-problem-list`, `chat-markdown-viewer`, `chat-hint-card`, `text` |
| **Mock Interview** | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint` | `chat-interview-question`, `chat-evaluation-scorecard`, `chat-hint-card`, `text` |
| **Subject Quiz** | `search_subjects`, `get_subject` | `chat-quiz-cards`, `chat-markdown-viewer`, `text` |
| **Content Enricher** | `scan_problems`, `read_problem_file`, `enrich_problem_file`, `update_problem_metadata`, `read_audit_report` | `chat-enrichment-report`, `text` |

### Safety & Reliability

- **3-tier envelope validation**: `safeParse(structuredResponse)` -> `extractJson(rawText)` -> graceful `text` fallback. Responses never throw.
- **Slug validation**: problem slugs in `inputs.problems` are checked against the DB; hallucinated slugs are silently dropped.
- **Input filtering**: the host component only passes keys listed in the registry's `inputKeys`, so extra LLM-generated keys are silently ignored.
- **Streaming resilience**: the `done` SSE event applies a fallback `text` envelope if `result` never arrived, so the bubble is never blank.

### Component Catalog

| Component | When Used | Key Inputs |
|---|---|---|
| `text` | Plain conversational reply, clarifying question, error | _(none -- message is rendered by the chat page)_ |
| `chat-markdown-viewer` | Raw study material, source content | `content` (markdown), `title` |
| `chat-quiz-cards` | Generated quiz questions with interactive reveal/score | `questions`, `studyTips`, `subject` |
| `chat-problem-list` | Recommended coding problems with filter chips | `problems` (cards with slug, title, difficulty, topics, companies, why), `interpretedFilters` |
| `chat-hint-card` | Progressive hints (collapsed behind reveal buttons) | `hints` (slug, level, text), `problemTitle` |
| `chat-interview-question` | Mock interview question with progress tracking | `stage`, `questionText`, `sessionProgress`, `nextAction`, `hintsGiven` |
| `chat-evaluation-scorecard` | Candidate answer scoring (4 axes, 1-5 scale) | `evaluation` (correctness, complexity, communication, edgeCases, notes) |
| `chat-enrichment-report` | Content enrichment run results | `enrichment` (filesScanned, filesEnriched, auditSummary, items) |

### Chat Capabilities -- Examples

Below are example questions you can ask in each mode, and what the response looks like.

#### Find Problems (mode: `find-problems`)

| Example Question | Response View |
|---|---|
| _"hard graph problems asked at Google"_ | **`chat-problem-list`** -- filter chips (`Google`, `Hard`, `graph`) above a list of problem cards, each with title (linked to `/problems/:slug`), difficulty badge, topic/company chips, and a "why" sentence explaining relevance. |
| _"show me the study material on agent memory"_ | **`chat-markdown-viewer`** -- a card with the raw markdown content from the matching subject, rendered with code highlighting and mermaid diagrams. |
| _"give me a hint for two-sum"_ | **`chat-hint-card`** -- progressive hints (level 1 = nudge, level 2 = approach, level 3 = near-solution), each hidden behind a "Reveal Hint N" button. |
| _"what topics should I study for a senior backend role?"_ | **`text`** -- a conversational markdown response with advice and follow-up suggestion chips like "Find Hard problems on system design" or "Quiz me on distributed systems". |
| _"medium dynamic programming problems for Amazon"_ | **`chat-problem-list`** -- filter chips (`Amazon`, `Medium`, `dynamic-programming`) and matching problem cards with links. |

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
| _"quiz me on vector databases"_ | **`chat-quiz-cards`** -- a subject caption ("Vector Databases"), then 5 cards, each with a question number, difficulty chip (`easy`/`medium`/`hard`), type chip (`MC`/`Open`). Multiple-choice cards show clickable options that highlight green/red on selection. Open questions have a "Reveal Answer" button. Each revealed answer shows the expected answer, a verbatim reference quote from the source material, and an optional follow-up. A running score counter at the bottom. |
| _"show me the material on B-trees"_ | **`chat-markdown-viewer`** -- the raw theory markdown for the B-trees subject, rendered with headings, code blocks, and diagrams. |
| _"quiz me on both graph algorithms and dynamic programming, 3 questions each"_ | **`chat-quiz-cards`** -- 6 cards covering both subjects, with the subject caption, mixed difficulty levels, and study tips at the bottom. |

#### Content Enricher (mode: `content-enricher`)

| Example Question | Response View |
|---|---|
| _"enrich all insufficient problems in the arrays folder"_ | **`chat-enrichment-report`** -- two stat tiles ("Scanned: 42", "Enriched: 8"), an audit summary in markdown, and a file-by-file list with status icons (green checkmark for enriched, yellow circle for skipped, red X for failed) and notes. |
| _"fix the audit findings for wrong primary topics"_ | **`chat-enrichment-report`** -- shows metadata corrections applied, with each file listed as enriched/skipped. |

#### General / Auto Mode

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
| `token` | `{ delta }` | Streaming AI text (shown as typing indicator) |
| `tool` | `{ name, phase, summary }` | Tool call start/end with argument/result previews |
| `result` | `{ threadId, ui: ChatUiEnvelope }` | Final validated envelope |
| `done` | `{}` | Stream complete |
| `error` | `{ message }` | Error message |

### Adding a New Component

To add a 9th (or Nth) component:

1. **Backend**: add the component name to `CHAT_COMPONENTS` in `agents/shared/ui-response.schema.ts`, add its input fields to `chatInputsSchema`, and update the `<component-logic>` block in `agents/shared/ui-response.prompt.ts`.
2. **Frontend**: create the Angular component under `features/chat/components/`, then add it to `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` with its `inputKeys`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: `3100`) |
| `CONTENT_ROOT` | Yes | Absolute path to the Interview repo root |
| `DB_PATH` | No | SQLite DB path (default: `./data/interview.db`) |
| `OPENAI_API_KEY` | Optional | API key for OpenAI-compatible models; if not set, OAuth fallback will be used |
| `OPENAI_BASE_URL` | Optional | Base URL for OpenAI-compatible endpoints (e.g., OSS gateways) |
| `ANTHROPIC_API_KEY` | Optional | API key for Anthropic models; if not set, OAuth fallback will be used |
| `ANTHROPIC_BASE_URL` | Optional | Base URL for Anthropic Vertex-style endpoints |
| `OAUTH_CLIENT_ID` | Optional | OAuth client ID used to request bearer tokens when API keys are absent |
| `OAUTH_CLIENT_SECRET` | Optional | OAuth client secret used with client credentials flow |
| `OAUTH_TOKEN_URL` | Optional | OAuth token URL (client_credentials) used to mint bearer tokens |
| `DEBUG_RUNS` | No | Enable agent debug dumps (default: `false`) |

Behavior:
- For OpenAI-like provider, the backend uses `OPENAI_API_KEY` if present; otherwise it calls the OAuth client-credentials flow (`OAUTH_*`) to obtain a bearer token.
- For Anthropic provider, the backend uses `ANTHROPIC_API_KEY` if present; otherwise it falls back to OAuth in the same way.

---

## Indexer Pipeline

| Stage | Command | Output | Committed? |
|---|---|---|---|
| **Parse** | `npm run index:parse` | `problems.json`, `subjects.json`, `parse-report.json` | No |
| **Classify** | `npm run index:classify` | Enriches `problems.json` and `subjects.json` with LLM-assigned topics, patterns, seniority, etc. (uses `classification.jsonl` for resumability) | **Yes** |
| **Build** | `npm run index:build` | `interview.db`, `filters.json` | No |

- Classification is **resumable**: appends to JSONL, skips already-classified IDs on restart
- Retries failed batches 3x with exponential backoff, then splits and records errors
- Concurrency: 4 batches of 25 problems each (~137 batches total)

### Re-running classification (force)

- **All items, even previously classified**

  ```bash
  # Re-run LLM classification from scratch
  npm run index:classify -- --force
  
  # Rebuild the database and filters
  npm run index:build
  ```

- **Docker tip**

  If you persist the DB volume, do a clean rebuild to reflect reclassification:

  ```bash
  docker compose down -v
  docker compose up --build -d
  ```

- **Environment requirements**

  - Provide `OPENAI_API_KEY` (and optional `OPENAI_BASE_URL`) or rely on OAuth fallback with `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_TOKEN_URL`.

---

## API Endpoints

### Non-Agentic REST

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check with DB stats |
| `GET` | `/api/filters` | Filter options (cached 60s) |
| `GET` | `/api/problems` | Filtered problem list (paginated, sortable) |
| `GET` | `/api/problems/:slug` | Full problem detail with markdown |
| `GET` | `/api/problems/:slug/solution` | Solution sections (spoiler-gated) |
| `GET` | `/api/problems/random` | Random matching problem |
| `GET` | `/api/subjects` | Filtered subject list |
| `GET` | `/api/subjects/:id` | Full subject body |
| `GET` | `/api/companies` | Company typeahead |
| `GET` | `/api/models` | Available AI model registry |

### Agentic Chat

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send message; returns SSE stream with UI envelope |
| `GET` | `/api/threads` | List chat threads |
| `GET` | `/api/threads/:id` | Thread with messages (each assistant message has `payloadJson` containing the full `ChatUiEnvelope`) |
| `DELETE` | `/api/threads/:id` | Delete thread |
| `POST` | `/api/threads/:id/title` | Update thread title |
| `GET` | `/api/interview-sessions/:threadId` | Mock interview session state |

### Chat Modes & Auto-Detection

The mode dropdown selects which agent handles the request. In **Auto** mode, the backend uses regex keyword matching to route:

| Keyword Pattern | Resolved Agent |
|---|---|
| `mock interview`, `interview me` | Mock Interview |
| `quiz`, `test me on` | Subject Quiz |
| `enrich`, `insufficient` | Content Enricher |
| _(fallback)_ | Find Problems |

---

## NPM Scripts

### Root (`app/`)

| Script | Description |
|---|---|
| `npm run dev:backend` | Start backend dev server with hot reload |
| `npm run dev:frontend` | Start Angular dev server |
| `npm run index:parse` | Run parse stage |
| `npm run index:classify` | Run LLM classification |
| `npm run index:build` | Build SQLite DB |
| `npm run index:all` | Run full indexer pipeline |
| `npm run test:backend` | Run backend tests |

### Backend (`app/backend/`)

| Script | Description |
|---|---|
| `npm run dev` | `tsx watch` with TLS bypass |
| `npm run start` | Production start |
| `npm test` | Run all `*.test.ts` files |

---

## Testing

```bash
# Backend unit + integration tests (89 tests)
npm run test:backend

# Frontend tests
cd frontend && npm test

# Full verification
npx tsc --noEmit -p backend/tsconfig.json   # backend types
npm test -w backend                          # backend tests
npm run build -w frontend                    # Angular production build
```
