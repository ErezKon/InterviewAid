# AGENTS.md — Interview Prep Platform

> Comprehensive guide for AI agents working on this codebase (the `app/` folder of the Interview repo).
> It covers the mandatory working rules, architecture, conventions, data flow, key files and pitfalls.
> Human-facing setup and usage docs live in [`README.md`](./README.md).

---

## Mandatory Rules for AI Agents

These rules apply to every task in this folder and take precedence over everything else in this file.

1. **Read the docs before you start.** Before working on any task, read [`README.md`](./README.md) (same folder) and this `AGENTS.md` in full. This file is long and is often truncated when it is auto-injected into your context — if you only see part of it, open the full file from disk.
2. **Keep `README.md` and `AGENTS.md` up to date.** After any change that affects what these files describe — features, file/folder layout, npm scripts and commands, env vars, API endpoints and payloads, SSE events, agents/tools/prompts, GenUI components, DB schema, taxonomy, conventions, sync points or pitfalls — update the affected sections of both files as part of the same task. Only document what you have verified in the code, and fix stale information whenever you come across it.
   - `README.md` is for humans: setup, running, Docker, env vars, API, scripts, testing.
   - `AGENTS.md` is for AI agents: architecture deep dive, conventions, sync points, pitfalls.
3. **Never commit, never push.** Do not run `git commit`, `git push`, or any other command that creates commits or updates a remote. Leave all changes uncommitted in the working tree — the user reviews, commits and pushes them manually.
4. **Never use tools or shell commands that require permission.** Only use tools that run without an approval prompt, and prefer the built-in file tools (read, search/grep, glob, edit) over shell equivalents. Do not run anything that asks for approval — e.g. any `git` command (including read-only ones such as `git status` or `git log`), package installs, network calls, deleting files, or writing outside the workspace. If a step such as a build, type-check or test run would require permission, skip it and list the exact commands in your final message so the user can run them.

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
- [Testing](#testing)
- [Conventions and Patterns](#conventions-and-patterns)
- [Adding New Features](#adding-new-features)
- [Common Pitfalls](#common-pitfalls)

---

## Quick Reference

### Build & Verify

> Subject to rule 4: run these only if they execute without a permission prompt; otherwise list them for the user.

```bash
# Backend type-check (from app/backend/) — there is no compiled build
npx tsc --noEmit --skipLibCheck

# Backend tests (from app/backend/) — node:test via tsx, 7 files / 100 tests, no LLM or network calls
npm test

# Frontend production build (from app/frontend/)
npx ng build

# Dev servers (from app/)
npm run dev:backend   # Terminal 1 — http://localhost:3100 (tsx watch)
npm run dev:frontend  # Terminal 2 — http://localhost:4200 (ng serve --open, proxies /api → :3100)
```

Frontend unit tests (`cd frontend && npm test`, Karma + Chrome) are not a reliable check right now: `src/app/app.component.spec.ts` is the untouched Angular CLI scaffold (it asserts a `title` property and an `<h1>` that no longer exist), so the Karma build fails until that spec is updated. Use `npx ng build` to verify frontend changes.

### Key Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19.2 (standalone components, signals, built-in control flow), Angular Material 19, NgRx Signals 19 (`signalStore`), SCSS, marked 15 + marked-highlight + highlight.js 11, Mermaid 11 |
| Backend | Node.js 22, Express 5, TypeScript 5.9 executed directly by `tsx` (no build step), SQLite via better-sqlite3 9 (WAL + FTS5), Zod 4, Multer 2, dotenv |
| AI/LLM | LangChain 1.x (`createAgent`, `toolStrategy` from `langchain`) on LangGraph 1.x; providers via `@langchain/openai`, `@langchain/anthropic`, `@langchain/google-genai` |
| Chat protocol | Server-Sent Events (SSE) with structured GenUI envelopes |
| Styling | Angular Material Azure Blue prebuilt theme + custom dark theme (`body.dark-theme`, CSS variables) |
| Tests | Backend: Node built-in test runner (`node:test`) via `tsx --test`; Frontend: Karma + Jasmine |
| Deployment | Docker Compose: `node:22-slim` backend + `nginx:alpine` frontend |

### Important Files At A Glance

| Purpose | File |
|---|---|
| Express bootstrap | `backend/src/index.ts` |
| Chat SSE route + mode detection (`detectMode()`) | `backend/src/routes/chat.routes.ts` |
| Upload route / upload logic | `backend/src/routes/upload.routes.ts`, `backend/src/services/upload.service.ts` |
| Agent model factory | `backend/src/agents/model-factory.ts` |
| Shared UI schema (THE GenUI contract) | `backend/src/agents/shared/ui-response.schema.ts` |
| Shared UI prompt | `backend/src/agents/shared/ui-response.prompt.ts` |
| Request validation schemas | `backend/src/types/api.types.ts` |
| Environment config | `backend/src/config/env.ts` (template: `backend/.env.example`) |
| Model registry | `backend/src/config/models.ts` |
| Content / data paths | `backend/src/config/paths.ts` |
| DB connection + schema | `backend/src/db/connection.ts` + `backend/src/db/schema.sql` |
| Topic taxonomy | `backend/src/indexer/taxonomy.ts` |
| Indexer CLI | `backend/src/indexer/run-index.ts` |
| Content-enricher CLI | `backend/src/agents/content-enricher/run-enricher-loop.ts` |
| UI envelope types (frontend) | `frontend/src/app/core/models/chat.model.ts` |
| Component registry (frontend) | `frontend/src/app/features/chat/component-registry.ts` |
| Chat store | `frontend/src/app/state/chat.store.ts` |
| Chat page | `frontend/src/app/features/chat/chat-page/` |
| Global styles + dark theme | `frontend/src/styles.scss` |
| Docker | `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`, `frontend/nginx.conf` |

---

## Project Overview

A two-package project with a **Node/TypeScript backend** and an **Angular 19 frontend** for interview preparation. The indexer parses the LeetCode problem markdown files (3,415 at the last parse) and the theory/study-material markdown of the surrounding Interview repo, classifies them with an LLM, and loads them into SQLite. The app then provides:

- Problem browsing/search with metadata filtering (company, topic, difficulty, seniority, patterns, interview value, full-text)
- Subject/theory browsing with markdown rendering and Mermaid diagrams
- Streaming AI chat with five GenUI agent modes (free chat, find problems, mock interview, subject quiz, content enrichment) plus an `auto` router
- Generative UI: the LLM chooses which Angular component renders each response
- A quiz page backed by LLM-pre-generated questions per subject
- Content uploads (`.md` study material or problems), manual or LLM-agentic (classification + splitting)
- A batch CLI that enriches thin problem files and applies audit-report fixes

The content itself lives **outside** `app/`, under `CONTENT_ROOT` (the Interview repo root). The backend reads it, and uploads / the content enricher **write** into it.

### Content Repository Layout (outside `app/`)

```
<CONTENT_ROOT>/                              # Interview repo root (parent of app/)
├── Data/Problems/LeetCode/*.md              # One file per problem: "# <id>. <title>", **Difficulty:**, **Acceptance:**,
│   │                                        #   **LeetCode:** <url>, **Companies:** a, b, then "## <Section>" blocks
│   ├── INDEX.md                             # Mapping file — skipped by the enricher
│   └── audit_report.md                      # Default audit report location for the enricher (when present)
├── Data/Material/<Main>/[<Sub>/]*.md        # Theory material (nested or flat layout)
└── LeetCode/
    ├── problems_data.json                   # External metadata merged at parse time (difficulty, acceptance, URL, company frequencies)
    └── Raw By Company/                      # Referenced by paths.ts (RAW_BY_COMPANY_DIR) but not used by any code
```

---

## Repository Layout

```
app/
├── package.json                          # Root helper scripts only (npm run … --prefix backend|frontend); NO workspaces, no deps
├── package-lock.json                     # Empty root lockfile
├── docker-compose.yml                    # Two-service deployment (backend + frontend)
├── .gitignore                            # node_modules/ only
├── README.md                             # Human-facing setup/usage docs
├── AGENTS.md                             # This file
│
├── backend/
│   ├── package.json                      # type: "module", tsx runner, no compiled build
│   ├── tsconfig.json                     # ES2022, ESNext modules, bundler resolution, strict, skipLibCheck
│   ├── Dockerfile                        # Multi-stage: builder (native better-sqlite3) + runtime (npx tsx src/index.ts)
│   ├── .dockerignore                     # node_modules, dist, data/*.db, .env
│   ├── .gitignore                        # node_modules/
│   ├── .env.example                      # Env var template (copy to .env)
│   ├── data/                             # Runtime data — bind-mounted in Docker, NOT git-ignored
│   │   ├── interview.db (+ -wal, -shm)   # SQLite: indexed content + chat/session/quiz tables
│   │   ├── runs/                         # DEBUG_RUNS dumps (created on demand)
│   │   └── metadata/
│   │       ├── problems.json             # Parsed (+ classified) problems — input of the build stage
│   │       ├── subjects.json             # Parsed (+ classified) theory subjects
│   │       ├── classification.jsonl      # Problem LLM classifications (resumability cache)
│   │       ├── subjects.classification.jsonl  # Subject LLM classifications
│   │       ├── classification.errors.json     # Permanently failed batches (only written on failures)
│   │       ├── parse-report.json         # Parse statistics + failures
│   │       ├── filters.json              # Written by build (informational — the API reads filters from the DB)
│   │       └── subject_questions.json    # Optional; imported by build only when the subject_questions table is empty
│   └── src/
│       ├── index.ts                      # Express bootstrap, request-ID middleware, routers, 404 + error handler
│       ├── config/
│       │   ├── env.ts                    # Zod-validated environment (exits the process on invalid env)
│       │   ├── models.ts                 # LLM model registry, provider detection, ModelDef interface
│       │   └── paths.ts                  # Content paths (CONTENT_ROOT-relative) + DATA_DIR/METADATA_DIR (source-relative)
│       ├── db/
│       │   ├── connection.ts             # Singleton better-sqlite3, WAL + foreign_keys pragmas, initSchema(), chat migration
│       │   ├── schema.sql                # CREATE TABLE / INDEX IF NOT EXISTS (no FTS tables)
│       │   └── queries.ts                # Health stats (problem count, subject count, indexed-at)
│       ├── routes/
│       │   ├── chat.routes.ts            # POST /chat — mode detection, agent selection, SSE/JSON, envelope validation
│       │   ├── upload.routes.ts          # POST /upload — Multer (memory, .md, 5 MB, 20 files); JSON or SSE (agentic)
│       │   ├── problems.routes.ts        # GET /problems, /problems/random, /problems/:slug, /problems/:slug/solution
│       │   ├── subjects.routes.ts        # GET /subjects, /subjects/:id
│       │   ├── filters.routes.ts         # GET /filters (companies, difficulties, topics, seniority; 60 s in-memory cache)
│       │   ├── companies.routes.ts       # GET /companies (typeahead: q, limit)
│       │   ├── models.routes.ts          # GET /models (registry + defaultModelId)
│       │   ├── sessions.routes.ts        # GET/DELETE /threads[/:id], POST /threads/:id/title, GET /interview-sessions/:threadId
│       │   ├── quiz.routes.ts            # GET /quiz/stats, GET /quiz, POST /quiz/regenerate/:subjectId
│       │   ├── health.routes.ts          # GET /health
│       │   ├── integration.test.ts       # REST route tests (temp DB)
│       │   └── upload.test.ts            # Upload tests (temp CONTENT_ROOT + temp DB)
│       ├── services/
│       │   ├── problem.service.ts        # Search, filter, paginate, detail, solution, random (+ problem.service.test.ts)
│       │   ├── subject.service.ts        # Search, filter, paginate, detail
│       │   ├── session.service.ts        # Chat threads, messages, interview sessions (SQLite CRUD)
│       │   ├── quiz.service.ts           # Quiz stats, questions, regeneration
│       │   ├── quiz-generator.service.ts # LLM question generation from subject markdown
│       │   ├── upload.service.ts         # Manual + agentic uploads, disk writes, metadata JSON + DB inserts
│       │   └── sse.service.ts            # initSse, sendSseEvent, sendSseDone, sendSseError, startHeartbeat
│       ├── agents/
│       │   ├── model-factory.ts          # createChatModel, createResponseFormat, extractJson (+ model-factory.test.ts)
│       │   ├── shared/
│       │   │   ├── ui-response.schema.ts # chatUiResponseSchema (Zod) — THE contract
│       │   │   ├── ui-response.prompt.ts # UI_RESPONSE_PROMPT — component-logic instructions
│       │   │   └── tools/                # 6 shared tools (+ tools.test.ts) — see Agent System
│       │   ├── free-chat/                # Tutoring/study-partner agent
│       │   ├── problem-finder/           # Problem search + recommendations agent (+ unused legacy *.schema.ts)
│       │   ├── mock-interview/           # Stateful interview simulation agent (+ unused legacy *.schema.ts)
│       │   ├── subject-quiz/             # Quiz generation from theory (+ unused legacy *.schema.ts)
│       │   ├── content-enricher/         # Agent, prompt, 5 tools, audit-report-parser.ts, run-enricher-loop.ts (CLI)
│       │   │   └── tools/agents.code-workspace  # Stray VS Code workspace file — not code
│       │   └── content-uploader/         # Agent, prompt, 3 tools, markdown-parser.ts, upload-context.ts
│       ├── indexer/
│       │   ├── run-index.ts              # CLI entry: --stage=parse|classify|build|questions|all, --force, --model=<id>
│       │   ├── parse-problem-md.ts       # Problem markdown parser (+ parse-problem-md.test.ts)
│       │   ├── parse-theory-md.ts        # Theory material scanner (+ parse-theory-md.test.ts)
│       │   ├── classify-with-llm.ts      # Batched structured-output classification (problems + subjects)
│       │   ├── build-db.ts               # SQLite + FTS5 build, filters.json
│       │   ├── generate-questions.ts     # Quiz question generation stage
│       │   └── taxonomy.ts               # TAXONOMY (31 topic ids), DIFFICULTIES, SENIORITY
│       ├── types/
│       │   ├── api.types.ts              # Zod schemas for request bodies/query params + response interfaces
│       │   ├── chat.types.ts             # ChatThread, ChatMessage, InterviewSession interfaces
│       │   └── problem.types.ts          # Problem, Subject, ParseReport (+ deprecated aliases)
│       └── utils/
│           ├── logger.ts                 # createLogger(tag) — colored timestamped logging
│           ├── errors.ts                 # AppError, NotFoundError, ValidationError
│           ├── oauth.util.ts             # OAuth2 client-credentials token cache
│           └── log-colors.util.ts        # ANSI color constants
│
└── frontend/
    ├── package.json                      # Angular 19, Material, NgRx Signals, Mermaid, marked (+ unused ngx-markdown@22)
    ├── angular.json                      # Application builder, styles, budgets, dev-server proxy, Karma test target
    ├── tsconfig.json                     # Strict TS + strict Angular templates (tsconfig.app.json / tsconfig.spec.json extend it)
    ├── Dockerfile                        # node:22-slim build (npm i --legacy-peer-deps, ng build) → nginx:alpine
    ├── nginx.conf                        # SPA fallback, /api proxy to backend, SSE support, gzip, static caching
    ├── README.md                         # Untouched Angular CLI boilerplate
    ├── public/favicon.ico
    └── src/
        ├── main.ts                       # bootstrapApplication(AppComponent, appConfig)
        ├── index.html                    # Document shell, Google Fonts (Roboto), Material Icons
        ├── styles.scss                   # Global styles + dark theme CSS variables
        ├── proxy.conf.json               # Dev proxy: /api → http://localhost:3100
        └── app/
            ├── app.config.ts             # Providers: zone, router (withComponentInputBinding), HTTP (fetch), animations
            ├── app.routes.ts             # Lazy-loaded routes for all feature pages
            ├── app.component.*           # Shell: toolbar, nav links, theme toggle, router-outlet (spec is stale scaffold)
            ├── core/
            │   ├── api/                  # chat, problems, subjects, filters, models, threads, quiz, upload API services
            │   ├── models/               # chat, filter, problem, quiz, subject interfaces
            │   ├── services/
            │   │   ├── markdown.service.ts  # marked + highlight.js rendering, mermaid blocks
            │   │   └── theme.service.ts     # Dark/light toggle, localStorage persistence
            │   └── directives/
            │       └── mermaid.directive.ts # [appMermaid] — renders Mermaid blocks after innerHTML
            ├── state/                    # NgRx Signal Stores (chat, filters, models, problems, quiz, subjects, upload)
            └── features/
                ├── chat/                 # chat-page, chat-component-host, component-registry.ts, chat-markdown-viewer,
                │                         #   chat-quiz-cards, components/ (text, problem-list, hint-card,
                │                         #   interview-question, evaluation-scorecard, enrichment-report)
                ├── problems/             # problems-list + problem-detail
                ├── subjects/             # subjects-list + subject-detail
                ├── quiz/                 # quiz-page
                └── upload/               # upload-page (manual + agentic)
```

---

## Development Commands

### Install

There are **no npm workspaces** — the root `package.json` only holds helper scripts and has no dependencies, so a root `npm install` installs nothing. Install each package separately (from `app/`):

```bash
npm install --prefix backend
npm install --prefix frontend --legacy-peer-deps   # same flag as frontend/Dockerfile (ngx-markdown@22 declares Angular 22 peers)
```

### Root scripts (`app/`)

| Command | Description |
|---|---|
| `npm run dev:backend` | Backend `dev`: `tsx watch src/index.ts` on `:3100` (hot reload) |
| `npm run dev:frontend` | Frontend `dev`: `ng serve --open` on `:4200` (proxies `/api` to `:3100`) |
| `npm run index:parse` | Parse markdown files into `problems.json` + `subjects.json` + `parse-report.json` |
| `npm run index:classify` | LLM classification (resumable, uses JSONL caches) |
| `npm run index:build` | Build SQLite DB + FTS5 indexes + `filters.json` |
| `npm run index:all` | Run parse → classify → build sequentially |
| `npm run test:backend` | Run backend tests (`tsx --test`) |

> Root scripts are thin `npm run <script> --prefix backend|frontend` wrappers, so extra CLI flags are **not** forwarded: `npm run index:classify -- --force` run from `app/` never reaches the indexer. Call the backend script directly instead: `npm run index:classify --prefix backend -- --force` (or `cd backend && npm run index:classify -- --force`).

### Backend scripts (`app/backend/`)

| Command | Description |
|---|---|
| `npm run dev` | `tsx watch src/index.ts` |
| `npm start` | `tsx src/index.ts` (no watch) |
| `npm run index:parse` / `index:classify` / `index:build` / `index:all` | Indexer stages (see [Indexer Pipeline](#indexer-pipeline)); `index:classify` accepts `-- --force` |
| `npm run index:questions` | Generate quiz questions for subjects (flags: `--force`, `--model=<id>`) — not exposed at the root |
| `npm run enrich` | Content-enricher batch loop (flags: `--model=`, `--batch=`, `--max-batches=`) — not exposed at the root |
| `npm run enrich:audit` | Enricher audit-fix loop (adds `--audit`; flags: `--audit-file=`, `--fix=`) — not exposed at the root |
| `npm test` | `tsx --test $(find src -name '*.test.ts')` |
| `npx tsc --noEmit --skipLibCheck` | Type-check only |

`dev`, `start`, `index:classify`, `index:all` (classify step only), `index:questions`, `enrich` and `enrich:audit` prefix `NODE_TLS_REJECT_UNAUTHORIZED=0` (corporate TLS-interception workaround).

### Frontend scripts (`app/frontend/`)

| Command | Description |
|---|---|
| `npm run dev` | `ng serve --open` |
| `npm start` | `ng serve` |
| `npm run build` / `npx ng build` | Production build (default configuration) → `dist/frontend/browser` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Karma + Jasmine (needs Chrome; see [Testing](#testing)) |

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
Browser :4200 ──> Angular CLI dev server (ng serve)
                    └── /api/* proxy (src/proxy.conf.json) ──> Express backend :3100
                                                                 ├── SQLite backend/data/interview.db (better-sqlite3)
                                                                 ├── Content files under CONTENT_ROOT (read + write)
                                                                 └── LLM providers (OpenAI-compatible / Anthropic / Google)
```

### Production Topology (Docker)

```
Browser :4200 ──> nginx (frontend container, port 80)
                    ├── Static Angular build (SPA fallback to index.html)
                    └── /api/* ──> backend:3100 (SSE-friendly: no buffering, 300 s read timeout)
                                     ├── Content at /content (bind mount of the repo root ../, read-write)
                                     └── SQLite + metadata at /app/data (bind mount of ./backend/data)
```

The backend container has a healthcheck (`GET /api/health` every 30 s); the frontend container starts only once the backend is healthy.

### Data Flow

```
Markdown content (CONTENT_ROOT)
    │
    ├── parse (parse-problem-md.ts, parse-theory-md.ts)
    │       → metadata/problems.json, metadata/subjects.json, metadata/parse-report.json
    │
    ├── classify (classify-with-llm.ts)
    │       → classification.jsonl + subjects.classification.jsonl, folded back into the JSON files
    │
    ├── build (build-db.ts)
    │       → interview.db (SQLite + FTS5) + metadata/filters.json
    │
    └── questions (generate-questions.ts, optional)
            → subject_questions table
                │
    ┌───────────┼────────────────┬──────────────────┐
    ▼           ▼                ▼                  ▼
problem.service subject.service  quiz.service    session.service
    │           │                │                  │
    ▼           ▼                ▼                  ▼
REST routes + agent tools ──> Chat SSE (GenUI envelopes) ──> Angular frontend

Write-backs: uploads (upload.service / save_uploaded_files) → content files + metadata JSON + DB;
content enricher → problem .md files (enrich_problem_file) + metadata/problems.json (update_problem_metadata)
```

---

## Backend Deep Dive

### Express Bootstrap (`index.ts`)

1. Creates the Express app with `cors()` + `express.json()`
2. Request-ID middleware (reads `x-request-id` or generates an 8-char UUID prefix) + debug log line
3. `initSchema()` — tolerates failure, the server starts anyway
4. Registers all routers under `/api` (health, filters, problems, subjects, companies, models, sessions, quiz, upload, chat)
5. Unknown routes → `404 { error: { code: 'NOT_FOUND', message: 'Route not found' } }`
6. Centralized error handling:
   - `AppError` → its `statusCode` + `{ error: { code, message, details } }`
   - `ZodError` → HTTP 400 `VALIDATION_ERROR` with `details: err.issues`
   - Unknown → HTTP 500 `INTERNAL` (this includes Multer errors such as non-`.md` files or files over 5 MB)

### Configuration

**`config/env.ts`** — loads `.env` via `dotenv/config`, validates with Zod at import time, exits the process on failure.

| Variable | Required | Default | Notes |
|---|---|---|---|
| `PORT` | No | `3100` | Converted to number |
| `CONTENT_ROOT` | **Yes** | — | Interview repo root (parent of `app/`); Docker overrides it to `/content` |
| `DB_PATH` | No | `./data/interview.db` | Resolved against the process CWD (`app/backend/` when using npm scripts); Docker: `/app/data/interview.db` |
| `OPENAI_API_KEY` | Optional | `''` | OpenAI-compatible key; when empty, OpenAI-like models use the OAuth fallback |
| `OPENAI_BASE_URL` | Optional | `''` | OpenAI-compatible gateway URL |
| `ANTHROPIC_API_KEY` | Optional | `''` | Claude models |
| `ANTHROPIC_BASE_URL` | Optional | `''` | Passed to `ChatAnthropic` as `clientOptions.baseURL` |
| `GOOGLE_API_KEY` | Optional | `''` | Gemini models |
| `GOOGLE_BASE_URL` | Optional | `''` | Parsed but **not used** — `model-factory.ts` does not pass it to `ChatGoogleGenerativeAI` |
| `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` / `OAUTH_TOKEN_URL` | Optional | `''` | Client-credentials fallback for OpenAI-compatible models only |
| `DEBUG_RUNS` | No | `false` | `true` → saves chat agent input/output dumps to `backend/data/runs/<agent>-<timestamp>/` |

**`config/paths.ts`**
- Content paths derive from `CONTENT_ROOT`: `PROBLEMS_DIR` = `Data/Problems/LeetCode`, `MATERIAL_DIR` = `Data/Material`, `PROBLEMS_DATA_JSON` = `LeetCode/problems_data.json`, `RAW_BY_COMPANY_DIR` = `LeetCode/Raw By Company` (unused).
- `DATA_DIR` (`backend/data`) and `METADATA_DIR` (`backend/data/metadata`) are resolved **relative to the source file**, not to `DB_PATH` or the CWD.
- `DB_PATH` = `path.resolve(env.DB_PATH)`.

**`config/models.ts`** — LLM model registry.

| ID | Label | Provider | Structured output | Default temp | maxTokens |
|---|---|---|---|---|---|
| `gpt-oss-120b` (**default**) | GPT-OSS 120B | `openai-like` | Native (Zod schema) | 0.3 | 4096 |
| `claude-opus-4.6` | Claude Opus 4.6 | `anthropic` | `toolStrategy()` | 0.5 | 4096 |
| `claude-sonnet-4` | Claude Sonnet 4 | `anthropic` | `toolStrategy()` | 0.3 | 4096 |
| `gemini-2.5-pro` | Gemini 2.5 Pro | `google` | `toolStrategy()` | 0.3 | 8192 |
| `gemini-2.5-flash` | Gemini 2.5 Flash | `google` | `toolStrategy()` | 0.3 | 8192 |

Key exports:
- `MODELS: ModelDef[]` — `{ id, label, provider, supportsTools, supportsStructuredOutput, defaultTemperature, maxTokens }`
- `DEFAULT_MODEL_ID = 'gpt-oss-120b'` (hardcoded); `getModel()` without an id returns `MODELS[0]`
- `detectProvider(name)` — `/claude|anthropic/` → anthropic, `/gemini/` → google, else → openai-like
- `getModel(id?)` — returns the registered def or creates a dynamic one (detected provider, structured output only for openai-like, temperature 0.3, 4096 tokens)

### Services

| Service | Responsibility |
|---|---|
| `problem.service` | `queryProblems()`: dynamic SQL with FTS `MATCH`, difficulty / seniority / acceptance range / min interview value / has-solution filters, topic / company / pattern joins (`matchMode` any\|all), `excludeSlugs`, `randomize`, sort, pagination, then hydration of topics, patterns and companies. `getProblemBySlug()`: adds `rawMarkdown` (read from the file under `CONTENT_ROOT`) and 5 `relatedSlugs` (same primary topic, closest interview value). `getProblemSolution()`, `getRandomProblem()` |
| `subject.service` | `querySubjects()` (FTS, topics, `sourceFile`, `mainSubject`, pagination; ordered by main subject, sub subject, title), `getSubjectById()` |
| `session.service` | Chat thread CRUD, message persistence (`payload_json`), recent-history window, interview-session upsert/lookup |
| `quiz.service` | Quiz stats grouped by `mainSubject`, questions by subject ids (shuffle/limit), per-subject regeneration (replaces rows in a transaction) |
| `quiz-generator.service` | LLM question generation from subject markdown: 5 / 10 / 15 questions for ≤2,000 / ≤5,000 / >5,000 words, body truncated to 14,000 chars, ~40 % multiple-choice, every question needs a verbatim `referenceQuote`; plain JSON-array output parsed manually |
| `upload.service` | Manual + agentic uploads: file writes, `subjects.json` / `problems.json` updates, incremental DB + FTS inserts; exports helpers reused by the `save_uploaded_files` tool |
| `sse.service` | `initSse`, `sendSseEvent`, `sendSseDone`, `sendSseError`, `startHeartbeat` (writes a `: heartbeat` comment every 15 s) |

### Services — Key Patterns

- **Database fields** use `snake_case`; **API/service objects** use `camelCase`. Services map between them.
- **IDs**: UUIDs for threads/messages/sessions; slugs for problems; derived IDs for subjects; `<subjectId>--q<n>-<random>` for quiz questions.
- **Timestamps**: ISO strings everywhere.
- **SQL**: prepared statements with named (`:slug`) or positional (`?`) parameters — never interpolate user input (only constant identifiers, e.g. table names in `build-db.ts`, are interpolated).
- **Transactions**: used for bulk writes (DB rebuild, uploads, quiz generation/regeneration, chat migration).
- **Error handling**: services throw `NotFoundError`/`ValidationError`; `index.ts` converts them to JSON responses.
- **FTS**: `problems_fts` and `subjects_fts` virtual tables are built by the indexer, not `schema.sql`.
- **Response shape**: `{ data, meta? }` on success, `{ error: { code, message, details? } }` on failure.

### Chat Route (`routes/chat.routes.ts`)

This is the most complex route. Request body (`chatBodySchema`): `{ message, modelId?, threadId?, mode? = 'auto', stream? = true, context?: { subjectId?, problemSlug?, filters? } }`.

1. Validate the body with `chatBodySchema` (Zod)
2. `detectMode(message, mode)` — resolves `auto` to a specific mode via regex
3. Get or create the thread (persists in SQLite; title = first 60 chars of the message; model falls back to `'gpt-oss-120b'`)
4. Persist the user message
5. Replay recent history (last 12 messages, which already include the message just persisted) as LangChain `HumanMessage`/`AIMessage`
6. Enrich the message with context (problem slug, subject ID, filters) and append it as a new `HumanMessage`
7. Create the agent for the resolved mode (`free-chat`, `mock-interview`, `subject-quiz`, `content-enricher`; anything else → problem-finder)
8. `recursionLimit`: 800 for `content-enricher`, 50 for all other agents
9. **Stream path** (SSE): stream the agent, emit `meta` → (`step` / `token` / `tool`)* → `result` → `done` (or `error`); heartbeat every 15 s; stops when the client disconnects
10. **Non-stream path**: iterates the same stream and returns `{ data: { threadId, modelId, agent, ui } }`
11. `toEnvelope()` — 3-tier validation: `safeParse(structured)` → `extractJson(rawText)` → `text` fallback
12. `validateProblemSlugs()` — drops hallucinated slugs from `inputs.problems` by checking the DB
13. Persist the assistant message (`content` = envelope message, `payload_json` = full envelope)
14. Mock interview (stream path only): upsert `interview_sessions` from the envelope (`stage`, `sessionProgress.step`, `interpretedFilters` → target company/role, `problems` → `plan_json`; status `completed` when `nextAction === 'end_interview'`, else `active`)
15. `DEBUG_RUNS=true` → `saveDebugDump()` writes `input.json` + `output.txt` to `backend/data/runs/<agent>-<timestamp>/`

Mode detection regexes (only for `auto`, checked in this order):
- `mock-interview`: `/mock\s*interview|interview\s*me|practice\s*session|simulate/i`
- `subject-quiz`: `/quiz|questions?\s*about|test\s*me\s*on/i`
- `content-enricher`: `/enrich|insufficient|fill\s*in|add\s*descriptions?|improve\s*content/i`
- Default fallback: `find-problems`
- `free-chat`: manual selection only (no auto-detection). The frontend defaults to `free-chat`; API clients that omit `mode` get `auto`.

### Upload Route (`routes/upload.routes.ts`)

- Multer memory storage; accepts `text/markdown` or `*.md`; 5 MB per file; max 20 files (form field `files`)
- Body validated with `uploadBodySchema` (`type`, `title`, `agentic`, `mainSubject?`, `subSubject?`, `classification?`, `subClassification?`, `difficulty?`); no files → `400 NO_FILES`
- Manual (`agentic=false`): synchronous `handleUpload()` → `{ data: { type, filesProcessed, items, message } }`
- Agentic (`agentic=true`): SSE stream with `status` (`{ phase: 'starting' | 'complete', message }`) and `tool` (`{ name, phase: 'start' | 'end', result? }`) progress events, then `result` (the upload result) + `done`, or `error`; heartbeat every 15 s; client-disconnect tracking (the response is ended)

Manual upload behavior (`upload.service.ts`):
- **Material** → `Data/Material/<mainSubject || title>/<sanitized filename>`; `subSubject` = form value (shared by all files) or derived from the filename; subject ID `<slug(mainSubject)>--<slug(subSubject)>` (deduplicated with `-2`, `-3`…); title from the first H1 (if it precedes any H2) or the first H2, else the sub-subject
- **Problem** → `Data/Problems/LeetCode/<sanitized filename>`; parsed like the indexer (`# <id>. <title>`, `**Difficulty:**`, `**Acceptance:**`, `**LeetCode:**`, `**Companies:**`, `##` sections); topics from `classification` / `subClassification` (the DB falls back to primary topic `uncategorized`); difficulty from the file, else the form value, else `Medium`
- Appends to `metadata/subjects.json` / `metadata/problems.json`, then inserts into SQLite (+ FTS rows when the FTS tables exist)
- Filenames are sanitized (`&` → `And`, `/` → `-`, `path.basename`, other special characters → `_`) to prevent path traversal

### Utilities

- **`logger.ts`**: `createLogger(tag)` → colored timestamped `debug/info/warn/error`; `log` = `createLogger('app')`
- **`errors.ts`**: `AppError(code, message, statusCode = 500, details?)`, `NotFoundError(resource, id)` → 404, `ValidationError(message, details?)` → 400
- **`oauth.util.ts`**: Client-credentials token cache with 60 s pre-expiry refresh and concurrent-request dedup; reads `process.env` directly. Returns the `'direct-api-key-mode'` sentinel when `OAUTH_TOKEN_URL` is empty and any direct API key is configured.
- **`log-colors.util.ts`**: ANSI color constants + `color256()`

---

## Frontend Deep Dive

### Application Shell

**`app.config.ts`** — Standalone Angular providers:
- Zone change detection with event coalescing
- Router with `withComponentInputBinding()` (route params → signal inputs)
- HTTP client with Fetch backend
- Async animations

**`app.component.ts`** — Toolbar with nav links (Problems, Subjects, Quiz, Chat, Upload) and a dark/light toggle. On init: applies the theme, loads filter options, loads the model list.

**`app.routes.ts`** — All feature pages are lazy-loaded via `loadComponent`; `''` and unknown paths redirect to `/problems`. Route params:
- `/problems/:slug` → `ProblemDetailComponent.slug`
- `/subjects/:id` → `SubjectDetailComponent.id`
- `/chat/:threadId` → `ChatPageComponent.threadId`

### Core Layer

#### API Services (`core/api/`)

All root-provided. Standard REST APIs use `HttpClient`; streaming APIs (chat, agentic upload) use native `fetch` with manual SSE parsing.

| Service | Key Methods | Endpoints / Notes |
|---|---|---|
| `ChatApi` | `sendStream(body, onEvent, signal?)`, `sendSync(body)` | `POST /api/chat`; events dispatched in `NgZone.run`; resolves on `done`/`error`/abort |
| `ProblemsApi` | `query(filters)`, `getBySlug(slug)`, `getSolution(slug)`, `getRandom(filters)` | `/api/problems`, `/api/problems/:slug`, `/api/problems/:slug/solution`, `/api/problems/random`; omits null/empty params |
| `SubjectsApi` | `query(filters)`, `getById(id)` | `/api/subjects`, `/api/subjects/:id`; same param serialization |
| `FiltersApi` | `load()` | `GET /api/filters` → `FiltersData` |
| `ModelsApi` | `load()` | `GET /api/models` → `{ models, defaultModelId }` |
| `ThreadsApi` | `list()`, `get(id)`, `delete(id)`, `updateTitle(id, title)` | `/api/threads`, `/api/threads/:id`, `POST /api/threads/:id/title` |
| `QuizApi` | `getStats()`, `getQuestions(ids, limit?, shuffle = true)`, `regenerate(subjectId, modelId?)` | `GET /api/quiz/stats`, `GET /api/quiz?subjects=a,b&shuffle=&limit=`, `POST /api/quiz/regenerate/:subjectId` |
| `UploadApi` | `upload(request)`, `sendStream(request, onEvent, signal?)` | `POST /api/upload` (multipart); the SSE stream rejects after 90 s without data |

Defined but currently not used by any component: `ChatApi.sendSync`, `ProblemsApi.getSolution`, `ProblemsApi.getRandom`, `ThreadsApi.updateTitle`, `QuizApi.regenerate`, `FiltersStore.applyFromAgent`, and the `context` argument of `ChatStore.send()`.

**API conventions:**
- REST APIs unwrap `{ data: ... }` backend envelopes via RxJS `map`
- Filter serialization: omit null/empty/empty-array values, serialize arrays as CSV
- SSE parsing: split on `\n`, match `event: ` and `data: ` prefixes, `JSON.parse` the data (heartbeat comment lines are ignored)

#### Models (`core/models/`)

| Model | Key Types |
|---|---|
| `chat.model.ts` | `ChatThread`, `ChatComponentName`, `ChatUiEnvelope`, `ChatMessage`, `ModelInfo`, `ChatMode`, `SseEvent` |
| `filter.model.ts` | `CompanyOption`, `TopicOption`, `FiltersData`, `SelectedFilters` |
| `problem.model.ts` | `ProblemListItem`, `ProblemDetail`, `ProblemSolution` |
| `quiz.model.ts` | `QuizQuestion`, `QuizSubjectInfo`, `QuizStatsGroup` |
| `subject.model.ts` | `SubjectListItem`, `SubjectDetail` |

#### Services

- **`MarkdownService`** — Renders markdown to HTML via `marked` + `marked-highlight` (highlight.js, auto-detect when no language). Mermaid blocks are rendered as `<pre class="mermaid">` (not highlighted).
- **`ThemeService`** — `isDark` signal, `toggle()`, `init()`. Initial value from `localStorage('theme')`, falling back to `prefers-color-scheme: dark`. Applies the `body.dark-theme` class.

#### Directives

- **`MermaidDirective` (`[appMermaid]`)** — Standalone attribute directive. Uses `MutationObserver` + `AfterViewChecked` to find `<pre class="mermaid">` blocks after `[innerHTML]` binding. Uses a `WeakSet` to prevent double-rendering. One-time global Mermaid init (`startOnLoad: false`, `theme: 'dark'`, `securityLevel: 'loose'`).

### State Layer (NgRx Signal Stores)

All stores are `{ providedIn: 'root' }`, use `signalStore` + `withState` + `withMethods` (plus `withComputed` where needed), and mutate via `patchState`.

| Store | State | Key Behavior |
|---|---|---|
| `ChatStore` | threads, activeThreadId, messages, mode, streaming, currentSteps, error | Optimistic user + placeholder assistant messages; SSE handling (`meta` sets the thread id, `step` appends node names, `token` replaces content, `result` sets `ui`, `error` sets `error`, `done` applies the `text` fallback); abort support; reloads threads after each send; parses `payloadJson` → `ui` when loading a thread. Default mode: `'free-chat'` |
| `FiltersStore` | companies, topics, difficulties, seniority (options), selected, loading, error, loaded | Persists `selected` to `localStorage('filters.selected')`. Computed `queryParams`, `hasActiveFilters`, selected counts |
| `ModelsStore` | models, defaultModelId, selectedModelId, loaded | Persists selection to `localStorage('selectedModelId')`. Default: `'gpt-oss-120b'` |
| `ProblemsStore` | items, total, page, pageSize, sort, order, status, error, detailCache | Caches problem details by slug |
| `QuizStore` | stats, selectedSubjectIds, questions, currentIndex, revealed, selectedOptionIndex, answers, status, error | Full quiz lifecycle: idle → loading → active → complete. Local scoring (a multiple-choice answer is correct when `expectedAnswer` contains the option text); `retryQuiz()` reshuffles |
| `SubjectsStore` | items, total, page, pageSize, status, error, currentDetail | No detail caching (unlike problems) |
| `UploadStore` | files, type, title, agentic, mainSubject, subSubject, classification, subClassification, difficulty, status, progress, result, error | Sync (`HttpClient`) or SSE (agentic) uploads, `AbortController` cancellation, falls back to `success` if the `result` event is missed |

### Feature Pages

| Route | Component | Store(s) | Notes |
|---|---|---|---|
| `/problems` | `ProblemsListComponent` | ProblemsStore, FiltersStore | Effect watches `filtersStore.queryParams()` to auto-reload; paginator |
| `/problems/:slug` | `ProblemDetailComponent` | ProblemsStore | Route-bound `slug` input; renders the DB sections (description, examples, solution, complexity, follow-ups, takeaway) with `ChatMarkdownViewerComponent` |
| `/subjects` | `SubjectsListComponent` | SubjectsStore | Groups items by `mainSubject`; paginator |
| `/subjects/:id` | `SubjectDetailComponent` | SubjectsStore | Uses `ChatMarkdownViewerComponent` |
| `/quiz` | `QuizPageComponent` | QuizStore | Subject selection grouped by main subject (only subjects with questions), question answering, scoring |
| `/chat` | `ChatPageComponent` | ChatStore, ModelsStore | Thread sidebar, mode/model dropdowns, streaming, GenUI, follow-up chips, copy-to-clipboard, Enter to send / Shift+Enter for newline, stop button |
| `/chat/:threadId` | `ChatPageComponent` | Same | Loads a specific thread |
| `/upload` | `UploadPageComponent` | UploadStore, FiltersStore | Drag-drop `.md` files, manual/agentic modes; taxonomy dropdowns come from `FiltersStore.topics` |

### Styling

**Global styles** (`styles.scss`):
- Base: Roboto font, full-height body
- Dark theme: `.dark-theme` class on `<body>`, extensive CSS custom property overrides for all Material components
- Chat colors: `--chat-user-bg`, `--chat-assistant-bg`, `--chat-error-bg`, `--chat-error-text`
- Markdown: `.markdown-body` class with code block styling, Mermaid transparent backgrounds
- Difficulty colors: `.difficulty-easy` (green), `.difficulty-medium` (orange), `.difficulty-hard` (red)
- Angular Material theme: Azure Blue (loaded in `angular.json`)
- Code highlighting: highlight.js GitHub Dark theme (loaded in `angular.json`)

**Component styles**: Each component uses its own `.scss` file. Production budgets (`angular.json`): initial bundle 10 MB warning / 20 MB error; component styles 40 kB warning / 80 kB error.

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
  - Looks up component in CHAT_COMPONENT_REGISTRY (unknown names → 'text')
  - Filters inputs to only declared inputKeys (and drops null/undefined values)
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
| `token` | `{ delta }` | Full text of the latest AI message so far (replaces, not appends) |
| `tool` | `{ name, phase, summary }` | Tool call start/end (args/result previews, max 200 chars) |
| `result` | `{ threadId, ui: ChatUiEnvelope }` | Final validated envelope |
| `done` | `{}` | Stream complete |
| `error` | `{ message }` | Error message |

The stream also carries `: heartbeat` comment lines every 15 s (ignored by the client).

---

## Agent System

### Model Factory (`agents/model-factory.ts`)

**`createChatModel(modelId?, temperature?, timeout?)`** — Returns `{ def: ModelDef, model: BaseChatModel }`. All providers use `maxRetries: 3`; temperature defaults to `def.defaultTemperature`.

Provider-specific behavior:
- **OpenAI-compatible** (`ChatOpenAI`): `OPENAI_API_KEY`, else an OAuth token from `getAccessToken()`; configurable base URL (`OPENAI_BASE_URL`); request `timeout` (default 120,000 ms); `maxTokens` is not passed
- **Anthropic** (`ChatAnthropic`): direct API key, optional base URL (`ANTHROPIC_BASE_URL`), `maxTokens`; no timeout param
- **Google** (`ChatGoogleGenerativeAI`): direct API key, `maxOutputTokens`; no timeout param, no base URL

**`createResponseFormat(def, schema)`** — Provider-aware structured output:
- OpenAI-compatible (`supportsStructuredOutput: true`): passes the Zod schema directly
- Anthropic/Google: wraps the schema in `toolStrategy()` (synthetic tool call)

**`extractJson(text)`** — Extracts JSON from markdown code fences (or the raw text), returns the parsed object or `null`.

### Shared Tools (`agents/shared/tools/`)

| Tool file | Name | Input | Notes |
|---|---|---|---|
| `list-filters.tool.ts` | `list_filters` | `kind` (companies / topics / difficulties), optional `q` | Companies: top 50 by problem count (top 30 `LIKE` matches when `q` is given); topics: all taxonomy entries (filtered by `q`); difficulties: static. Must be called before `search_problems` to resolve names → slugs/ids |
| `search-problems.tool.ts` | `search_problems` | `query`, `companies`, `difficulties`, `topics`, `patterns`, `seniority`, `matchMode`, `minInterviewValue`, `limit` (default 10, max 25), `randomize`, `excludeSlugs` (all optional) | Wraps `queryProblems()`; returns compact cards `{ slug, title, difficulty, primaryTopic, oneLiner, topCompanies }` (no solution body). `randomize` → random order; `excludeSlugs` for "another/different" requests |
| `get-problem.tool.ts` | `get_problem` | `slug`, optional `include` (description, examples, solution, complexity, followUps) | Default: description + examples. Solution excluded unless explicitly requested. Top 10 company names |
| `get-problem-hint.tool.ts` | `get_problem_hint` | `slug`, `hintLevel` (1-3) | Returns internal context plus a `[SYSTEM — do NOT include …]` instruction block. Level 1: restate + observations (no pattern names). Level 2: pattern + data structure (≤500 chars of complexity notes). Level 3: step outline (≤1,500 chars of solution + complexity). Never full code |
| `search-subjects.tool.ts` | `search_subjects` | `query` (required), optional `topics`, `limit` (default 10, max 25) | Returns subject metadata (id, title, sourceFile, main/sub subject, primaryTopic, keyConcepts, wordCount) |
| `get-subject.tool.ts` | `get_subject` | `id`, optional `section`, optional `maxChars` (default 12000) | Section extraction by heading match (exact → contains → reverse-contains, numbering stripped). Truncates at the last `##` boundary. Always returns `sections` (all headings) plus `sectionExtracted` / `matchedSection` |

### Agent Definitions

Each agent directory contains:
- `*.agent.ts` — Factory function returning `{ agent, def }`
- `*.prompt.ts` — System prompt (GenUI agents import `UI_RESPONSE_PROMPT`)
- `*.schema.ts` (optional, legacy) — Older specialized schemas in `problem-finder/`, `mock-interview/`, `subject-quiz/` (currently unused; all GenUI agents use `chatUiResponseSchema`)

| Agent | Mode | Tools | Components Used | recursionLimit |
|---|---|---|---|---|
| **Free Chat** | `free-chat` (frontend default) | All 6 shared tools | `text`, `chat-hint-card`, `chat-markdown-viewer`, `chat-problem-list` | 50 |
| **Problem Finder** | `find-problems` (fallback for `auto`) | All 6 shared tools | `chat-problem-list`, `chat-markdown-viewer`, `chat-hint-card`, `text` | 50 |
| **Mock Interview** | `mock-interview` | `list_filters`, `search_problems`, `get_problem`, `get_problem_hint` | `chat-interview-question`, `chat-evaluation-scorecard`, `chat-hint-card`, `text` | 50 |
| **Subject Quiz** | `subject-quiz` | `search_subjects`, `get_subject` | `chat-quiz-cards`, `chat-markdown-viewer`, `text` | 50 |
| **Content Enricher** | `content-enricher` | 5 enricher-specific tools | `chat-enrichment-report`, `text` | 800 (chat) / 200 (CLI loop) |
| **Content Uploader** | _(internal, `POST /api/upload` with `agentic=true`)_ | `classify_content`, `split_material`, `save_uploaded_files` | _(none — no `responseFormat`, SSE progress)_ | 50 |

### Free Chat Agent

Tutoring/study partner mode — the default mode in the UI. Key prompt behaviors:
- Socratic method: ask guiding questions before giving answers
- Progressive hints before solutions (`get_problem_hint` levels 1 → 3)
- Step-by-step breakdowns with WHY explanations, pattern recognition, edge cases, complexity
- Never volunteer full solutions unless explicitly asked
- Random problems → `search_problems` with `randomize: true`; "another/different" → `excludeSlugs` + `randomize: true`; recommendations always via tools and always as `chat-problem-list`

### Problem Finder Agent

Interview coach over the problem DB (default target of `auto`). Key prompt rules:
- Always call `list_filters` before `search_problems` for named entities; extract seniority from the prompt; map difficulty words and topic words to taxonomy ids (e.g. "DP" → `dynamic-programming`)
- `matchMode: "any"` by default, `"all"` only when the user explicitly says "and"; relax one filter at a time on 0 results and say what was relaxed
- Same random/another rules as Free Chat; never reveal solutions unless asked (offer hints)
- Source material requests → `search_subjects` + `get_subject` (prefer the `section` parameter for sub-topics) → `chat-markdown-viewer`; after a section extraction, suggest "Would you like to retrieve the whole file?"

### Mock Interview Agent

Stateful interview simulation with stages:
1. `plan` → Pick 3-5 problems
2. `ask_basic` → Present problem
3. `probe` → Evaluate answer
4. `expand` → Follow-up/constraint changes
5. `hint` → Progressive hints (on request or after 2 stalls)
6. `feedback` → 1-5 scoring on 4 axes
7. `next`/`end` → Advance or finish

One question per turn, never volunteers the solution. Interview sessions are persisted in the `interview_sessions` table (from the streamed envelope — see Chat Route step 14).

### Subject Quiz Agent

Generates questions **only** from retrieved material: `search_subjects` → `get_subject` (section-level retrieval preferred; multiple subjects supported). Default 5 questions per subject, mixed types/difficulties, every question with a verbatim `referenceQuote`, plus study tips. After a section-only quiz it suggests "Would you like questions from the full file?".

### Content Enricher

Batch tool-driven agent for enriching problem markdown files in a tight tool-call loop (minimal prose). Has its own 5 tools:

| Tool | Input | Behavior |
|---|---|---|
| `scan_problems` | `offset?` (1-indexed, default 1), `batchSize?` (default 5, max 10) | Scans `Data/Problems/LeetCode/*.md` (sorted) and returns the next batch of insufficient files + `hasMore` / `nextOffset` |
| `read_problem_file` | `filename` | Full file content + line count |
| `enrich_problem_file` | `filename`, `newContent` | Overwrites the file in place (the `.bak` backup code is commented out, although the tool description claims a backup) |
| `update_problem_metadata` | `updates[]: { title, topics[], seniority?, oneLiner?, patterns? }` | Matches by slugified title, then filename; normalizes topics (id / label / slugified label) against `TAXONOMY`; first topic = primary; writes `metadata/problems.json` only (not the DB, not the JSONL) |
| `read_audit_report` | `issueType` (summary / insufficient_content / wrong_primary_topic / missing_sub_topics), `filePath?`, `offset?` (0-indexed), `batchSize?` (default 20, max 50) | Parses the audit report tables; `insufficient_content` items already fixed on disk are filtered out |

- **Insufficient file**: ≤ 12 lines, OR contains "Solution approach and pseudocode to be added", OR lacks `## Problem Description` (optionally numbered, e.g. `## 1. Problem Description`). `INDEX.md` is always skipped.
- **Enrichment format**: keep the header lines (`# [ID]. [Title]`, `**Difficulty:**`, `**Acceptance:**`, `**LeetCode:**`, `**Companies:**`); add Problem Description, Examples, Approach (pseudocode), Walkthrough, Complexity Analysis, Follow-Up Questions, and `## Key Takeaway`. **Pseudocode only** (```` ```text ```` fences, `SET x ← …`, `FOR`, `WHILE`, `FUNCTION`, `RETURN`) — never real programming-language code.
- **Audit report** (default `<CONTENT_ROOT>/Data/Problems/LeetCode/audit_report.md`): sections `## 1. Insufficient Content` (filename, missing sections, lines), `## 2. Wrong Primary Topic` (title, current, should be, additional sub-topics), `## 3. Missing Sub-Topics` (title, primary, current topics, missing sub-topics); summary fields `**Total files scanned:**`, `**Sufficient content:**`, `**Insufficient content:**`, `**Wrong primary topic:**`, `**Missing sub-topics:**`.
- **CLI loop** (`run-enricher-loop.ts`, run from `app/backend/`): `npm run enrich -- [--model=<id>] [--batch=<n>] [--max-batches=<n>]` and `npm run enrich:audit -- [--audit-file=<path>] [--fix=wrong_primary_topic|missing_sub_topics|insufficient_content|all]`. Defaults: model `gpt-oss-120b`, batch 5, unlimited batches, fix `all`. A fresh agent per batch (`agent.invoke`, recursionLimit 200). Classification audit fixes are applied deterministically without the LLM (`fixClassificationIssuesDirect`); only `insufficient_content` uses the LLM. Retries: rate limits (429) wait N minutes, connection errors wait 15 s × N (N = consecutive rate-limit/connection failures, shared counter; the loop aborts once N exceeds 5); other errors abort the loop after 3 consecutive failures. In audit mode an abort only stops the current issue type; the loop moves on to the next one.

### Content Uploader

Agentic classification + splitting for uploads (`createContentUploaderAgent(fileContents, modelId?)`, called by `upload.service.ts` with the default model; 300 s timeout per LLM request; recursionLimit 50; no `responseFormat`).

- **`UploadContext`** (closure shared by the tools): `originalFiles` (CRLF-normalized) and `splitFiles` maps, so the LLM never has to echo file contents in tool arguments.
- **`classify_content`**: validates topics against the taxonomy; for material with `sourceFileName` it auto-detects splitting — H1 level when there are ≥ 3 non-boilerplate H1s, otherwise H2 level when there are ≥ 3 top-level groups (`N.M` numbering collapses to `N`) or ≥ 5 H2s; ignores headings inside fenced code and decorative headings (`# ━━━━`); detects a Table of Contents; returns `detectedSections` (index + text), `tocEntries`, `splitInstructions`.
- **`split_material`**: `splits[]: { fileName, subSubject, sectionIndices? (preferred), sectionHeadings? (fallback) }`; the preamble goes into the first split; heading numbers are renumbered to start at 1; results are stored in `splitFiles`.
- **`save_uploaded_files`**: resolves content from split → original files (exact, then case-insensitive match); writes to `Data/Material/<mainSubject>/` or `Data/Problems/LeetCode/`; appends to the metadata JSON; inserts into SQLite (+ FTS).
- `upload.service.ts` stops consuming the agent stream as soon as `save_uploaded_files` returns (it does not wait for the model's final prose) and builds the result from that tool's output.

---

## Indexer Pipeline

### Stages

| Stage | Command | Input | Output |
|---|---|---|---|
| **Parse** | `npm run index:parse` | Markdown files + `problems_data.json` | `metadata/problems.json`, `metadata/subjects.json`, `metadata/parse-report.json` |
| **Classify** | `npm run index:classify` | Parsed JSON | Enriched JSON with LLM-assigned topics, patterns, seniority, interview value, one-liner (problems) and topics + key concepts (subjects). Uses `classification.jsonl` / `subjects.classification.jsonl` for resumability |
| **Build** | `npm run index:build` | Enriched JSON | `interview.db` (SQLite + FTS5), `metadata/filters.json` |
| **Questions** | `npm run index:questions` (backend only) | Subjects in the DB | `subject_questions` table entries (LLM-generated quiz questions) |

`run-index.ts` flags: `--stage=parse|classify|build|questions|all` (default `all` = parse + classify + build), `--force` (classify, questions), `--model=<id>` (questions only).

### Parse Details

- **Problems** (`parse-problem-md.ts`): Parses title + LeetCode ID (`# <id>. <title>`, else the filename), difficulty, acceptance, URL, companies and the `##` sections (description `/problem description/i`, examples `/examples?/i`, solution = all `/approach|solution|walkthrough|handling/i` sections concatenated, complexity, follow-ups `/follow[- ]?up/i`, takeaway `/key takeaway/i`). Merges with `problems_data.json` by LeetCode ID, then by normalized title — external data wins for difficulty, acceptance and URL and adds company frequencies. Unparseable difficulty → `Medium`. `hasSolution` = solution text > 50 chars. Slug = slugified title, deduplicated with `-<leetcodeId>`, then `-2`, `-3`…
- **Theory** (`parse-theory-md.ts`): Scans `Data/Material/<Main>/`. Sub-folders = nested layout (folder name = sub-subject); `.md` files directly in `<Main>/` = flat layout (sub-subject derived from the filename). One subject per file (whole file = `bodyMd`). Title: first H1 that precedes any H2 (number / "Part X —" prefixes stripped, ignoring "Introduction" / "Table of Contents"), else the first non-generic H2, else the sub-subject/filename. ID = `<slug(main)>--<slug(sub or file)>` (deduplicated with `-2`, `-3`…).
- Parsing **resets all classification fields** (`primaryTopic`, `topics`, `patterns`, `seniority`, `interviewValue`, `oneLiner`, `keyConcepts`) — always run classify after parse.

### Classification

- Problems: always the default model (`gpt-oss-120b`) at temperature 0 via `withStructuredOutput` (Zod: 1-3 taxonomy topic ids, `primaryTopic`, ≤ 4 patterns, seniority, interview value 1-5, one-liner ≤ 200 chars); descriptions truncated to 600 chars
- Batches of 25, 4 concurrent; 3 retries with exponential backoff (1 s, 2 s, 4 s), then the batch is split in half recursively; permanent failures → `metadata/classification.errors.json`
- Writes JSONL incrementally for resumability (already-classified ids are skipped), then folds the JSONL back into `problems.json` (the last line per id wins)
- Subjects: batches of 25, no retries → `subjects.classification.jsonl` → folded into `subjects.json`
- `--force` deletes the JSONL caches and re-classifies everything

### Build

- Requires `problems.json`; every problem must have a non-null `primaryTopic` (`problems.primary_topic` is `NOT NULL`)
- Drops and recreates the content tables (`problem_patterns`, `problem_companies`, `problem_topics`, `subject_topics`, `problems`, `subjects`, `topics`, `companies`) — chat/session tables, `subject_questions` and `app_meta` are preserved
- Creates FTS5 virtual tables (`problems_fts(slug UNINDEXED, title, one_liner, description_md, solution_md, patterns)`, `subjects_fts(id UNINDEXED, title, key_concepts, body_md)`, tokenizer `porter unicode61`)
- Inserts taxonomy entries (with `kind`), problems, companies (with computed `problem_count`), subjects, relations — in one transaction
- Imports `metadata/subject_questions.json` only if the file exists and the `subject_questions` table is empty
- Runs VACUUM, writes `filters.json`, logs a summary

### Questions

- Generates questions for subjects that have none (all subjects with `--force`), using `quiz-generator.service.ts` (5 / 10 / 15 questions depending on word count), with a 1 s delay between subjects
- Replaces a subject's questions in a transaction; `model_id` stores the `--model` value or `'default'`

### Taxonomy (`indexer/taxonomy.ts`)

31 canonical topic ids (the `kind` column is assigned in `build-db.ts`):
- **Algorithmic** (20): `arrays-hashing`, `two-pointers`, `sliding-window`, `string-manipulation`, `stack-queue`, `linked-list`, `binary-search`, `trees`, `tries`, `heap-priority-queue`, `graphs`, `backtracking`, `dynamic-programming`, `greedy`, `intervals`, `math-geometry`, `bit-manipulation`, `concurrency`, `sql-database`, `shell-scripting`
- **Design** (3): `system-design`, `oop-design`, `data-structures-design`
- **Theory** (8, ids start with `theory-`): `theory-ai`, `theory-ai-engineering`, `theory-distributed-systems`, `theory-frontend`, `theory-infra-devops`, `theory-security`, `theory-engineering-leadership`, `theory-architecture`

Also exports `TAXONOMY_IDS`, `TAXONOMY_MAP`, `DIFFICULTIES` (`Easy`, `Medium`, `Hard`) and `SENIORITY` (`junior`, `mid`, `senior`, `staff`, `principal`).

---

## Database Schema

Key tables (all `CREATE TABLE IF NOT EXISTS` in `schema.sql`):

| Table | Purpose |
|---|---|
| `problems` | Problem metadata + markdown sections (`primary_topic` NOT NULL; `difficulty` CHECK Easy/Medium/Hard) |
| `topics` | Topic taxonomy entries (`kind`: `algorithmic` / `design` / `theory`) |
| `companies` | Company names + `problem_count` |
| `problem_topics` | M:N problem↔topic |
| `problem_companies` | M:N problem↔company (with frequency) |
| `problem_patterns` | M:N problem↔pattern |
| `subjects` | Theory/material metadata + markdown body (`key_concepts` stored as JSON) |
| `subject_topics` | M:N subject↔topic |
| `subject_questions` | Quiz questions (`type` open/multiple-choice, `difficulty` easy/medium/hard, `options` stored as JSON) |
| `chat_threads` | Chat thread metadata (mode, model, title) |
| `chat_messages` | Chat messages (with `payload_json` = full GenUI envelope for assistant messages) |
| `interview_sessions` | Mock interview state (stage, plan, progress, status) |
| `app_meta` | Schema version tracking (`chat_schema_version` = `'2'`) |
| `problems_fts` | FTS5 virtual table (created by indexer, not schema.sql) |
| `subjects_fts` | FTS5 virtual table (created by indexer, not schema.sql) |

Indexes: `idx_problems_difficulty`, `idx_problems_primary_topic`, `idx_pc_company`, `idx_pt_topic`, `idx_msg_thread`, `idx_sq_subject`. No foreign-key constraints are declared (even though `PRAGMA foreign_keys = ON`), so related rows must be deleted manually (`deleteThread()` removes messages and interview sessions first).

---

## Testing

### Backend (`app/backend/`, `npm test`)

`tsx --test $(find src -name '*.test.ts')` — Node's built-in test runner, 7 files, 100 test cases:

| File | Covers |
|---|---|
| `agents/model-factory.test.ts` | Model registry, `getModel`, `detectProvider` |
| `agents/shared/tools/tools.test.ts` | The 6 shared tools against a seeded temp DB |
| `indexer/parse-problem-md.test.ts` | `parseSingleFile` on real content files (`3Sum.md`, Two Sum) |
| `indexer/parse-theory-md.test.ts` | Theory scanning of the real `Data/Material/` |
| `routes/integration.test.ts` | REST routes (health, filters, problems, models, companies, 404) on a temp DB |
| `routes/upload.test.ts` | Upload API with a temp `CONTENT_ROOT` + temp DB |
| `services/problem.service.test.ts` | Query/filter/sort/random on a seeded temp DB |

- Tests set fake API keys and `https://localhost:999x` base URLs → no network or LLM calls; temp DBs live in `/tmp`.
- Several test files hardcode `CONTENT_ROOT=/home/sio/Code/Interview` (some unconditionally), and the parse tests read real content files from it — adjust when running on another machine.
- `upload.test.ts` writes to the real `backend/data/metadata/{subjects,problems}.json` (`METADATA_DIR` is source-relative) and restores backups afterwards — an interrupted run can leave them modified.
- Tests import modules dynamically **after** setting `process.env`, because `config/env.ts` validates at import time.

### Frontend (`app/frontend/`, `npm test`)

Karma + Jasmine (Chrome), 6 spec files (`app.component`, `chat-page`, `problems-list`, `problem-detail`, `subjects-list`, `subject-detail`). `app.component.spec.ts` is stale CLI scaffolding (expects a `title` property and an `<h1>`), so the Karma build currently fails until it is updated.

---

## Conventions and Patterns

### TypeScript/Code Style

- **Backend**: ESM (`"type": "module"`), `.js` extensions in imports, executed directly via `tsx` (no compiled build)
- **Frontend**: Angular standalone components, SCSS, strict TypeScript + strict Angular templates, signal `input()`s, built-in control flow (`@if`, `@for`)
- **Validation**: Zod schemas for all API boundaries (request bodies, query params, agent responses, env)
- **State management**: NgRx Signal Stores with `patchState`, root-provided singletons
- **Components**: All standalone, lazy-loaded at route level
- **Imports**: Use `.js` extensions in backend (ESM convention); Angular uses standard TS imports
- **Logging**: `createLogger('<tag>')` per module; tools log `INPUT:` / `OUTPUT:` lines

### Naming Conventions

| Context | Convention | Example |
|---|---|---|
| Database columns | `snake_case` | `primary_topic`, `created_at` |
| TypeScript properties | `camelCase` | `primaryTopic`, `createdAt` |
| Problem identifiers | Slugs (kebab-case) | `two-sum`, `longest-palindromic-substring` |
| Subject identifiers | Derived IDs `<main>--<sub>` | `ai--agent-memory`, `angular--change-detection` |
| Taxonomy topic ids | kebab-case, theory topics prefixed `theory-` | `dynamic-programming`, `theory-security` |
| Component selectors | `app-` prefix | `app-chat-page`, `app-chat-component-host` |
| Chat components | kebab-case matching registry | `chat-problem-list`, `chat-hint-card` |
| Agent directories | kebab-case | `free-chat/`, `mock-interview/` |
| Tool names | `snake_case` | `search_problems`, `get_problem_hint` |
| Tool files / factories | `<kebab-name>.tool.ts` / `create<Name>Tool()` | `search-problems.tool.ts` / `createSearchProblemsTool()` |
| CSS theme vars | `--chat-*`, `--mat-*` | `--chat-user-bg`, `--mat-option-label-text-color` |

### Error Handling

- Backend services throw `NotFoundError`/`ValidationError` (extend `AppError`)
- Express error handler in `index.ts` converts to JSON `{ error: { code, message, details? } }`
- SSE errors sent as `error` event before stream close
- Enricher and uploader tools return `JSON.stringify({ error })` for expected problems (missing files, missing `mainSubject`, …); shared tools let service errors propagate (e.g. `NotFoundError` for an unknown slug/id)
- Frontend stores capture errors in an `error` signal, displayed as banners
- Agent responses: 3-tier envelope validation guarantees a valid response even on LLM failures

### Dark Theme

- Toggle via `ThemeService` → `body.classList.toggle('dark-theme', dark)`
- All dark theme styles in `styles.scss` under `.dark-theme { ... }`
- Uses CSS custom properties for Material component theming
- Chat-specific colors: `--chat-user-bg: #1a3a5c`, `--chat-assistant-bg: #2c2c2c`, `--chat-error-bg: #4e1515`, `--chat-error-text: #ef9a9a`
- `!important` overrides required for several Material internal styles
- Mat-option selected state uses `z-index` stacking to keep text above `::before` state layer

### Persistence

- `localStorage('theme')` — light/dark preference
- `localStorage('filters.selected')` — problem filter selections
- `localStorage('selectedModelId')` — chosen LLM model
- SQLite — all content, chat history, quiz questions, interview sessions
- Files — uploaded/enriched markdown under `CONTENT_ROOT`; metadata JSON/JSONL under `backend/data/metadata/`

---

## Adding New Features

### Adding a New Chat Component

1. **Backend schema** — Add component name to `CHAT_COMPONENTS` in `agents/shared/ui-response.schema.ts`. Add its input fields to `chatInputsSchema`.
2. **Backend prompt** — Add component description to `<component-logic>` block in `agents/shared/ui-response.prompt.ts`.
3. **Frontend model** — Add the name to the `ChatComponentName` union in `core/models/chat.model.ts`.
4. **Frontend component** — Create standalone component under `features/chat/components/`. Declare signal `input()` for each data field.
5. **Frontend registry** — Add entry to `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` with component class and `inputKeys`.
6. **Agent prompt(s)** — Update relevant agent prompt(s) ("Component Choice For This Agent") to describe when to use the new component.
7. **Docs** — Update the component tables in `README.md` and this file (rule 2).

### Adding a New Chat Mode/Agent

1. **Backend agent** — Create `agents/<mode-name>/` with:
   - `<mode>.prompt.ts` — System prompt importing `UI_RESPONSE_PROMPT`
   - `<mode>.agent.ts` — Factory function using `createChatModel`, `createResponseFormat`, `createAgent`
2. **Backend API types** — Add mode string to `chatBodySchema` mode enum in `types/api.types.ts`
3. **Backend route** — In `chat.routes.ts`:
   - Import the agent factory
   - Add `case` to the switch statement (and adjust `recursionLimit` if needed)
   - Optionally add regex to `detectMode()` for auto-detection
4. **Frontend model** — Add mode string to `ChatMode` type in `core/models/chat.model.ts`
5. **Frontend dropdown** — Add `<mat-option>` in `chat-page.component.html`
6. **Default** — If it should be the default, update initial `mode` in `chat.store.ts`

### Adding a New Shared Tool

1. Create tool in `agents/shared/tools/<name>.tool.ts` using LangChain `tool()` (from `@langchain/core/tools`) with a Zod schema, exported as a `create<Name>Tool()` factory
2. Import and add to the tools array in each agent that needs it
3. Update agent prompts to describe the tool's purpose and usage rules
4. Add tests to `agents/shared/tools/tools.test.ts`

### Adding a New REST Route

1. Create `routes/<name>.routes.ts` with Express Router
2. Define request validation schemas in `types/api.types.ts`
3. Create/update service in `services/`
4. Register router in `index.ts` under `/api`
5. Create frontend API service in `core/api/`
6. Create/update signal store in `state/`
7. Document the endpoint in `README.md` (API Endpoints)

### Adding a New LLM Model

1. Add a `ModelDef` to `MODELS` in `config/models.ts` (`supportsStructuredOutput: true` only for OpenAI-compatible endpoints with native JSON-schema support; others go through `toolStrategy()`)
2. Make sure the provider's API key is configured (provider = `def.provider`)
3. The frontend picks it up automatically via `GET /api/models`
4. Changing the default model means updating every hardcoded `'gpt-oss-120b'` (see Synchronization Points)

### Adding / Changing a Taxonomy Topic

1. Edit `TAXONOMY` in `indexer/taxonomy.ts` (it drives the classification Zod enum, `update_problem_metadata` / `classify_content` validation and the uploader prompt)
2. Update the hardcoded topic list in `agents/content-enricher/content-enricher.prompt.ts`
3. Theory topics must start with `theory-`; design topics must be added to the `kind` mapping in `indexer/build-db.ts`
4. Re-run `index:classify` (with `--force` to reconsider existing items) and `index:build`

---

## Common Pitfalls

### Backend

- **Import extensions**: Backend uses ESM — all local imports must use `.js` extension (e.g., `import { foo } from './bar.js'`), even though source files are `.ts`. This is the Node ESM convention with tsx.
- **`createAgent` import**: Import from `'langchain'`, not from `'@langchain/langgraph'` or other sub-packages (same for `toolStrategy`).
- **Env validation at import time**: `config/env.ts` exits the process if `CONTENT_ROOT` is missing; anything importing config (most modules) needs a valid env — tests set `process.env` before dynamic imports.
- **Model factory timeout**: Only OpenAI-compatible models receive the timeout parameter. Anthropic and Google models do not.
- **Default model needs OpenAI credentials**: `gpt-oss-120b` is OpenAI-compatible. With only Anthropic/Google keys, `getAccessToken()` returns the `'direct-api-key-mode'` sentinel, which is then used as the OpenAI API key → auth errors. This affects the default chat model, `index:classify` (always the default model), quiz generation without `--model` and the enricher CLI default.
- **FTS tables**: Created by `indexer/build-db.ts`, not by `schema.sql`. If the indexer hasn't run, FTS queries (`q` filters, `search_problems` with `query`) fail. Upload service handles this gracefully.
- **Schema migration**: `db/connection.ts` has a destructive chat-history migration — clears all chat data (threads, messages, interview sessions) when `chat_schema_version` differs from `CHAT_SCHEMA_VERSION`. Check `migrateChatHistory()` before changing schema.
- **Schema changes to content tables** only take effect after `index:build` (it drops and recreates them); `CREATE TABLE IF NOT EXISTS` never alters existing tables, so changes to chat/session tables need a manual migration.
- **`CONTENT_ROOT`**: Must point to the Interview repo root (parent of `app/`). Docker overrides it to `/content`.
- **Paths**: `METADATA_DIR`/`DATA_DIR` are always `backend/data[/metadata]` (source-relative), while `DB_PATH` is resolved against the CWD — run backend scripts from `app/backend/` (npm scripts do this automatically).
- **Agent recursion limits**: 50 for most agents, 800 for content-enricher (set in `chat.routes.ts`), 200 in the enricher CLI loop, 50 for the uploader.
- **Debug dumps**: When `DEBUG_RUNS=true`, agent input/output is saved to `backend/data/runs/`. Remember to disable in production.
- **TLS verification is disabled** in several npm scripts, both Dockerfiles (`strict-ssl false`, backend runtime `ENV NODE_TLS_REJECT_UNAUTHORIZED=0`) and `docker-compose.yml` — a corporate-network workaround, not something to copy into new code.

### Indexer & Data

- **Parse wipes classifications**: `index:parse` regenerates `problems.json`/`subjects.json` with null/empty classification fields. Run `index:classify` next (cheap when the JSONL caches are complete) — `index:build` fails on `problems.primary_topic NOT NULL` otherwise.
- **Metadata edits outside the JSONL are fragile**: `update_problem_metadata`, audit fixes and uploads only edit `metadata/*.json` (+ DB for uploads). Re-running parse → classify discards them: items already in `classification.jsonl` get their cached values back, and items missing from it (e.g. uploads) are re-classified by the LLM. Running only `index:build` keeps them.
- **Enriched content needs a re-index**: the UI renders DB columns (`description_md`, …), so `.md` changes made by the enricher appear only after parse → classify → build (which in turn drops `problems.json`-only metadata edits, see above).
- **Root script flags**: root scripts don't forward extra flags (with `npm run index:classify -- --force` from `app/`, the `--force` is consumed by the nested `npm run` as an npm option) — use `npm run index:classify --prefix backend -- --force`.
- **`backend/data/` is not git-ignored**: `interview.db` (+ `-wal`/`-shm`) and large metadata files show up as changes; never commit anything yourself (rule 3).

### Frontend

- **Route input binding**: Route params bind directly to component signal inputs via `withComponentInputBinding()`. No need for `ActivatedRoute.params` subscription.
- **SSE token events**: The backend sends FULL content in each `token` event (not deltas). The store replaces, not appends: `msgs[lastIdx] = { ...msgs[lastIdx], content: data.delta }`.
- **Component input filtering**: `ChatComponentHostComponent` filters inputs to only keys declared in `inputKeys` to prevent Angular `NG0303` errors.
- **Dark theme scope**: The `.dark-theme` class is on `<body>`. Material overlay panels (dropdowns, menus) render in `<cdk-overlay-container>` which is a child of body, so dark theme styles apply. However, some Material internal styles need `!important` overrides.
- **Markdown rendering**: Always use `MarkdownService.render()` and bind with `[innerHTML]`. Add `appMermaid` directive for Mermaid support. Use `class="markdown-body"` for proper styling.
- **Signal store mutations**: Always use `patchState()`. Never mutate signal values directly. Clone arrays/objects before modifying (e.g., `const msgs = [...store.messages()]`).
- **NgRx Signal Store injection**: Stores are injected with `inject(StoreName)` — not constructor injection. All stores are root-provided singletons.
- **Dependency install**: the frontend needs `npm install --legacy-peer-deps` because of the unused `ngx-markdown@22` dependency (Angular 22 peer deps vs Angular 19).

### Known Quirks (verified in code — fix only when asked)

- The current user message is sent to the agent twice (it is persisted before the 12-message history is loaded, then appended again with context).
- Interview sessions are only persisted on the streaming chat path, not with `stream: false`.
- `sort=companyFrequency` is accepted by `problemsQuerySchema` but not implemented (falls back to interview value).
- `GOOGLE_BASE_URL` is parsed but never used.
- `enrich_problem_file` claims to back up the original file, but the backup code is commented out.
- `GET /api/threads/:id` returns at most the first 50 messages (oldest first).
- Multer rejections (non-`.md` file, > 5 MB) surface as `500 INTERNAL` from the global error handler (the upload tests use their own 400 handler).
- `frontend/src/app/app.component.spec.ts` is stale CLI scaffolding.
- The frontend `ProblemDetail` type declares `filePath`, which the backend never returns.

### Synchronization Points (Backend ↔ Frontend)

These must stay in sync — changes to one require changes to the other:

| What | Backend Location | Frontend Location |
|---|---|---|
| Component names | `CHAT_COMPONENTS` in `ui-response.schema.ts` | `ChatComponentName` in `chat.model.ts` + `CHAT_COMPONENT_REGISTRY` in `component-registry.ts` |
| Component inputs | `chatInputsSchema` in `ui-response.schema.ts` | `inputKeys` in `component-registry.ts` + component `input()`s |
| Chat modes | `chatBodySchema` in `api.types.ts` + `detectMode()` + switch in `chat.routes.ts` | `ChatMode` in `chat.model.ts` + dropdown in `chat-page.component.html` |
| SSE event names (chat) | `sendSseEvent` calls in `chat.routes.ts` | switch cases in `ChatStore.send()` |
| SSE event names (upload) | `progress(...)` calls in `upload.service.ts` + `upload.routes.ts` | `UploadStore.submit()` |
| Envelope shape | `chatUiResponseSchema` in `ui-response.schema.ts` | `ChatUiEnvelope` in `chat.model.ts` |
| API request bodies | Zod schemas in `api.types.ts` (+ `quizQuerySchema` in `quiz.routes.ts`) | API service method params (`UploadRequest` / `buildFormData` in `upload.api.ts`) |
| Default model `gpt-oss-120b` | `config/models.ts`, `chat.routes.ts` (thread fallback), `run-enricher-loop.ts` (CLI default), `model-factory.test.ts` | `models.store.ts` initial state |
| Taxonomy ids | `indexer/taxonomy.ts` + hardcoded list in `content-enricher.prompt.ts` + `kind` mapping in `build-db.ts` | Loaded dynamically via `GET /api/filters` |
| Seniority values | `SENIORITY` in `taxonomy.ts`, `filters.routes.ts`, `build-db.ts` (`filters.json`) | Loaded dynamically via `GET /api/filters` |
