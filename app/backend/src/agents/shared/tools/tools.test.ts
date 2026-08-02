import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

// Polyfill globalThis.crypto for langsmith/langchain uuid generation
if (!globalThis.crypto) (globalThis as any).crypto = crypto;

const TEST_DB = `/tmp/interview-test-tools-${crypto.randomUUID()}.db`;
process.env.CONTENT_ROOT = '/home/sio/Code/Interview';
process.env.DB_PATH = TEST_DB;
process.env.OPENAI_API_KEY = 'test-key';
process.env.OPENAI_BASE_URL = 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY = 'test-key';
process.env.ANTHROPIC_BASE_URL = 'https://localhost:9998';

const { getDb, initSchema, closeDb } = await import('../../../db/connection.js');
const { createSearchProblemsTool } = await import('./search-problems.tool.js');
const { createGetProblemTool } = await import('./get-problem.tool.js');
const { createGetProblemHintTool } = await import('./get-problem-hint.tool.js');
const { createListFiltersTool } = await import('./list-filters.tool.js');
const { createSearchSubjectsTool } = await import('./search-subjects.tool.js');
const { createGetSubjectTool } = await import('./get-subject.tool.js');

function seedForTools() {
  const db = getDb();
  db.prepare('INSERT OR IGNORE INTO topics (id, label, kind) VALUES (?, ?, ?)').run('arrays-hashing', 'Arrays & Hashing', 'algorithmic');
  db.prepare('INSERT OR IGNORE INTO topics (id, label, kind) VALUES (?, ?, ?)').run('trees', 'Trees & BST', 'algorithmic');
  db.prepare('INSERT OR IGNORE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)').run('google', 'Google', 3);
  db.prepare('INSERT OR IGNORE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)').run('amazon', 'Amazon', 2);

  const insertP = db.prepare(`INSERT OR IGNORE INTO problems
    (slug, leetcode_id, title, difficulty, acceptance, url, file_path,
     primary_topic, seniority, interview_value, one_liner, has_solution,
     description_md, examples_md, solution_md, complexity_md, follow_ups_md, takeaway_md, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`);

  insertP.run('two-sum', 1, 'Two Sum', 'Easy', 49.5, 'https://lc.com/two-sum', 'f.md',
    'arrays-hashing', 'junior', 5, 'Hash map lookup', 1, 'Desc md', 'Examples md', 'Solution md body', 'O(n)', 'Follow ups', 'Takeaway');
  insertP.run('3sum', 15, '3Sum', 'Medium', 39.1, null, 'f.md',
    'arrays-hashing', 'mid', 5, 'Sort + two ptrs', 1, 'Desc', 'Ex', 'Sort then 2ptr approach', 'O(n²)', '4Sum?', 'Ptrs');
  insertP.run('binary-tree-level', 102, 'Binary Tree Level Order', 'Medium', 64.5, null, 'f.md',
    'trees', 'junior', 3, 'BFS', 1, 'Level order desc', 'Ex', 'BFS sol', 'O(n)', null, null);

  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('two-sum', 'arrays-hashing');
  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('3sum', 'arrays-hashing');
  db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)').run('binary-tree-level', 'trees');
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('two-sum', 'google', 12.5);
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('two-sum', 'amazon', 10.0);
  db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)').run('3sum', 'google', 9.0);
  db.prepare('INSERT OR IGNORE INTO problem_patterns (problem_slug, pattern) VALUES (?, ?)').run('two-sum', 'hash map');

  // Subjects
  db.prepare(`INSERT OR IGNORE INTO subjects (id, title, source_file, heading_level, main_subject, sub_subject, primary_topic, key_concepts, word_count, body_md, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`)
    .run('test-subject-1', 'System Design Basics', 'Data/Material/Architectures/System Design/01-basics.md', 2, 'Architectures', 'System Design', 'system-design', '["scalability","caching"]', 500, 'Body markdown content for system design basics. This covers load balancers and databases.');

  // Subject with sections for section-extraction tests
  db.prepare(`INSERT OR IGNORE INTO subjects (id, title, source_file, heading_level, main_subject, sub_subject, primary_topic, key_concepts, word_count, body_md, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`)
    .run('test-agent-memory', 'Agent Memory', 'Data/Material/AI/Agent Memory.md', 2, 'AI', 'Agent Memory', 'ai-agents',
      '["short-term","long-term","episodic"]', 300,
      `## 1. Agent Memory\n\n### 1.1 Definition\n\nAgent memory is the mechanism by which AI agents store info.\n\n### 1.2 Types of Memory\n\nShort-Term, Long-Term, Episodic, Semantic, Procedural.\n\n### 1.3 Detailed Breakdown\n\n#### Short-Term Memory\nCurrent context window.\n\n#### Long-Term Memory\nPersistent storage.\n\n### 1.4 Implementation Patterns\n\nCode examples here.`);

  // FTS — ensure tables exist and populate
  try { db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS problems_fts USING fts5(slug UNINDEXED, title, one_liner, description_md, solution_md, patterns, tokenize='porter unicode61')`); } catch {}
  try { db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS subjects_fts USING fts5(id UNINDEXED, title, key_concepts, body_md, tokenize='porter unicode61')`); } catch {}
  try { db.exec('DELETE FROM problems_fts'); } catch {}
  db.exec(`INSERT INTO problems_fts (slug, title, one_liner, description_md, solution_md, patterns)
    SELECT slug, title, one_liner, description_md, solution_md,
      (SELECT GROUP_CONCAT(pattern, ', ') FROM problem_patterns WHERE problem_slug = problems.slug)
    FROM problems`);
  try { db.exec('DELETE FROM subjects_fts'); } catch {}
  db.exec(`INSERT INTO subjects_fts (id, title, key_concepts, body_md)
    SELECT id, title, key_concepts, body_md FROM subjects`);
}

describe('Agent tools', () => {
  before(() => {
    initSchema();
    seedForTools();
  });

  after(() => {
    closeDb();
    try { fs.unlinkSync(TEST_DB); } catch {}
    try { fs.unlinkSync(TEST_DB + '-wal'); } catch {}
    try { fs.unlinkSync(TEST_DB + '-shm'); } catch {}
  });

  describe('search_problems', () => {
    const tool = createSearchProblemsTool();

    it('should return valid JSON', async () => {
      const result = await tool.invoke({ query: 'sum' });
      const parsed = JSON.parse(result);
      assert.ok('count' in parsed);
      assert.ok('problems' in parsed);
      assert.ok(Array.isArray(parsed.problems));
    });

    it('should respect limit', async () => {
      const result = await tool.invoke({ limit: 1 });
      const parsed = JSON.parse(result);
      assert.ok(parsed.problems.length <= 1, `Expected <=1, got ${parsed.problems.length}`);
    });

    it('should filter by difficulty', async () => {
      const result = await tool.invoke({ difficulties: ['Easy'] });
      const parsed = JSON.parse(result);
      for (const p of parsed.problems) {
        assert.equal(p.difficulty, 'Easy');
      }
    });

    it('should return compact format without solution bodies', async () => {
      const result = await tool.invoke({});
      const parsed = JSON.parse(result);
      for (const p of parsed.problems) {
        assert.ok(!('solutionMd' in p), 'Should not include solutionMd');
        assert.ok(!('descriptionMd' in p), 'Should not include descriptionMd');
        assert.ok('slug' in p);
        assert.ok('title' in p);
        assert.ok('difficulty' in p);
      }
    });
  });

  describe('get_problem', () => {
    const tool = createGetProblemTool();

    it('should return valid JSON for a known slug', async () => {
      const result = await tool.invoke({ slug: 'two-sum' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.slug, 'two-sum');
      assert.equal(parsed.title, 'Two Sum');
    });

    it('should EXCLUDE solution by default', async () => {
      const result = await tool.invoke({ slug: 'two-sum' });
      const parsed = JSON.parse(result);
      assert.ok(!('solutionMd' in parsed), 'Solution should be excluded by default');
    });

    it('should include solution when explicitly requested', async () => {
      const result = await tool.invoke({ slug: 'two-sum', include: ['solution'] });
      const parsed = JSON.parse(result);
      assert.ok('solutionMd' in parsed, 'Solution should be included when requested');
    });

    it('should include description and examples by default', async () => {
      const result = await tool.invoke({ slug: 'two-sum' });
      const parsed = JSON.parse(result);
      assert.ok('descriptionMd' in parsed, 'Description should be included by default');
      assert.ok('examplesMd' in parsed, 'Examples should be included by default');
    });
  });

  describe('get_problem_hint', () => {
    const tool = createGetProblemHintTool();

    it('should return a level 1 hint', async () => {
      const result = await tool.invoke({ slug: 'two-sum', hintLevel: 1 });
      assert.ok(result.length > 0);
      assert.ok(result.includes('Two Sum'));
      assert.ok(result.includes('level 1'), 'Should mention level 1 instructions');
    });

    it('should return a level 2 hint with pattern info', async () => {
      const result = await tool.invoke({ slug: 'two-sum', hintLevel: 2 });
      assert.ok(result.includes('level 2'));
    });

    it('should return a level 3 hint with solution outline', async () => {
      const result = await tool.invoke({ slug: 'two-sum', hintLevel: 3 });
      assert.ok(result.includes('level 3'));
    });
  });

  describe('list_filters', () => {
    const tool = createListFiltersTool();

    it('should list companies', async () => {
      const result = await tool.invoke({ kind: 'companies' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.kind, 'companies');
      assert.ok(parsed.items.length > 0);
      assert.ok(parsed.items[0].slug);
      assert.ok(parsed.items[0].name);
    });

    it('should filter companies by query', async () => {
      const result = await tool.invoke({ kind: 'companies', q: 'goo' });
      const parsed = JSON.parse(result);
      assert.ok(parsed.items.length > 0);
      assert.ok(parsed.items.some((c: any) => c.slug === 'google'));
    });

    it('should list topics', async () => {
      const result = await tool.invoke({ kind: 'topics' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.kind, 'topics');
      assert.ok(parsed.items.length > 0);
    });

    it('should list difficulties', async () => {
      const result = await tool.invoke({ kind: 'difficulties' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.kind, 'difficulties');
      assert.equal(parsed.items.length, 3);
    });
  });

  describe('search_subjects', () => {
    const tool = createSearchSubjectsTool();

    it('should return valid JSON', async () => {
      const result = await tool.invoke({ query: 'system design' });
      const parsed = JSON.parse(result);
      assert.ok('count' in parsed);
      assert.ok('subjects' in parsed);
    });
  });

  describe('get_subject', () => {
    const tool = createGetSubjectTool();

    it('should return subject content', async () => {
      const result = await tool.invoke({ id: 'test-subject-1' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.id, 'test-subject-1');
      assert.equal(parsed.title, 'System Design Basics');
      assert.ok(parsed.bodyMd.length > 0);
    });

    it('should truncate body to maxChars', async () => {
      const result = await tool.invoke({ id: 'test-subject-1', maxChars: 50 });
      const parsed = JSON.parse(result);
      assert.ok(parsed.bodyMd.length <= 100, 'Body should be truncated');
    });

    it('should return sections list', async () => {
      const result = await tool.invoke({ id: 'test-agent-memory' });
      const parsed = JSON.parse(result);
      assert.ok(Array.isArray(parsed.sections), 'Should have sections array');
      assert.ok(parsed.sections.length > 0, 'Should list headings');
      assert.ok(parsed.sections.some((s: string) => s.includes('Types of Memory')));
      assert.equal(parsed.sectionExtracted, false);
      assert.equal(parsed.matchedSection, null);
    });

    it('should extract a single section by heading match', async () => {
      const result = await tool.invoke({ id: 'test-agent-memory', section: 'types of memory' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.sectionExtracted, true);
      assert.equal(parsed.matchedSection, '1.2 Types of Memory');
      assert.ok(parsed.bodyMd.includes('Short-Term'), 'Extracted section should contain its content');
      assert.ok(!parsed.bodyMd.includes('Implementation Patterns'), 'Should not contain later sections at same level');
      assert.ok(!parsed.bodyMd.includes('Definition'), 'Should not contain earlier sections');
    });

    it('should return full content when section does not match', async () => {
      const result = await tool.invoke({ id: 'test-agent-memory', section: 'nonexistent heading' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.sectionExtracted, false);
      assert.equal(parsed.matchedSection, null);
      assert.ok(parsed.bodyMd.includes('Definition'), 'Should contain full content');
      assert.ok(parsed.bodyMd.includes('Implementation Patterns'), 'Should contain full content');
    });

    it('should include sub-headings when extracting a section', async () => {
      const result = await tool.invoke({ id: 'test-agent-memory', section: 'detailed breakdown' });
      const parsed = JSON.parse(result);
      assert.equal(parsed.sectionExtracted, true);
      assert.equal(parsed.matchedSection, '1.3 Detailed Breakdown');
      assert.ok(parsed.bodyMd.includes('Short-Term Memory'), 'Should include sub-headings');
      assert.ok(parsed.bodyMd.includes('Long-Term Memory'), 'Should include sub-headings');
    });
  });
});
