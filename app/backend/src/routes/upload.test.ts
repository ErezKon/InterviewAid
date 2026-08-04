import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';

// ---------------------------------------------------------------------------
// Test isolation: temp content root + temp DB
// ---------------------------------------------------------------------------
const TEST_DB = `/tmp/interview-test-upload-${crypto.randomUUID()}.db`;
const TEST_CONTENT_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-test-'));

process.env.CONTENT_ROOT = TEST_CONTENT_ROOT;
process.env.DB_PATH = TEST_DB;
process.env.PORT = '0';
process.env.OPENAI_API_KEY = 'test-key';
process.env.OPENAI_BASE_URL = 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY = 'test-key';
process.env.ANTHROPIC_BASE_URL = 'https://localhost:9998';

// Dynamic imports (env must be set first)
const express = (await import('express')).default;
const { initSchema, closeDb, getDb } = await import('../db/connection.js');
const { uploadRouter } = await import('./upload.routes.js');
const { AppError } = await import('../utils/errors.js');
const { ZodError } = await import('zod');
const { METADATA_DIR, MATERIAL_DIR, PROBLEMS_DIR } = await import('../config/paths.js');

let server: http.Server;
let baseUrl: string;

// METADATA_DIR is resolved relative to the source tree (backend/data/metadata/),
// NOT to CONTENT_ROOT. We backup and restore the real JSON files so tests don't
// pollute production metadata.
const subjectsJsonPath = path.join(METADATA_DIR, 'subjects.json');
const problemsJsonPath = path.join(METADATA_DIR, 'problems.json');
let subjectsBackup: Buffer | null = null;
let problemsBackup: Buffer | null = null;

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

function createTestApp() {
  const app = express();
  app.use('/api', uploadRouter);
  // Mirror the production error handler from index.ts
  app.use((err: any, _req: any, res: any, _next: any) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
      return;
    }
    if (err instanceof ZodError) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err.issues } });
      return;
    }
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: err.message ?? 'Bad request' } });
  });
  return app;
}

/** Build a FormData body for a material upload. */
function materialForm(
  files: { name: string; content: string }[],
  overrides: Record<string, string> = {},
): FormData {
  const fd = new FormData();
  for (const f of files) {
    fd.append('files', new Blob([f.content], { type: 'text/markdown' }), f.name);
  }
  fd.append('type', overrides.type ?? 'material');
  fd.append('title', overrides.title ?? 'Test Subject');
  if (overrides.mainSubject) fd.append('mainSubject', overrides.mainSubject);
  if (overrides.subSubject) fd.append('subSubject', overrides.subSubject);
  return fd;
}

/** Build a FormData body for a problem upload. */
function problemForm(
  files: { name: string; content: string }[],
  overrides: Record<string, string> = {},
): FormData {
  const fd = new FormData();
  for (const f of files) {
    fd.append('files', new Blob([f.content], { type: 'text/markdown' }), f.name);
  }
  fd.append('type', 'problem');
  fd.append('title', overrides.title ?? 'Test Problem');
  if (overrides.classification) fd.append('classification', overrides.classification);
  if (overrides.difficulty) fd.append('difficulty', overrides.difficulty);
  return fd;
}

async function post(apiPath: string, body: FormData): Promise<{ status: number; body: any }> {
  const res = await fetch(`${baseUrl}${apiPath}`, { method: 'POST', body });
  const json = await res.json();
  return { status: res.status, body: json };
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

describe('Upload API — POST /api/upload', () => {
  before(async () => {
    // Create required directories under temp content root
    fs.mkdirSync(path.join(TEST_CONTENT_ROOT, 'Data', 'Material'), { recursive: true });
    fs.mkdirSync(path.join(TEST_CONTENT_ROOT, 'Data', 'Problems', 'LeetCode'), { recursive: true });
    fs.mkdirSync(METADATA_DIR, { recursive: true });

    // Backup real metadata JSON files
    subjectsBackup = fs.existsSync(subjectsJsonPath) ? fs.readFileSync(subjectsJsonPath) : null;
    problemsBackup = fs.existsSync(problemsJsonPath) ? fs.readFileSync(problemsJsonPath) : null;

    initSchema();

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

    // Restore metadata JSON files
    if (subjectsBackup) fs.writeFileSync(subjectsJsonPath, subjectsBackup);
    else { try { fs.unlinkSync(subjectsJsonPath); } catch {} }
    if (problemsBackup) fs.writeFileSync(problemsJsonPath, problemsBackup);
    else { try { fs.unlinkSync(problemsJsonPath); } catch {} }

    // Cleanup temp files
    try { fs.unlinkSync(TEST_DB); } catch {}
    try { fs.unlinkSync(TEST_DB + '-wal'); } catch {}
    try { fs.unlinkSync(TEST_DB + '-shm'); } catch {}
    try { fs.rmSync(TEST_CONTENT_ROOT, { recursive: true }); } catch {}
  });

  // -----------------------------------------------------------------------
  // 1. Single material upload
  // -----------------------------------------------------------------------
  describe('Material upload (non-agentic)', () => {
    it('should upload a single material file, update subjects.json, and create a DB entry', async () => {
      const mdContent = '# Closures in JavaScript\n\nA closure is a function that captures its lexical scope.';
      const fd = materialForm(
        [{ name: 'closures.md', content: mdContent }],
        { mainSubject: 'JavaScript', title: 'Closures' },
      );

      const { status, body } = await post('/api/upload', fd);

      assert.equal(status, 200);
      assert.equal(body.data.type, 'material');
      assert.equal(body.data.filesProcessed, 1);
      assert.equal(body.data.items.length, 1);
      assert.ok(body.data.items[0].id, 'item should have an id');
      assert.ok(body.data.items[0].title, 'item should have a title');

      // Verify file written to disk
      const expectedDir = path.join(MATERIAL_DIR, 'JavaScript');
      const files = fs.readdirSync(expectedDir);
      assert.ok(files.some(f => f.includes('closures')), `Expected a closures file in ${expectedDir}`);

      // Verify subjects.json was updated — use the ID from the response to find the exact entry
      const uploadedId = body.data.items[0].id;
      const subjects = JSON.parse(fs.readFileSync(subjectsJsonPath, 'utf-8'));
      const entry = subjects.find((s: any) => s.id === uploadedId);
      assert.ok(entry, `subjects.json should have an entry with id=${uploadedId}`);
      assert.equal(entry.mainSubject, 'JavaScript');
      assert.ok(entry.bodyMd.includes('closure'), 'entry body should contain the uploaded content');

      // Verify DB entry
      const db = getDb();
      const row = db.prepare('SELECT * FROM subjects WHERE id = ?').get(uploadedId) as any;
      assert.ok(row, 'DB should have a subject row for the uploaded entry');
      assert.equal(row.main_subject, 'JavaScript');
      assert.ok(row.body_md.includes('closure'));
    });

    // -------------------------------------------------------------------
    // 2. Multiple material files under same subject
    // -------------------------------------------------------------------
    it('should upload multiple files under the same subject folder', async () => {
      const file1 = { name: 'promises.md', content: '# Promises\n\nA Promise represents an async operation.' };
      const file2 = { name: 'async-await.md', content: '# Async/Await\n\nAsync functions return promises.' };
      const fd = materialForm([file1, file2], { mainSubject: 'JavaScript', title: 'JS Async' });

      const { status, body } = await post('/api/upload', fd);

      assert.equal(status, 200);
      assert.equal(body.data.filesProcessed, 2);
      assert.equal(body.data.items.length, 2);

      // Both files should be in the same JavaScript folder
      const jsDir = path.join(MATERIAL_DIR, 'JavaScript');
      const files = fs.readdirSync(jsDir);
      assert.ok(files.some(f => f.includes('promises')), 'promises.md should exist');
      assert.ok(files.some(f => f.includes('async-await')), 'async-await.md should exist');
    });
  });

  // -----------------------------------------------------------------------
  // 3. Problem upload
  // -----------------------------------------------------------------------
  describe('Problem upload (non-agentic)', () => {
    it('should upload a problem file, update problems.json, and create a DB entry', async () => {
      const mdContent = [
        '# 999. Test Problem',
        '',
        '**Difficulty:** Medium',
        '',
        '## Problem Description',
        '',
        'Given an array of integers, find the pair with the largest sum.',
        '',
        '## Examples',
        '',
        'Input: [1, 2, 3]  Output: 5',
        '',
        '## Approach',
        '',
        'Sort the array and pick the last two elements.',
      ].join('\n');

      const fd = problemForm(
        [{ name: 'test-problem.md', content: mdContent }],
        { title: 'Test Problem', classification: 'arrays-hashing', difficulty: 'Medium' },
      );

      const { status, body } = await post('/api/upload', fd);

      assert.equal(status, 200);
      assert.equal(body.data.type, 'problem');
      assert.equal(body.data.filesProcessed, 1);
      assert.equal(body.data.items.length, 1);
      assert.ok(body.data.items[0].id, 'item should have a slug');

      // Verify file written to disk
      const files = fs.readdirSync(PROBLEMS_DIR);
      assert.ok(files.some(f => f.includes('test-problem')), 'problem file should exist on disk');

      // Verify problems.json was updated
      const problems = JSON.parse(fs.readFileSync(problemsJsonPath, 'utf-8'));
      const entry = problems.find((p: any) => p.title === 'Test Problem');
      assert.ok(entry, 'problems.json should contain the uploaded problem');
      assert.equal(entry.difficulty, 'Medium');
      assert.equal(entry.primaryTopic, 'arrays-hashing');
      assert.ok(entry.descriptionMd, 'problem should have parsed description');
      assert.ok(entry.hasSolution, 'problem should be marked as having a solution');

      // Verify DB entry
      const db = getDb();
      const row = db.prepare('SELECT * FROM problems WHERE title = ?').get('Test Problem') as any;
      assert.ok(row, 'DB should have a problem row');
      assert.equal(row.difficulty, 'Medium');
      assert.equal(row.primary_topic, 'arrays-hashing');
    });
  });

  // -----------------------------------------------------------------------
  // 4. Reject non-.md files
  // -----------------------------------------------------------------------
  describe('File validation', () => {
    it('should reject non-.md files', async () => {
      const fd = new FormData();
      fd.append('files', new Blob(['not markdown'], { type: 'text/plain' }), 'notes.txt');
      fd.append('type', 'material');
      fd.append('title', 'Invalid');

      const { status, body } = await post('/api/upload', fd);

      assert.ok(status >= 400, `Expected 4xx status, got ${status}`);
      assert.ok(body.error, 'Response should contain an error');
    });

    // -------------------------------------------------------------------
    // 5. Reject empty upload
    // -------------------------------------------------------------------
    it('should reject an upload with no files', async () => {
      const fd = new FormData();
      fd.append('type', 'material');
      fd.append('title', 'Empty');

      const { status, body } = await post('/api/upload', fd);

      assert.equal(status, 400);
      assert.equal(body.error.code, 'NO_FILES');
    });
  });

  // -----------------------------------------------------------------------
  // 6. Path traversal sanitization
  // -----------------------------------------------------------------------
  describe('Security', () => {
    it('should sanitize filenames to prevent path traversal', async () => {
      const maliciousName = '../../../etc/passwd.md';
      const fd = materialForm(
        [{ name: maliciousName, content: '# Safe Content\n\nThis should be saved safely.' }],
        { mainSubject: 'Security', title: 'Traversal Test' },
      );

      const { status, body } = await post('/api/upload', fd);

      assert.equal(status, 200, 'Upload should succeed with sanitized name');

      // The file should NOT have been written outside the subject directory
      const securityDir = path.join(MATERIAL_DIR, 'Security');
      const files = fs.readdirSync(securityDir);
      assert.ok(files.length > 0, 'File should be saved in the correct directory');

      // Ensure no file was created at the traversal target
      const traversalTarget = path.join(MATERIAL_DIR, '..', '..', '..', 'etc');
      assert.ok(!fs.existsSync(traversalTarget), 'No file should exist at traversal path');

      // The saved filename should be safe (basename only, no slashes)
      for (const f of files) {
        assert.ok(!f.includes('/'), 'Filename should not contain slashes');
        assert.ok(!f.includes('..'), 'Filename should not contain ..');
      }
    });
  });
});
