# ---- Builder stage: compile native deps (better-sqlite3) ----
FROM node:22-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm config set strict-ssl false

RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npm i --ignore-scripts && \
    NODE_TLS_REJECT_UNAUTHORIZED=0 npm rebuild better-sqlite3

COPY tsconfig.json ./
COPY src/ ./src/

# ---- Runtime stage ----
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

# Create data directory for SQLite DB + metadata
RUN mkdir -p data/metadata data/runs

ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

EXPOSE 3100

CMD ["npx", "tsx", "src/index.ts"]
