# Interview Prep Platform

A monorepo with a Node/TypeScript backend (REST API over an LLM-classified SQLite index of 3,415 LeetCode problems and theory markdown) and an Angular 19 frontend (Angular Material + NgRx Signal Store) offering metadata filtering, streaming chat with AI agents, mock interviews, and subject quizzes.

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

### 3. Run the indexer (one-time, ~10–20 min for classification)

```bash
npm run index:parse       # Parse 3,415 problem .md + theory docs → JSON
npm run index:classify    # LLM classification (needs OPENAI_API_KEY or OAuth fallback) — resumable
npm run index:build       # Build SQLite DB + FTS5 indexes

# Or all at once:
npm run index:all
```

The indexer outputs are committed so the LLM classification pass only needs to run once. Use `--force` flag to re-classify.

### 4. Start development servers

```bash
# Terminal 1 — Backend (http://localhost:3100)
npm run dev:backend

# Terminal 2 — Frontend (http://localhost:4200, proxies /api → backend)
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
| `frontend` | `nginx:alpine` | 4200→80 | Angular production build, `/api` proxied to backend |

### Volumes

- `../:/content:ro` — mounts the Interview repo root as read-only content for the backend
- `./backend/data:/app/data` — persists SQLite DB and metadata between container restarts

### Stop & Clean

```bash
docker compose down          # stop containers
docker compose down -v       # stop + remove volumes
docker compose build --no-cache  # full rebuild
```

---

## Architecture

```
/home/sio/Code/Interview/
├── LeetCode/                        # 3,415 problem markdown files (read-only)
├── *.md                             # Theory files (read-only)
├── System Design Plan/              # Design & implementation plan
└── app/
    ├── package.json                 # npm workspaces root
    ├── docker-compose.yml           # Docker orchestration
    ├── README.md                    # This file
    ├── backend/
    │   ├── Dockerfile
    │   ├── src/
    │   │   ├── index.ts             # Express bootstrap
    │   │   ├── config/              # env, models, paths
    │   │   ├── db/                  # SQLite connection, schema, queries
    │   │   ├── indexer/             # parse → classify → build pipeline
    │   │   ├── routes/              # REST API endpoints
    │   │   ├── services/            # Business logic layer
    │   │   ├── agents/              # LangChain agents (problem-finder, mock-interview, subject-quiz)
    │   │   ├── llm/                 # Anthropic Vertex client
    │   │   ├── types/               # Zod schemas & TypeScript types
    │   │   └── utils/               # Logger, errors, colors
    │   └── data/                    # Generated: interview.db, metadata/*.json
    └── frontend/
        ├── Dockerfile
        ├── nginx.conf               # Production nginx config with /api proxy
        └── src/app/
            ├── core/                # API services, models, shared services
            ├── state/               # NgRx Signal Stores
            ├── features/            # Browse, problem detail, subjects, chat
            └── layout/              # Shell, nav (in app.component)
```

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
| `POST` | `/api/chat` | Send message (supports SSE streaming) |
| `GET` | `/api/threads` | List chat threads |
| `GET` | `/api/threads/:id` | Thread with messages |
| `DELETE` | `/api/threads/:id` | Delete thread |
| `POST` | `/api/threads/:id/title` | Update thread title |
| `GET` | `/api/interview-sessions/:threadId` | Mock interview session state |

### Chat Modes

- **Auto** — keyword router selects the best agent
- **Find Problems** — AI coach finds matching problems by company/role/topic
- **Mock Interview** — multi-step interview simulation with hints and feedback
- **Subject Quiz** — generates questions from theory material with reference quotes
- **Content Enricher** — scans problem markdown files, enriches insufficient ones with descriptions/examples/solutions, and classifies topics in metadata

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
# Backend unit + integration tests
npm run test:backend

# Frontend tests
cd frontend && npm test
```
