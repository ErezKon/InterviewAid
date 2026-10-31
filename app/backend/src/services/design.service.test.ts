import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

if (!globalThis.crypto) (globalThis as any).crypto = crypto;

// Temp CONTENT_ROOT with a small fixture design bank
const ROOT = `/tmp/interview-test-design-${crypto.randomUUID()}`;
const DESIGN = path.join(ROOT, 'Data', 'Problems', 'Design');
process.env.CONTENT_ROOT = ROOT;
process.env.DB_PATH = path.join(ROOT, 'test.db');
process.env.OPENAI_API_KEY = 'test-key';
process.env.OPENAI_BASE_URL = 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY = 'test-key';
process.env.ANTHROPIC_BASE_URL = 'https://localhost:9998';

function designFile(o: { title: string; category?: string; difficulty: string; seniority: string; companies: string; tags: string; statement: string }) {
  return `# ${o.title}

${o.category ? `**Category:** ${o.category}\n` : ''}**Difficulty:** ${o.difficulty}
**Seniority:** ${o.seniority}
**Companies:** ${o.companies}
**Tags:** ${o.tags}
**Time:** 45 min

---

## Problem Statement

${o.statement}

## Clarifying Questions

- How many users? *Assume 10M DAU.*

## Requirements

### Functional
- Do the thing

### Non-Functional
- Low latency

## High-Level Design

SECRET-ARCHITECTURE-DETAILS

## Deep Dives

### Hot keys
Shard by key.

## Trade-offs

| Decision | A | B | Choice |
|---|---|---|---|
| DB | SQL | NoSQL | NoSQL |

## Follow-up Questions

1. What about multi-region?

## Common Mistakes

- Skipping estimation

## Key Takeaways

- Keep it simple
`;
}

function writeFixture(rel: string, content: string) {
  const full = path.join(DESIGN, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

writeFixture('System Design/URL Shortener.md', designFile({
  title: 'URL Shortener', category: 'System Design', difficulty: '🟢 Easy', seniority: 'mid',
  companies: 'Google, Amazon', tags: 'hashing, base62, caching',
  statement: 'Design a service like Bitly that turns long URLs into short aliases. It must handle 100M new URLs per day.',
}));
writeFixture('System Design/Distributed Message Queue.md', designFile({
  title: 'Distributed Message Queue', category: 'System Design', difficulty: '🔴 Hard', seniority: 'staff',
  companies: 'LinkedIn, Confluent', tags: 'replication, partitioning, kafka',
  statement: 'Design a durable distributed message queue similar to Kafka.',
}));
// No Category field → falls back to the folder name
writeFixture('Low-Level Design/Parking Lot.md', designFile({
  title: 'Parking Lot', difficulty: '🟡 Medium', seniority: 'junior',
  companies: 'Amazon, Uber', tags: 'oop, strategy-pattern',
  statement: 'Design the classes for a multi-level parking lot.',
}));
writeFixture('AI-ML System Design/RAG Document Q&A.md', designFile({
  title: 'RAG Document Q&A', category: 'AI/ML System Design', difficulty: '🟡 Medium', seniority: 'senior',
  companies: 'OpenAI, Microsoft', tags: 'rag, embeddings, vector-search',
  statement: 'Design a retrieval-augmented question answering system over company documents.',
}));
writeFixture('README.md', '# Design problems index\n');
writeFixture('System Design/_draft.md', '# Draft\n');

const express = (await import('express')).default;
const { parseDesignFile, listDesignFiles, resolveDesignCategory } = await import('../indexer/parse-design-md.js');
const svc = await import('./design.service.js');
const { designRouter } = await import('../routes/design.routes.js');
const { createSearchDesignProblemsTool } = await import('../agents/shared/tools/search-design-problems.tool.js');
const { createGetDesignProblemTool } = await import('../agents/shared/tools/get-design-problem.tool.js');
const { AppError } = await import('../utils/errors.js');

after(() => fs.rmSync(ROOT, { recursive: true, force: true }));

describe('parse-design-md', () => {
  it('lists problem files and skips README / _-prefixed files', () => {
    const files = listDesignFiles(DESIGN).map(f => path.basename(f));
    assert.equal(files.length, 4);
    assert.ok(!files.includes('README.md'));
    assert.ok(!files.includes('_draft.md'));
  });

  it('parses header fields and splits sections', () => {
    const p = parseDesignFile(path.join(DESIGN, 'System Design/URL Shortener.md'));
    assert.equal(p.slug, 'url-shortener');
    assert.equal(p.title, 'URL Shortener');
    assert.equal(p.category, 'system-design');
    assert.equal(p.categoryLabel, 'System Design');
    assert.equal(p.difficulty, 'Easy');
    assert.equal(p.seniority, 'mid');
    assert.deepEqual(p.companies, ['Google', 'Amazon']);
    assert.deepEqual(p.tags, ['hashing', 'base62', 'caching']);
    assert.equal(p.timeMinutes, 45);
    assert.equal(p.filePath, path.join('Data', 'Problems', 'Design', 'System Design', 'URL Shortener.md'));
    assert.match(p.statementMd ?? '', /Bitly/);
    assert.match(p.clarifyingMd ?? '', /10M DAU/);
    assert.match(p.requirementsMd ?? '', /### Functional/);
    assert.match(p.solutionMd ?? '', /## High-Level Design[\s\S]*## Deep Dives[\s\S]*## Trade-offs/);
    assert.doesNotMatch(p.solutionMd ?? '', /Problem Statement|Key Takeaways|Common Mistakes|Follow-up/);
    assert.match(p.followUpsMd ?? '', /multi-region/);
    assert.match(p.mistakesMd ?? '', /estimation/);
    assert.match(p.takeawaysMd ?? '', /simple/);
    assert.ok(p.summary.startsWith('Design a service like Bitly'));
    assert.equal(p.sections[0], 'Problem Statement');
  });

  it('falls back to the folder for the category and slugifies "&"', () => {
    assert.equal(parseDesignFile(path.join(DESIGN, 'Low-Level Design/Parking Lot.md')).category, 'oop-design');
    const rag = parseDesignFile(path.join(DESIGN, 'AI-ML System Design/RAG Document Q&A.md'));
    assert.equal(rag.category, 'ai-ml-system-design');
    assert.equal(rag.slug, 'rag-document-q-and-a');
  });

  it('resolves category aliases', () => {
    assert.equal(resolveDesignCategory('LLD', 'x').id, 'oop-design');
    assert.equal(resolveDesignCategory('Frontend', 'x').id, 'frontend-system-design');
    assert.equal(resolveDesignCategory(undefined, 'unknown').id, 'system-design');
  });
});

describe('design.service', () => {
  it('loads all problems ordered by category, then difficulty', () => {
    const slugs = svc.loadDesignProblems().map(p => p.slug);
    assert.deepEqual(slugs, ['url-shortener', 'distributed-message-queue', 'parking-lot', 'rag-document-q-and-a']);
  });

  it('filters by category, difficulty, seniority and company', () => {
    assert.equal(svc.queryDesignProblems({ categories: ['system-design'] }).total, 2);
    assert.equal(svc.queryDesignProblems({ categories: ['Low-Level Design'] }).total, 1);
    assert.deepEqual(svc.queryDesignProblems({ difficulties: ['Hard'] }).items.map(i => i.slug), ['distributed-message-queue']);
    assert.deepEqual(svc.queryDesignProblems({ seniority: 'senior' }).items.map(i => i.slug), ['rag-document-q-and-a']);
    assert.equal(svc.queryDesignProblems({ companies: ['amazon'] }).total, 2);
    assert.equal(svc.queryDesignProblems({ tags: ['kafka'] }).total, 1);
  });

  it('free-text search ranks title matches first and requires every token', () => {
    const { items } = svc.queryDesignProblems({ q: 'kafka queue' });
    assert.deepEqual(items.map(i => i.slug), ['distributed-message-queue']);
    assert.equal(svc.queryDesignProblems({ q: 'kafka parking' }).total, 0);
    assert.equal(svc.queryDesignProblems({ q: 'rag' }).items[0].slug, 'rag-document-q-and-a');
  });

  it('list items never contain solution bodies', () => {
    const item = svc.queryDesignProblems({}).items[0] as Record<string, unknown>;
    assert.equal(item.solutionMd, undefined);
    assert.equal(item.statementMd, undefined);
    assert.ok(item.summary);
  });

  it('supports exclusion, pagination and random picks', () => {
    assert.equal(svc.queryDesignProblems({ excludeSlugs: ['url-shortener'] }).total, 3);
    const page2 = svc.queryDesignProblems({ page: 2, pageSize: 3 });
    assert.equal(page2.items.length, 1);
    assert.equal(page2.total, 4);
    assert.equal(svc.getRandomDesignProblem({ categories: ['oop-design'] })?.slug, 'parking-lot');
    assert.equal(svc.getRandomDesignProblem({ categories: ['frontend-system-design'] }), null);
  });

  it('returns detail with raw markdown and related problems of the same category', () => {
    const d = svc.getDesignProblemBySlug('url-shortener');
    assert.match(d.rawMarkdown, /^# URL Shortener/);
    assert.deepEqual(d.related.map(r => r.slug), ['distributed-message-queue']);
    assert.throws(() => svc.getDesignProblemBySlug('nope'), (e: any) => e instanceof AppError && e.statusCode === 404);
    assert.equal(svc.designProblemExists('parking-lot'), true);
    assert.equal(svc.designProblemExists('nope'), false);
  });

  it('summarizes categories with difficulty counts', () => {
    const cats = svc.getDesignCategories();
    assert.deepEqual(cats.map(c => c.id), ['system-design', 'oop-design', 'frontend-system-design', 'ai-ml-system-design']);
    assert.deepEqual(cats[0].difficulties, { Easy: 1, Medium: 0, Hard: 1 });
    assert.equal(cats[2].count, 0);
  });

  it('picks up new and modified files without a restart', () => {
    writeFixture('Frontend System Design/Image Carousel.md', designFile({
      title: 'Image Carousel', category: 'Frontend System Design', difficulty: '🟢 Easy', seniority: 'junior',
      companies: 'Meta', tags: 'accessibility', statement: 'Design an image carousel component.',
    }));
    assert.equal(svc.loadDesignProblems().length, 5);
    assert.equal(svc.getDesignCategories()[2].count, 1);
    fs.unlinkSync(path.join(DESIGN, 'Frontend System Design/Image Carousel.md'));
    assert.equal(svc.loadDesignProblems().length, 4);
  });
});

describe('design routes', () => {
  let server: http.Server;
  let baseUrl: string;
  const get = async (p: string) => {
    const res = await fetch(`${baseUrl}${p}`);
    return { status: res.status, body: await res.json() as any };
  };

  before(async () => {
    const app = express();
    app.use('/api', designRouter);
    app.use((err: any, _req: any, res: any, _next: any) => {
      res.status(err instanceof AppError ? err.statusCode : 400).json({ error: { message: String(err.message) } });
    });
    server = http.createServer(app);
    await new Promise<void>(resolve => server.listen(0, () => {
      baseUrl = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
      resolve();
    }));
  });

  after(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
  });

  it('GET /api/design lists with meta and CSV filters', async () => {
    const { status, body } = await get('/api/design?categories=system-design,oop-design&difficulties=Easy,Medium');
    assert.equal(status, 200);
    assert.deepEqual(body.data.map((d: any) => d.slug), ['url-shortener', 'parking-lot']);
    assert.equal(body.meta.total, 2);
    assert.deepEqual(body.meta.appliedFilters.categories, ['system-design', 'oop-design']);
  });

  it('GET /api/design/categories', async () => {
    const { status, body } = await get('/api/design/categories');
    assert.equal(status, 200);
    assert.equal(body.data.length, 4);
  });

  it('GET /api/design/random respects filters and 404s when empty', async () => {
    assert.equal((await get('/api/design/random?difficulties=Hard')).body.data.slug, 'distributed-message-queue');
    assert.equal((await get('/api/design/random?categories=frontend-system-design')).status, 404);
  });

  it('GET /api/design/:slug returns detail or 404', async () => {
    const ok = await get('/api/design/parking-lot');
    assert.equal(ok.status, 200);
    assert.equal(ok.body.data.category, 'oop-design');
    assert.ok(ok.body.data.solutionMd);
    assert.equal((await get('/api/design/missing')).status, 404);
  });
});

describe('design agent tools', () => {
  it('search_design_problems returns compact cards', async () => {
    const out = JSON.parse(await createSearchDesignProblemsTool().invoke({ categories: ['system-design'], limit: 1 }) as string);
    assert.equal(out.count, 1);
    assert.equal(out.total, 2);
    assert.deepEqual(Object.keys(out.designProblems[0]).sort(),
      ['category', 'difficulty', 'seniority', 'slug', 'summary', 'timeMinutes', 'title', 'topCompanies']);
  });

  it('get_design_problem hides the solution by default', async () => {
    const tool = createGetDesignProblemTool();
    const def = JSON.parse(await tool.invoke({ slug: 'url-shortener' }) as string);
    assert.ok(def.statementMd);
    assert.ok(def.requirementsMd);
    assert.equal(def.solutionMd, undefined);
    assert.doesNotMatch(JSON.stringify(def), /SECRET-ARCHITECTURE/);

    const withSol = JSON.parse(await tool.invoke({ slug: 'url-shortener', include: ['solution', 'takeaways'] }) as string);
    assert.match(withSol.solutionMd, /SECRET-ARCHITECTURE/);
    assert.ok(withSol.takeawaysMd);
    assert.equal(withSol.statementMd, undefined);
  });
});
