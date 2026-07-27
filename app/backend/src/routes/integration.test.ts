import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';

const TEST_DB = `/tmp/interview-test-integ-${crypto.randomUUID()}.db`;
process.env.CONTENT_ROOT = '/home/sio/Code/Interview';
process.env.DB_PATH = TEST_DB;
process.env.PORT = '0';
process.env.OPENAI_API_KEY = 'test-key';
process.env.OPENAI_BASE_URL = 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY = 'test-key';
process.env.ANTHROPIC_BASE_URL = 'https://localhost:9998';

const express = (await import('express')).default;
const cors = (await import('cors')).default;
const { initSchema, closeDb, getDb } = await import('../db/connection.js');
const { healthRouter } = await import('./health.routes.js');
const { filtersRouter } = await import('./filters.routes.js');
const { problemsRouter } = await import('./problems.routes.js');
const { subjectsRouter } = await import('./subjects.routes.js');
const { companiesRouter } = await import('./companies.routes.js');
const { modelsRouter } = await import('./models.routes.js');
const { sessionsRouter } = await import('./sessions.routes.js');
const { AppError } = await import('../utils/errors.js');
const { ZodError } = await import('zod');

let server: http.Server;
let baseUrl: string;

function createTestApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', healthRouter);
  app.use('/api', filtersRouter);
  app.use('/api', problemsRouter);
  app.use('/api', subjectsRouter);
  app.use('/api', companiesRouter);
  app.use('/api', modelsRouter);
  app.use('/api', sessionsRouter);
  app.use((_req: any, res: any) => {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
  });
  app.use((err: any, _req: any, res: any, _next: any) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
      return;
    }
    if (err instanceof ZodError) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err.issues } });
      return;
    }
    res.status(500).json({ error: { code: 'INTERNAL', message: 'Internal server error' } });
  });
  return app;
}

function seedTestData() {
  const db = getDb();
  db.prepare('INSERT OR IGNORE INTO topics (id, label, kind) VALUES (?, ?, ?)').run('arrays-hashing', 'Arrays & Hashing', 'algorithmic');
  db.prepare('INSERT OR IGNORE INTO topics (id, label, kind) VALUES (?, ?, ?)').run('trees', 'Trees & BST', 'algorithmic');
  db.prepare('INSERT OR IGNORE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)').run('google', 'Google', 2);
  db.prepare('INSERT OR IGNORE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)').run('amazon', 'Amazon', 1);

  const ins = db.prepare(`INSERT OR IGNORE INTO problems
    (slug, leetcode_id, title, difficulty, acceptance, url, file_path,
     primary_topic, seniority, interview_value, one_liner, has_solution,
     description_md, examples_md, solution_md, complexity_md, follow_ups_md, takeaway_md, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`);

  ins.run('two-sum', 1, 'Two Sum', 'Easy', 49.5, 'https://lc.com/two-sum', 'f.md',
    'arrays-hashing', 'junior', 5, 'Hash map', 1, 'Desc', 'Ex', 'Sol', 'O(n)', 'Follow', 'Take');
  ins.run('3sum', 15, '3Sum', 'Medium', 39.1, null, 'f.md',
    'arrays-hashing', 'mid', 5, 'Sort + 2ptr', 1, 'Desc', 'Ex', 'Sol', 'O(n²)', null, null);
  ins.run('hard-problem', 42, 'Trapping Rain', 'Hard', 60.0, null, 'f.md',
    'trees', 'senior', 5, 'Two pointers', 1, 'Desc', 'Ex', 'Sol', 'O(n)', null, null);

  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('two-sum', 'arrays-hashing');
  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('3sum', 'arrays-hashing');
  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('hard-problem', 'trees');
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('two-sum', 'google', 12.5);
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('two-sum', 'amazon', 10.0);
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('3sum', 'google', 9.0);

  try { db.exec('DELETE FROM problems_fts'); } catch {}
  try {
    db.exec(`INSERT INTO problems_fts (slug, title, one_liner, description_md, solution_md, patterns)
      SELECT slug, title, one_liner, description_md, solution_md,
        (SELECT GROUP_CONCAT(pattern, ', ') FROM problem_patterns WHERE problem_slug = problems.slug)
      FROM problems`);
  } catch {}
}

async function get(path: string): Promise<{ status: number; body: any }> {
  const res = await fetch(`${baseUrl}${path}`);
  const body = await res.json();
  return { status: res.status, body };
}

describe('Integration — API routes', () => {
  before(async () => {
    initSchema();
    seedTestData();
    const app = createTestApp();
    server = http.createServer(app);
    await new Promise<void>(resolve => {
      server.listen(0, () => {
        const addr = server.address() as { port: number };
        baseUrl = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
    closeDb();
    try { fs.unlinkSync(TEST_DB); } catch {}
    try { fs.unlinkSync(TEST_DB + '-wal'); } catch {}
    try { fs.unlinkSync(TEST_DB + '-shm'); } catch {}
  });

  // --- /api/health ---
  describe('GET /api/health', () => {
    it('should return 200 with status ok', async () => {
      const { status, body } = await get('/api/health');
      assert.equal(status, 200);
      assert.equal(body.data.status, 'ok');
      assert.ok('problemCount' in body.data);
      assert.ok('subjectCount' in body.data);
    });
  });

  // --- /api/filters ---
  describe('GET /api/filters', () => {
    it('should return filter options', async () => {
      const { status, body } = await get('/api/filters');
      assert.equal(status, 200);
      assert.ok(body.data.companies);
      assert.ok(body.data.difficulties);
      assert.ok(body.data.topics);
    });
  });

  // --- /api/problems ---
  describe('GET /api/problems', () => {
    it('should list problems', async () => {
      const { status, body } = await get('/api/problems');
      assert.equal(status, 200);
      assert.ok(Array.isArray(body.data));
      assert.equal(body.meta.total, 3);
    });

    it('should filter by difficulty', async () => {
      const { status, body } = await get('/api/problems?difficulties=Easy');
      assert.equal(status, 200);
      assert.equal(body.meta.total, 1);
      assert.equal(body.data[0].difficulty, 'Easy');
    });

    it('should filter by multiple difficulties', async () => {
      const { body } = await get('/api/problems?difficulties=Easy,Hard');
      assert.equal(body.meta.total, 2);
    });

    it('should filter by companies', async () => {
      const { body } = await get('/api/problems?companies=google');
      assert.ok(body.meta.total >= 1);
    });

    it('should paginate', async () => {
      const { body } = await get('/api/problems?page=1&pageSize=2');
      assert.equal(body.data.length, 2);
      assert.equal(body.meta.pageSize, 2);
      assert.equal(body.meta.page, 1);
    });
  });

  // --- /api/problems/:slug ---
  describe('GET /api/problems/:slug', () => {
    it('should return problem detail for valid slug', async () => {
      const { status, body } = await get('/api/problems/two-sum');
      assert.equal(status, 200);
      assert.equal(body.data.slug, 'two-sum');
      assert.equal(body.data.title, 'Two Sum');
      assert.ok(body.data.descriptionMd);
    });

    it('should return 404 for unknown slug', async () => {
      const { status } = await get('/api/problems/nonexistent-xyz');
      assert.equal(status, 404);
    });
  });

  // --- /api/problems/:slug/solution ---
  describe('GET /api/problems/:slug/solution', () => {
    it('should return solution fields', async () => {
      const { status, body } = await get('/api/problems/two-sum/solution');
      assert.equal(status, 200);
      assert.ok('solutionMd' in body.data);
    });
  });

  // --- /api/models ---
  describe('GET /api/models', () => {
    it('should return model registry', async () => {
      const { status, body } = await get('/api/models');
      assert.equal(status, 200);
      assert.ok(Array.isArray(body.data));
      assert.ok(body.data.length >= 2);
      assert.ok(body.meta.defaultModelId);
    });
  });

  // --- /api/companies ---
  describe('GET /api/companies', () => {
    it('should return companies', async () => {
      const { status, body } = await get('/api/companies');
      assert.equal(status, 200);
      assert.ok(Array.isArray(body.data));
    });

    it('should filter by query', async () => {
      const { body } = await get('/api/companies?q=goo');
      assert.ok(body.data.some((c: any) => c.slug === 'google'));
    });
  });

  // --- 404 ---
  describe('Unknown route', () => {
    it('should return 404 for unknown path', async () => {
      const { status, body } = await get('/api/nonexistent');
      assert.equal(status, 404);
      assert.equal(body.error.code, 'NOT_FOUND');
    });
  });
});
