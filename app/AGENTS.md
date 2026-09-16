# AGENTS.md — Interview Prep Platform

> Comprehensive guide for AI agents working on this codebase.
> Read this before exploring files — it covers architecture, conventions, data flow, and all key files.

---

## Table of Contents

- [Quick Reference](#quick-reference)
- [Project Overview](#project-overview)
- [Repository Layout](#repository-layout)
- [Development Commands](#development-commands)
- [Architecture Overview](#architecture-overview)
- [Backend Deep Dive](#backend-deep-dive)
- [Frontend Deep Dive](#frontend-deep-dive)
- [Generative UI (GenUI) System](#generative-ui-genui-system)
- [Agent System](#agent-system)
- [Indexer Pipeline](#indexer-pipeline)
- [Database Schema](#database-schema)
- [Conventions and Patterns](#conventions-and-patterns)
- [Adding New Features](#adding-new-features)
- [Common Pitfalls](#common-pitfalls)

---

## Quick Reference

### Build & Verify

```bash
# Frontend build (from app/frontend/)
npx ng build

# Backend type-check (from app/backend/)
npx tsc --noEmit --skipLibCheck

# Backend tests (from app/backend/)
npm test

# Run dev servers (from app/)
npm run dev:backend   # Terminal 1 — http://localhost:3100
npm run dev:frontend  # Terminal 2 — http://localhost:4200
```

### Key Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19, Angular Material, NgRx Signal Store, SCSS |
| Backend | Node.js 22, Express 5, TypeScript (tsx runner), SQLite (better-sqlite3) |
| AI/LLM | LangChain + LangGraph, multi-provider (OpenAI-compatible, Anthropic, Google) |
| Chat protocol | Server-Sent Events (SSE) with structured GenUI envelopes |
| Styling | Angular Material Azure Blue theme, custom dark theme via CSS variables |

### Important Files At A Glance

| Purpose | File |
|---|---|
| Express bootstrap | `backend/src/index.ts` |
| Chat SSE route | `backend/src/routes/chat.routes.ts` |
| Mode detection | `backend/src/routes/chat.routes.ts` → `detectMode()` |
| Agent model factory | `backend/src/agents/model-factory.ts` |
| Shared UI schema (backend) | `backend/src/agents/shared/ui-response.schema.ts` |
| Shared UI prompt | `backend/src/agents/shared/ui-response.prompt.ts` |
| UI envelope types (frontend) | `frontend/src/app/core/models/chat.model.ts` |
| Component registry (frontend) | `frontend/src/app/features/chat/component-registry.ts` |
| Chat store | `frontend/src/app/state/chat.store.ts` |
| Chat page | `frontend/src/app/features/chat/chat-page/` |
| Global styles + dark theme | `frontend/src/styles.scss` |
| Environment config | `backend/src/config/env.ts` |
| DB connection + schema | `backend/src/db/connection.ts` + `backend/src/db/schema.sql` |
| Content paths | `backend/src/config/paths.ts` |
| Model registry | `backend/src/config/models.ts` |

---

## Project Overview

A monorepo with a **Node/TypeScript backend** and an **Angular 19 frontend** for interview preparation. It indexes ~3,400 LeetCode problems and theory markdown documents into a SQLite database, then provides:

- Problem search with metadata filtering (company, topic, difficulty, seniority, patterns)
- Streaming AI chat with multiple agent modes (free chat, problem finding, mock interviews, quizzes, content enrichment)
- Generative UI: the LLM chooses which Angular component renders each response
- Subject/theory browsing with markdown rendering and Mermaid diagrams
- Interactive quizzes generated from study material
- Content uploads (manual or AI-agentic classification)

---

## Repository Layout

```
app/
├── package.json                          # Root scripts (delegates to backend/frontend)
├── docker-compose.yml                    # Two-service production deployment
├── AGENTS.md                             # This file
│
├── backend/
│   ├── package.json                      # type: "module", tsx runner, no compiled build
│   ├── tsconfig.json                     # ES2022, ESNext modules, bundler resolution, strict
│   ├── Dockerfile                        # Multi-stage: builder (native deps) + runtime (tsx)
│   ├── .env.example                      # Required env vars documentation
│   └── src/
│       ├── index.ts                      # Express bootstrap, middleware, router registration
│       ├── config/
│       │   ├── env.ts                    # Zod-validated environment (PORT, CONTENT_ROOT, API keys, etc.)
│       │   ├── models.ts                 # LLM model registry, provider detection, ModelDef interface
│       │   └── paths.ts                  # Derived content/data/metadata paths
│       ├── db/
│       │   ├── connection.ts             # Singleton SQLite, schema init, WAL mode, chat migration
│       │   ├── schema.sql                # All CREATE TABLE IF NOT EXISTS statements
│       │   └── queries.ts               # Small stat queries (problem count, subject count, indexed-at)
│       ├── routes/
│       │   ├── chat.routes.ts            # SSE streaming + non-streaming chat, mode detection, envelope validation
│       │   ├── upload.routes.ts          # Multer multipart, manual + agentic upload with SSE progress
│       │   ├── problems.routes.ts        # GET /problems, /problems/:slug, /problems/:slug/solution
│       │   ├── subjects.routes.ts        # GET /subjects, /subjects/:id
│       │   ├── filters.routes.ts         # GET /filters (companies, topics, difficulties)
│       │   ├── models.routes.ts          # GET /models (available LLM models)
│       │   ├── sessions.routes.ts        # GET/DELETE /threads, GET /threads/:id
│       │   ├── quiz.routes.ts            # GET /quiz/stats, /quiz/questions, POST /quiz/regenerate
│       │   ├── companies.routes.ts       # GET /companies
│       │   └── health.routes.ts          # GET /health
│       ├── services/
│       │   ├── problem.service.ts        # Search, filter, paginate, detail, solution, random
│       │   ├── subject.service.ts        # Search, filter, paginate, detail
│       │   ├── session.service.ts        # Chat threads, messages, interview sessions (SQLite CRUD)
│       │   ├── quiz.service.ts           # Quiz stats, questions, regeneration
│       │   ├── quiz-generator.service.ts # LLM-based question generation from subject markdown
│       │   ├── upload.service.ts         # Manual + agentic file handling, disk writes, DB inserts
│       │   └── sse.service.ts            # initSse, sendSseEvent, sendSseDone, sendSseError, heartbeat
│       ├── agents/
│       │   ├── model-factory.ts          # createChatModel, createResponseFormat, extractJson
│       │   ├── shared/
│       │   │   ├── ui-response.schema.ts # chatUiResponseSchema (Zod) — THE contract
│       │   │   ├── ui-response.prompt.ts # UI_RESPONSE_PROMPT — component-logic instructions
│       │   │   └── tools/               # 6 shared tools (see Agent System section)
│       │   ├── free-chat/               # Tutoring/study partner agent
│       │   ├── problem-finder/          # Problem search + recommendations agent
│       │   ├── mock-interview/          # Stateful interview simulation agent
│       │   ├── subject-quiz/            # Quiz generation from theory agent
│       │   ├── content-enricher/        # Batch content enrichment agent + CLI loop
│       │   └── content-uploader/        # Agentic file classification + upload agent
│       ├── types/
│       │   ├── api.types.ts             # Zod schemas for all request bodies/query params
│       │   └── problem.types.ts         # Internal problem/subject TypeScript interfaces
│       ├── utils/
│       │   ├── logger.ts                # createLogger(tag) — colored timestamped logging
│       │   ├── errors.ts                # AppError, NotFoundError, ValidationError
│       │   ├── oauth.util.ts            # OAuth2 client-credentials token cache
│       │   └── log-colors.util.ts       # ANSI color constants
│       └── indexer/                     # Parse → Classify → Build pipeline (see Indexer section)
│
├── frontend/
│   ├── package.json                      # Angular 19, Material, NgRx Signals, Mermaid, marked
│   ├── angular.json                      # Build config, SCSS, proxy, budgets
│   ├── tsconfig.json                     # Strict TS + strict Angular templates
│   ├── Dockerfile                        # Build (Node) + Serve (Nginx)
│   ├── nginx.conf                        # SPA fallback, /api proxy to backend, SSE support, gzip
│   └── src/
│       ├── main.ts                       # Angular bootstrap
│       ├── index.html                    # Document shell, Google Fonts, Material Icons
│       ├── styles.scss                   # Global styles + dark theme CSS variables
│       ├── proxy.conf.json              # Dev proxy: /api → localhost:3100
│       └── app/
│           ├── app.config.ts             # Providers: zone, router (withComponentInputBinding), HTTP, animations
│           ├── app.routes.ts             # Lazy-loaded routes for all feature pages
│           ├── app.component.*           # Shell: toolbar, nav links, theme toggle, router-outlet
│           ├── core/
│           │   ├── api/                  # HTTP/SSE API services (chat, problems, subjects, etc.)
│           │   ├── models/               # TypeScript interfaces for all domain objects
│           │   ├── services/
│           │   │   ├── markdown.service.ts  # marked + highlight.js rendering
│           │   │   └── theme.service.ts     # Dark/light toggle, localStorage persistence
│           │   └── directives/
│           │       └── mermaid.directive.ts  # [appMermaid] — renders Mermaid blocks after innerHTML
│           ├── state/                    # NgRx Signal Stores (chat, filters, models, problems, quiz, subjects, upload)
│           └── features/
│               ├── chat/                 # Chat page, dynamic component host, all GenUI components
│               ├── problems/             # Problem list + detail pages
│               ├── subjects/             # Subject list + detail pages
│               ├── quiz/                 # Interactive quiz page
│               └── upload/               # File upload page (manual + agentic)
```

---

## Development Commands

All commands run from the `app/` root unless noted.

| Command | Description |
|---|---|
| `npm run dev:backend` | Start backend with tsx watch (hot reload) on `:3100` |
| `npm run dev:frontend` | Start Angular dev server on `:4200` (proxies `/api` to `:3100`) |
| `npm run index:parse` | Parse markdown files into `problems.json` + `subjects.json` |
| `npm run index:classify` | LLM classification (resumable, uses JSONL) |
| `npm run index:build` | Build SQLite DB + FTS5 indexes + `filters.json` |
| `npm run index:all` | Run parse + classify + build sequentially |
| `npm run test:backend` | Run backend tests (`tsx --test`) |
| `cd frontend && npx ng build` | Production frontend build |
| `cd backend && npx tsc --noEmit --skipLibCheck` | Backend type-check (no emit) |

### Docker

```bash
cp backend/.env.example backend/.env  # Fill in API keys
docker compose up --build -d           # Frontend :4200, Backend :3100
docker compose down                    # Stop
```

---

## Architecture Overview

### Development Topology

```
Browser :4200 ──> Angular CLI dev server
                    └── /api/* proxy ──> Express backend :3100
                                           └── SQLite (better-sqlite3)
                                           └── LLM providers (OpenAI/Anthropic/Google)
```

### Production Topology (Docker)

```
Browser :4200 ──> Nginx
                    ├── Static Angular files
                    └── /api/* ──> backend:3100
                                     ├── Content at /content (bind mount)
                                     └── SQLite at /app/data/interview.db (bind mount)
```

### Data Flow

```
Markdown content files
    │
    ├── parse (parse-problem-md.ts, parse-theory-md.ts)
    │       → metadata/problems.json, metadata/subjects.json
    │
    ├── classify (classify-with-llm.ts)
    │       → enriched JSON + classification.jsonl
    │
    └── build (build-db.ts)
            → interview.db (SQLite + FTS5) + filters.json
                │
    ┌───────────┼──────────────────────────┐
    ▼           ▼                          ▼
problem.service  subject.service    quiz.service
    │           │                          │
    ▼           ▼                          ▼
REST routes + Agent tools ──> Chat SSE ──> Frontend GenUI
```

---

## Backend Deep Dive

### Express Bootstrap (`index.ts`)

1. Creates Express app with CORS + JSON parsing
2. Adds request-ID middleware (reads `x-request-id` or generates UUID prefix)
3. Initializes SQLite schema (tolerates failure — server starts anyway)
4. Registers all routers under `/api`
5. Centralized error handling:
   - `AppError` → configured status/code
   - `ZodError` → HTTP 400
   - Unknown → HTTP 500

### Configuration

**`config/env.ts`** — Zod-validated environment at import time. Exits process on validation failure.

| Variable | Required | Default | Notes |
|---|---|---|---|
| `PORT` | No | `3100` | Converted to number |
| `CONTENT_ROOT` | Yes | — | Path to Interview repo root |
| `DB_PATH` | No | `./data/interview.db` | SQLite file location |
| `OPENAI_API_KEY` | Optional | — | When set, OAuth not required |
| `OPENAI_BASE_URL` | Optional | — | For compatible gateways |
| `ANTHROPIC_API_KEY` | Optional | — | Claude models |
| `GOOGLE_API_KEY` | Optional | — | Gemini models |
| `OAUTH_*` | Optional | — | Fallback for OpenAI-compatible when no API key |
| `DEBUG_RUNS` | No | `false` | Saves agent input/output dumps to `data/runs/` |

**`config/paths.ts`** — Derived paths. Assumes content repo has:
- `Data/Problems/LeetCode/` — problem markdown files
- `LeetCode/problems_data.json` — external problem metadata
- `LeetCode/Raw By Company/` — company-tagged problem lists
- `Data/Material/` — theory/study material markdown

**`config/models.ts`** — LLM model registry.

Key exports:
- `MODELS` — array of `ModelDef` (id, label, provider, capabilities, temperature, maxTokens)
- `DEFAULT_MODEL_ID` — first registered model
- `detectProvider(name)` — `/claude|anthropic/` → anthropic, `/gemini/` → google, else → openai-like
- `getModel(id?)` — returns registered def or creates dynamic one with inferred provider

### Services

| Service | File | Responsibility |
|---|---|---|
| `problem.service` | Dynamic SQL builder with FTS, filtering, pagination, detail hydration, solution retrieval |
| `subject.service` | Subject search/filter/pagination, detail lookup |
| `session.service` | Chat thread CRUD, message persistence, interview session upsert |
| `quiz.service` | Quiz stats, question retrieval, regeneration via LLM |
| `quiz-generator.service` | LLM question generation from subject markdown |
| `upload.service` | Manual/agentic upload, file writing, metadata JSON updates, DB inserts |
| `sse.service` | SSE helpers: `initSse`, `sendSseEvent`, `sendSseDone`, `sendSseError`, `startHeartbeat` |

### Services — Key Patterns

- **Database fields** use `snake_case`; **API/service objects** use `camelCase`. Services map between them.
- **IDs**: UUIDs for threads/messages/sessions; slugs for problems; derived IDs for subjects.
- **Timestamps**: ISO strings everywhere.
- **SQL**: Dynamic query building with named parameters (`WHERE slug = :slug`), never string interpolation.
- **Transactions**: Used for bulk writes (quiz regeneration, uploads, DB rebuild).
- **Error handling**: Services throw `NotFoundError`/`ValidationError`; `index.ts` converts to JSON responses.
- **FTS**: `problems_fts` and `subjects_fts` virtual tables are built by the indexer, not `schema.sql`.

### Chat Route (`routes/chat.routes.ts`)

This is the most complex route. Flow:

1. Validate body with `chatBodySchema` (Zod)
2. `detectMode(message, mode)` — resolves `auto` to a specific mode via regex
3. Get or create thread (persists in SQLite)
4. Persist user message
5. Replay recent history (12 messages) as LangChain `HumanMessage`/`AIMessage`
6. Enrich message with context (problem slug, subject ID, filters)
7. Create agent based on resolved mode
8. **Stream path** (SSE): stream agent, emit `meta`/`step`/`token`/`tool`/`result`/`done`/`error` events
9. **Non-stream path**: collect final state, return JSON
10. `toEnvelope()` — 3-tier validation: `safeParse(structured)` → `extractJson(rawText)` → `text` fallback
11. `validateProblemSlugs()` — drops hallucinated slugs by checking DB

Mode detection regexes (only for `auto` mode):
- `mock-interview`: `/mock\s*interview|interview\s*me|practice\s*session|simulate/i`
- `subject-quiz`: `/quiz|questions?\s*about|test\s*me\s*on/i`
- `content-enricher`: `/enrich|insufficient|fill\s*in|add\s*descriptions?|improve\s*content/i`
- Default fallback: `find-problems`
- `free-chat`: manual selection only (no auto-detection)

### Upload Route (`routes/upload.routes.ts`)

- Multer memory storage, 5 MB/file, max 20 files, `.md` only
- Manual: synchronous `handleUpload()` → JSON response
- Agentic: SSE stream with progress events, heartbeat, client disconnect tracking

### Utilities

- **`logger.ts`**: `createLogger(tag)` → colored timestamped `debug/info/warn/error`
- **`errors.ts`**: `AppError` (code, status, details), `NotFoundError`, `ValidationError`
- **`oauth.util.ts`**: Client-credentials token cache with 60s pre-expiry refresh, concurrent request dedup. Returns `'direct-api-key-mode'` sentinel when direct API keys are configured.

---

## Frontend Deep Dive

### Application Shell

**`app.config.ts`** — Standalone Angular providers:
- Zone change detection with event coalescing
- Router with `withComponentInputBinding()` (route params → signal inputs)
- HTTP client with Fetch backend
- Async animations

**`app.component.ts`** — On init: applies theme, loads filter options, loads model list.

**`app.routes.ts`** — All feature pages are lazy-loaded via `loadComponent`. Route params:
- `/problems/:slug` → `ProblemDetailComponent.slug`
- `/subjects/:id` → `SubjectDetailComponent.id`
- `/chat/:threadId` → `ChatPageComponent.threadId`

### Core Layer

#### API Services (`core/api/`)

All root-provided. Standard REST APIs use `HttpClient`; streaming APIs (chat, upload) use native `fetch`.

| Service | Key Methods | Notes |
|---|---|---|
| `ChatApi` | `sendStream(body, onEvent, signal?)`, `sendSync(body)` | Manual SSE parsing, `NgZone.run` for change detection |
| `ProblemsApi` | `query(filters)`, `getBySlug(slug)`, `getSolution(slug)`, `getRandom(filters)` | Omits null/empty params |
| `SubjectsApi` | `query(filters)`, `getById(id)` | Same param serialization pattern |
| `FiltersApi` | `load()` | Returns `FiltersData` |
| `ModelsApi` | `load()` | Returns models + defaultModelId |
| `ThreadsApi` | `list()`, `get(id)`, `delete(id)`, `updateTitle(id, title)` | CRUD for chat threads |
| `QuizApi` | `getStats()`, `getQuestions(ids, limit?, shuffle?)`, `regenerate(subjectId, modelId?)` | |
| `UploadApi` | `upload(request)`, `sendStream(request, onEvent, signal?)` | 90s idle timeout on SSE |

**API conventions:**
- All APIs unwrap `{ data: ... }` backend envelopes via RxJS `map`
- Filter serialization: omit null/empty/empty-array values, serialize arrays as CSV
- SSE parsing: split on `\n`, match `event: ` and `data: ` prefixes, JSON.parse data

#### Models (`core/models/`)

| Model | Key Types |
|---|---|
| `chat.model.ts` | `ChatThread`, `ChatComponentName`, `ChatUiEnvelope`, `ChatMessage`, `ModelInfo`, `ChatMode`, `SseEvent` |
| `filter.model.ts` | `CompanyOption`, `TopicOption`, `FiltersData`, `SelectedFilters` |
| `problem.model.ts` | `ProblemListItem`, `ProblemDetail`, `ProblemSolution` |
| `quiz.model.ts` | `QuizQuestion`, `QuizSubjectInfo`, `QuizStatsGroup` |
| `subject.model.ts` | `SubjectListItem`, `SubjectDetail` |

#### Services

- **`MarkdownService`** — Renders markdown to HTML via `marked` + `marked-highlight` (highlight.js). Mermaid blocks rendered as `<pre class="mermaid">`.
- **`ThemeService`** — `isDark` signal, `toggle()`, `init()`. Persists to `localStorage('theme')`. Applies `body.dark-theme` class.

#### Directives

- **`MermaidDirective` (`[appMermaid]`)** — Standalone attribute directive. Uses `MutationObserver` + `AfterViewChecked` to find `<pre class="mermaid">` blocks after `[innerHTML]` binding. Uses `WeakSet` to prevent double-rendering. One-time global Mermaid init.

### State Layer (NgRx Signal Stores)

All stores are `{ providedIn: 'root' }`, use `signalStore` + `withState` + `withMethods`, and mutate via `patchState`.

| Store | State | Key Behavior |
|---|---|---|
| `ChatStore` | threads, activeThreadId, messages, mode, streaming, currentSteps, error | SSE event processing, optimistic messages, abort support. Default mode: `'free-chat'` |
| `FiltersStore` | available options, selected filters, loading/loaded/error | Persists selections to `localStorage('filters.selected')`. Builds query params. |
| `ModelsStore` | models, defaultModelId, selectedModelId, loaded | Persists selection to `localStorage('selectedModelId')`. Default: `'gpt-oss-120b'` |
| `ProblemsStore` | items, total, page/size, sort/order, status, detailCache | Caches problem details by slug |
| `QuizStore` | stats, selectedSubjects, questions, currentIndex, answers, status | Full quiz lifecycle: idle→loading→active→complete. Local scoring. |
| `SubjectsStore` | items, total, page/size, status, currentDetail | No detail caching (unlike problems) |
| `UploadStore` | files, type, title, agentic, taxonomy, status, progress, result, error | Supports sync + SSE agentic uploads, AbortController cancellation |

### Feature Pages

| Route | Component | Store(s) | Notes |
|---|---|---|---|
| `/problems` | `ProblemsListComponent` | ProblemsStore, FiltersStore | Effect watches `filtersStore.queryParams()` to auto-reload |
| `/problems/:slug` | `ProblemDetailComponent` | ProblemsStore | Route-bound `slug` input, uses `ChatMarkdownViewerComponent` |
| `/subjects` | `SubjectsListComponent` | SubjectsStore | Groups items by `mainSubject` |
| `/subjects/:id` | `SubjectDetailComponent` | SubjectsStore | Uses `ChatMarkdownViewerComponent` |
| `/quiz` | `QuizPageComponent` | QuizStore | Subject selection, question answering, scoring |
| `/chat` | `ChatPageComponent` | ChatStore, ModelsStore | Thread sidebar, mode/model dropdowns, streaming, GenUI |
| `/chat/:threadId` | `ChatPageComponent` | Same | Loads specific thread |
| `/upload` | `UploadPageComponent` | UploadStore, FiltersStore | Drag-drop .md files, manual/agentic modes |

### Styling

**Global styles** (`styles.scss`):
- Base: Roboto font, full-height body
- Dark theme: `.dark-theme` class on `<body>`, extensive CSS custom property overrides for all Material components
- Chat colors: `--chat-user-bg`, `--chat-assistant-bg`, `--chat-error-bg`, `--chat-error-text`
- Markdown: `.markdown-body` class with code block styling, Mermaid transparent backgrounds
- Difficulty colors: `.difficulty-easy` (green), `.difficulty-medium` (orange), `.difficulty-hard` (red)
- Angular Material theme: Azure Blue (loaded in `angular.json`)
- Code highlighting: highlight.js GitHub Dark theme (loaded in `angular.json`)

**Component styles**: Each component uses its own `.scss` file. Chat components use scoped styles.

---

## Generative UI (GenUI) System

This is the core architectural pattern. Every AI agent response is a structured envelope that tells the frontend which Angular component to render.

### The Envelope

```typescript
interface ChatUiEnvelope {
  component: ChatComponentName;      // Which component to render
  message: string;                    // Markdown shown ABOVE the component
  inputs: Record<string, any>;       // Data passed to the component
  followUpSuggestions: string[];     // Clickable next-question chips (0-4)
}
```

### Data Flow

```
User message
    ↓
chat.routes.ts → detectMode() → select agent
    ↓
agent.stream() with structured responseFormat (chatUiResponseSchema)
    ↓
SSE events: meta → step → token → tool → result (envelope) → done
    ↓
ChatStore processes SSE → stores msg.ui as ChatUiEnvelope
    ↓
ChatPageComponent renders:
  1. message text (markdown via MarkdownService)
  2. <app-chat-component-host [ui]="msg.ui" />
  3. follow-up suggestion chips
    ↓
ChatComponentHostComponent:
  - Looks up component in CHAT_COMPONENT_REGISTRY
  - Filters inputs to only declared inputKeys
  - Renders via NgComponentOutlet
```

### Component Registry

The registry (`component-registry.ts`) maps component names to Angular component types and their allowed input keys:

| Component Name | Angular Component | Input Keys |
|---|---|---|
| `text` | `ChatTextComponent` | _(none — message rendered by parent)_ |
| `chat-markdown-viewer` | `ChatMarkdownViewerComponent` | `content`, `title` |
| `chat-quiz-cards` | `ChatQuizCardsComponent` | `questions`, `studyTips`, `subject` |
| `chat-problem-list` | `ChatProblemListComponent` | `problems`, `interpretedFilters` |
| `chat-hint-card` | `ChatHintCardComponent` | `hints`, `problemTitle` |
| `chat-interview-question` | `ChatInterviewQuestionComponent` | `stage`, `questionText`, `currentProblemSlug`, `hintsGiven`, `sessionProgress`, `nextAction` |
| `chat-evaluation-scorecard` | `ChatEvaluationScorecardComponent` | `evaluation` |
| `chat-enrichment-report` | `ChatEnrichmentReportComponent` | `enrichment` |

### Envelope Validation (3-tier)

In `chat.routes.ts → toEnvelope()`:

1. `chatUiResponseSchema.safeParse(structuredResponse)` — direct structured output
2. `extractJson(rawText)` → `safeParse` — extract JSON from markdown fences
3. Fallback: `{ component: 'text', message: rawText, inputs: {}, followUpSuggestions: [] }`

Then `validateProblemSlugs()` drops any problem slugs not found in the DB.

### SSE Event Protocol

| Event | Payload | Purpose |
|---|---|---|
| `meta` | `{ threadId, modelId, agent }` | Thread identification, sent first |
| `step` | `{ index, nodes }` | Agent graph step progress |
| `token` | `{ delta }` | Full streaming text (replaces, not appends) |
| `tool` | `{ name, phase, summary }` | Tool call start/end |
| `result` | `{ threadId, ui: ChatUiEnvelope }` | Final validated envelope |
| `done` | `{}` | Stream complete |
| `error` | `{ message }` | Error message |

---

## Agent System

### Model Factory (`agents/model-factory.ts`)

**`createChatModel(modelId?, temperature?, timeout?)`** — Returns `{ def: ModelDef, model: BaseChatModel }`.

Provider-specific behavior:
- **OpenAI-compatible** (`ChatOpenAI`): API key from env or OAuth fallback, configurable base URL, request timeout
- **Anthropic** (`ChatAnthropic`): Direct API key, optional base URL, no timeout param
- **Google** (`ChatGoogleGenerativeAI`): Direct API key, no timeout param

**`createResponseFormat(def, schema)`** — Provider-aware structured output:
- OpenAI-compatible (`supportsStructuredOutput: true`): passes Zod schema directly
- Anthropic/Google: wraps schema in `toolStrategy()` (synthetic tool call)

**`extractJson(text)`** — Extracts JSON from markdown code fences, returns parsed object or `null`.

### Shared Tools (`agents/shared/tools/`)

| Tool | Name | Input | Notes |
|---|---|---|---|
| `list-filters.tool.ts` | `list_filters` | `kind` (companies/topics/difficulties), optional `q` | Must be called before `search_problems` to resolve slugs |
| `search-problems.tool.ts` | `search_problems` | query, companies, difficulties, topics, patterns, seniority, matchMode, minInterviewValue, limit (max 25) | Returns compact cards (no solution body) |
| `get-problem.tool.ts` | `get_problem` | `slug`, optional `include` sections | Default: description + examples. Solution excluded unless explicitly requested. |
| `get-problem-hint.tool.ts` | `get_problem_hint` | `slug`, `hintLevel` (1-3) | Level 1: observations. Level 2: pattern name. Level 3: step outline. Never full code. |
| `search-subjects.tool.ts` | `search_subjects` | `query`, optional `topics`, `limit` (max 25) | Returns subject metadata |
| `get-subject.tool.ts` | `get_subject` | `id`, optional `section`, optional `maxChars` (default 12000) | Section extraction with heading matching. Truncates at `##` boundaries. |

### Agent Definitions

Each agent directory contains:
- `*.agent.ts` — Factory function returning `{ agent, def }`
- `*.prompt.ts` — System prompt (imports `UI_RESPONSE_PROMPT`)
- `*.schema.ts` (optional, legacy) — Older specialized schemas (currently unused; all agents use `chatUiResponseSchema`)

| Agent | Mode | Tools | Components Used |
|---|---|---|---|
| **Free Chat** | `free-chat` | All 6 shared tools | `text`, `chat-hint-card`, `chat-markdown-viewer`, `chat-problem-list` |
| **Problem Finder** | `find-problems` (default for `auto`) | All 6 shared tools | `chat-problem-list`, `chat-markdown-viewer`, `chat-hint-card`, `text` |
| **Mock Interview** | `mock-interview` | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint` | `chat-interview-question`, `chat-evaluation-scorecard`, `chat-hint-card`, `text` |
| **Subject Quiz** | `subject-quiz` | `search_subjects`, `get_subject` | `chat-quiz-cards`, `chat-markdown-viewer`, `text` |
| **Content Enricher** | `content-enricher` | 5 enricher-specific tools | `chat-enrichment-report`, `text` |
| **Content Uploader** | _(internal, not user-selectable)_ | `classify_content`, `split_material`, `save_uploaded_files` | _(SSE progress, not GenUI)_ |

### Free Chat Agent

Tutoring/study partner mode. The default mode. Key prompt behaviors:
- Socratic method: ask guiding questions before giving answers
- Progressive hints before solutions
- Step-by-step breakdowns with WHY explanations
- Pattern recognition guidance
- Never volunteer full solutions unless explicitly asked

### Mock Interview Agent

Stateful interview simulation with stages:
1. `plan` → Pick 3-5 problems
2. `ask_basic` → Present problem
3. `probe` → Evaluate answer
4. `expand` → Follow-up/constraint changes
5. `hint` → Progressive hints (on request or after 2 stalls)
6. `feedback` → 1-5 scoring on 4 axes
7. `next`/`end` → Advance or finish

Interview sessions are persisted in `interview_sessions` table.

### Content Enricher

Batch tool-driven agent for enriching problem markdown files. Has its own 5 tools:
- `scan_problems` — Find insufficient files (batch scanning with offset)
- `read_problem_file` — Read file content
- `enrich_problem_file` — Write enriched content
- `update_problem_metadata` — Update `problems.json` classification
- `read_audit_report` — Parse structured audit findings

Has a standalone CLI loop (`run-enricher-loop.ts`) for batch processing with retry logic.

---

## Indexer Pipeline

### Stages

| Stage | Command | Input | Output |
|---|---|---|---|
| **Parse** | `npm run index:parse` | Markdown files + `problems_data.json` | `metadata/problems.json`, `metadata/subjects.json`, `metadata/parse-report.json` |
| **Classify** | `npm run index:classify` | Parsed JSON | Enriched JSON with LLM-assigned topics, patterns, seniority, etc. Uses `classification.jsonl` for resumability. |
| **Build** | `npm run index:build` | Enriched JSON | `interview.db` (SQLite + FTS5), `metadata/filters.json` |
| **Questions** | `npm run index:questions` | Subjects in DB | `subject_questions` table entries (LLM-generated quiz questions) |

### Parse Details

- **Problems** (`parse-problem-md.ts`): Parses title, ID, difficulty, acceptance, URL, companies, and markdown sections from problem files. Merges with external metadata by LeetCode ID or title. Deduplicates slugs.
- **Theory** (`parse-theory-md.ts`): Scans `Data/Material/` directories. Supports nested and flat layouts. Derives titles from H1/H2 headings or filenames.

### Classification

- Uses structured LLM output with Zod schemas
- Batches of 25, 4 concurrent, 3 retries with exponential backoff
- Writes JSONL incrementally for resumability
- `--force` flag re-classifies already-processed items

### Build

- Drops and recreates content tables (preserves chat/session tables)
- Creates FTS5 virtual tables
- Inserts taxonomy entries, problems, companies, subjects, relations
- Preserves existing quiz questions (unless table is empty, then imports from JSON)
- Generates `filters.json`
- Runs VACUUM

### Taxonomy (`indexer/taxonomy.ts`)

Canonical topic categories:
- **Algorithmic**: arrays, strings, linked-lists, trees, graphs, dynamic-programming, greedy, binary-search, sorting, stack-queue, hash-tables, heap, math-logic, bit-manipulation, recursion-backtracking, sliding-window, two-pointers, trie, union-find, segment-tree
- **Design**: system-design, oop-design, data-structures-design
- **Theory**: ai-llm, distributed-systems, frontend-architecture, infrastructure-devops, security, engineering-leadership

---

## Database Schema

Key tables (all `CREATE TABLE IF NOT EXISTS` in `schema.sql`):

| Table | Purpose |
|---|---|
| `problems` | Problem metadata + markdown sections |
| `topics` | Topic taxonomy entries |
| `companies` | Company names |
| `problem_topics` | M:N problem↔topic |
| `problem_companies` | M:N problem↔company (with frequency) |
| `problem_patterns` | M:N problem↔pattern |
| `subjects` | Theory/material metadata + markdown body |
| `subject_topics` | M:N subject↔topic |
| `subject_questions` | Quiz questions (options stored as JSON) |
| `chat_threads` | Chat thread metadata (mode, model, title) |
| `chat_messages` | Chat messages (with `payload_json` for GenUI envelopes) |
| `interview_sessions` | Mock interview state (stage, plan, progress) |
| `app_meta` | Schema version tracking |
| `problems_fts` | FTS5 virtual table (created by indexer, not schema.sql) |
| `subjects_fts` | FTS5 virtual table (created by indexer, not schema.sql) |

---

## Conventions and Patterns

### TypeScript/Code Style

- **Backend**: ESM (`"type": "module"`), `.js` extensions in imports, executed directly via `tsx` (no compiled build)
- **Frontend**: Angular standalone components, SCSS, strict TypeScript + strict Angular templates
- **Validation**: Zod schemas for all API boundaries (request bodies, query params, agent responses)
- **State management**: NgRx Signal Stores with `patchState`, root-provided singletons
- **Components**: All standalone, lazy-loaded at route level
- **Imports**: Use `.js` extensions in backend (ESM convention); Angular uses standard TS imports

### Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Database columns | `snake_case` | `primary_topic`, `created_at` |
| TypeScript properties | `camelCase` | `primaryTopic`, `createdAt` |
| Problem identifiers | Slugs (kebab-case) | `two-sum`, `longest-palindromic-substring` |
| Subject identifiers | Derived IDs | `ai-llm--agent-memory` |
| Component selectors | `app-` prefix | `app-chat-page`, `app-chat-component-host` |
| Chat components | kebab-case matching registry | `chat-problem-list`, `chat-hint-card` |
| Agent directories | kebab-case | `free-chat/`, `mock-interview/` |
| Tool names | `snake_case` | `search_problems`, `get_problem_hint` |
| CSS theme vars | `--chat-*`, `--mat-*` | `--chat-user-bg`, `--mat-option-label-text-color` |

### Error Handling

- Backend services throw `NotFoundError`/`ValidationError` (extend `AppError`)
- Express error handler in `index.ts` converts to JSON `{ error: { code, message, details? } }`
- SSE errors sent as `error` event before stream close
- Frontend stores capture errors in `error` signal, displayed as banners
- Agent responses: 3-tier envelope validation guarantees a valid response even on LLM failures

### Dark Theme

- Toggle via `ThemeService` → `body.classList.toggle('dark-theme', dark)`
- All dark theme styles in `styles.scss` under `.dark-theme { ... }`
- Uses CSS custom properties for Material component theming
- Chat-specific colors: `--chat-user-bg: #1a3a5c`, `--chat-assistant-bg: #2c2c2c`
- `!important` overrides required for several Material internal styles
- Mat-option selected state uses `z-index` stacking to keep text above `::before` state layer

### Persistence

- `localStorage('theme')` — light/dark preference
- `localStorage('filters.selected')` — problem filter selections
- `localStorage('selectedModelId')` — chosen LLM model
- SQLite — all content, chat history, quiz questions, interview sessions

---

## Adding New Features

### Adding a New Chat Component

1. **Backend schema** — Add component name to `CHAT_COMPONENTS` in `agents/shared/ui-response.schema.ts`. Add its input fields to `chatInputsSchema`.
2. **Backend prompt** — Add component description to `<component-logic>` block in `agents/shared/ui-response.prompt.ts`.
3. **Frontend component** — Create standalone component under `features/chat/components/`. Declare signal `input()` for each data field.
4. **Frontend registry** — Add entry to `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` with component class and `inputKeys`.
5. **Agent prompt(s)** — Update relevant agent prompt(s) to describe when to use the new component.

### Adding a New Chat Mode/Agent

1. **Backend agent** — Create `agents/<mode-name>/` with:
   - `<mode>.prompt.ts` — System prompt importing `UI_RESPONSE_PROMPT`
   - `<mode>.agent.ts` — Factory function using `createChatModel`, `createResponseFormat`, `createAgent`
2. **Backend API types** — Add mode string to `chatBodySchema` mode enum in `types/api.types.ts`
3. **Backend route** — In `chat.routes.ts`:
   - Import the agent factory
   - Add `case` to the switch statement
   - Optionally add regex to `detectMode()` for auto-detection
4. **Frontend model** — Add mode string to `ChatMode` type in `core/models/chat.model.ts`
5. **Frontend dropdown** — Add `<mat-option>` in `chat-page.component.html`
6. **Default** — If it should be the default, update initial `mode` in `chat.store.ts`

### Adding a New Shared Tool

1. Create tool in `agents/shared/tools/<name>.tool.ts` using LangChain `tool()` with Zod schema
2. Import and add to the tools array in each agent that needs it
3. Update agent prompts to describe the tool's purpose and usage rules

### Adding a New REST Route

1. Create `routes/<name>.routes.ts` with Express Router
2. Define request validation schemas in `types/api.types.ts`
3. Create/update service in `services/`
4. Register router in `index.ts` under `/api`
5. Create frontend API service in `core/api/`
6. Create/update signal store in `state/`

---

## Common Pitfalls

### Backend

- **Import extensions**: Backend uses ESM — all local imports must use `.js` extension (e.g., `import { foo } from './bar.js'`), even though source files are `.ts`. This is the Node ESM convention with tsx.
- **`createAgent` import**: Import from `'langchain'`, not from `'@langchain/langgraph'` or other sub-packages.
- **Model factory timeout**: Only OpenAI-compatible models receive the timeout parameter. Anthropic and Google models do not.
- **FTS tables**: Created by `indexer/build-db.ts`, not by `schema.sql`. If the indexer hasn't run, FTS queries will fail. Upload service handles this gracefully.
- **Schema migration**: `db/connection.ts` has a destructive chat-history migration — clears all chat data when upgrading schema version. Check `migrateChatHistory()` before changing schema.
- **`CONTENT_ROOT`**: Must point to the Interview repo root (parent of `app/`). Docker overrides it to `/content`.
- **Agent recursion limits**: Default 50 for most agents, 800 for content-enricher. Set in `chat.routes.ts`.
- **Debug dumps**: When `DEBUG_RUNS=true`, agent input/output is saved to `data/runs/`. Remember to disable in production.

### Frontend

- **Route input binding**: Route params bind directly to component signal inputs via `withComponentInputBinding()`. No need for `ActivatedRoute.params` subscription.
- **SSE token events**: The backend sends FULL content in each `token` event (not deltas). The store replaces, not appends: `msgs[lastIdx] = { ...msgs[lastIdx], content: data.delta }`.
- **Component input filtering**: `ChatComponentHostComponent` filters inputs to only keys declared in `inputKeys` to prevent Angular `NG0303` errors.
- **Dark theme scope**: The `.dark-theme` class is on `<body>`. Material overlay panels (dropdowns, menus) render in `<cdk-overlay-container>` which is a child of body, so dark theme styles apply. However, some Material internal styles need `!important` overrides.
- **Markdown rendering**: Always use `MarkdownService.render()` and bind with `[innerHTML]`. Add `appMermaid` directive for Mermaid support. Use `class="markdown-body"` for proper styling.
- **Signal store mutations**: Always use `patchState()`. Never mutate signal values directly. Clone arrays/objects before modifying (e.g., `const msgs = [...store.messages()]`).
- **NgRx Signal Store injection**: Stores are injected with `inject(StoreName)` — not constructor injection. All stores are root-provided singletons.

### Synchronization Points (Backend ↔ Frontend)

These must stay in sync — changes to one require changes to the other:

| What | Backend Location | Frontend Location |
|---|---|---|
| Component names | `CHAT_COMPONENTS` in `ui-response.schema.ts` | `ChatComponentName` in `chat.model.ts` + `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` |
| Chat modes | `chatBodySchema` in `api.types.ts` + `detectMode()` + switch in `chat.routes.ts` | `ChatMode` in `chat.model.ts` + dropdown in `chat-page.component.html` |
| SSE event names | `sendSseEvent` calls in `chat.routes.ts` | switch cases in `ChatStore.send()` |
| Envelope shape | `chatUiResponseSchema` in `ui-response.schema.ts` | `ChatUiEnvelope` in `chat.model.ts` |
| API request bodies | Zod schemas in `api.types.ts` | API service method params |
