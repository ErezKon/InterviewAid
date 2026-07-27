import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

const TEST_DB = `/tmp/interview-test-${crypto.randomUUID()}.db`;
process.env.CONTENT_ROOT = '/home/sio/Code/Interview';
process.env.DB_PATH = TEST_DB;
process.env.OPENAI_API_KEY = 'test-key';
process.env.OPENAI_BASE_URL = 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY = 'test-key';
process.env.ANTHROPIC_BASE_URL = 'https://localhost:9998';

const { getDb, initSchema, closeDb } = await import('../db/connection.js');
const { queryProblems, getProblemBySlug, getRandomProblem, getProblemSolution } = await import('./problem.service.js');

function seed() {
  const db = getDb();

  // Insert topics
  const insertTopic = db.prepare('INSERT OR IGNORE INTO topics (id, label, kind) VALUES (?, ?, ?)');
  insertTopic.run('arrays-hashing', 'Arrays & Hashing', 'algorithmic');
  insertTopic.run('dynamic-programming', 'Dynamic Programming', 'algorithmic');
  insertTopic.run('trees', 'Trees & BST', 'algorithmic');
  insertTopic.run('system-design', 'System Design', 'design');

  // Insert companies
  const insertCompany = db.prepare('INSERT OR IGNORE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)');
  insertCompany.run('google', 'Google', 8);
  insertCompany.run('amazon', 'Amazon', 6);
  insertCompany.run('meta', 'Meta', 4);
  insertCompany.run('dell', 'Dell', 2);

  // Insert problems
  const insertProblem = db.prepare(`INSERT OR IGNORE INTO problems
    (slug, leetcode_id, title, difficulty, acceptance, url, file_path,
     primary_topic, seniority, interview_value, one_liner, has_solution,
     description_md, examples_md, solution_md, complexity_md, follow_ups_md, takeaway_md, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`);

  const problems = [
    ['two-sum', 1, 'Two Sum', 'Easy', 49.5, 'https://lc.com/two-sum', 'LeetCode/Problems/Two Sum.md', 'arrays-hashing', 'junior', 5, 'Classic hash map lookup', 1, 'Find two nums', 'Ex 1', 'Use a map', 'O(n)', 'Three sum?', 'Hash maps'],
    ['3sum', 15, '3Sum', 'Medium', 39.1, 'https://lc.com/3sum', 'LeetCode/Problems/3Sum.md', 'arrays-hashing', 'mid', 5, 'Sort + two pointers', 1, 'Find triplets', 'Ex 1', 'Sort then 2ptr', 'O(n²)', '4Sum?', 'Pointer technique'],
    ['merge-intervals', 56, 'Merge Intervals', 'Medium', 46.8, null, 'LeetCode/Problems/Merge Intervals.md', 'arrays-hashing', 'mid', 4, 'Sort by start', 1, 'Merge overlapping', 'Ex 1', 'Sort + sweep', 'O(n log n)', null, 'Intervals'],
    ['binary-tree-level-order', 102, 'Binary Tree Level Order Traversal', 'Medium', 64.5, null, 'f.md', 'trees', 'junior', 3, 'BFS queue', 1, 'Level order', 'Ex', 'BFS', 'O(n)', null, null],
    ['trapping-rain-water', 42, 'Trapping Rain Water', 'Hard', 60.2, null, 'f.md', 'dynamic-programming', 'senior', 5, 'Two pointer or DP', 1, 'Trap water', 'Ex', 'DP or 2ptr', 'O(n)', null, null],
    ['coin-change', 322, 'Coin Change', 'Medium', 42.7, null, 'f.md', 'dynamic-programming', 'mid', 4, 'Bottom-up DP', 1, 'Min coins', 'Ex', 'DP table', 'O(n*m)', null, null],
    ['valid-parentheses', 20, 'Valid Parentheses', 'Easy', 40.0, null, 'f.md', 'arrays-hashing', 'junior', 3, 'Stack based', 0, 'Check parens', 'Ex', null, null, null, null],
    ['lru-cache', 146, 'LRU Cache', 'Medium', 41.0, null, 'f.md', 'system-design', 'senior', 5, 'Doubly linked list + map', 1, 'Design LRU', 'Ex', 'DLL + HashMap', 'O(1)', 'LFU?', 'Design'],
    ['word-search', 79, 'Word Search', 'Medium', 42.5, null, 'f.md', 'trees', 'mid', 3, 'Backtracking DFS', 1, 'Search word', 'Ex', 'DFS grid', 'O(mn*4^L)', null, null],
    ['climbing-stairs', 70, 'Climbing Stairs', 'Easy', 52.1, null, 'f.md', 'dynamic-programming', 'junior', 2, 'Fibonacci variant', 0, 'Count ways', 'Ex', null, null, null, null],
    ['median-two-sorted', 4, 'Median of Two Sorted Arrays', 'Hard', 38.0, null, 'f.md', 'arrays-hashing', 'staff', 5, 'Binary search partition', 1, 'Find median', 'Ex', 'Binary search', 'O(log(m+n))', null, null],
    ['design-twitter', 355, 'Design Twitter', 'Medium', 37.0, null, 'f.md', 'system-design', 'senior', 4, 'OOP + heap merge', 1, 'Design Twitter', 'Ex', 'Priority queue merge', 'O(k log n)', null, 'Design'],
    ['house-robber', 198, 'House Robber', 'Medium', 49.4, null, 'f.md', 'dynamic-programming', 'junior', 4, 'DP skip/take', 1, 'Max rob', 'Ex', 'DP bottom up', 'O(n)', 'Circular?', null],
    ['number-of-islands', 200, 'Number of Islands', 'Medium', 57.3, null, 'f.md', 'trees', 'mid', 4, 'BFS/DFS flood fill', 1, 'Count islands', 'Ex', 'DFS flood', 'O(mn)', null, null],
    ['serialize-binary-tree', 297, 'Serialize and Deserialize Binary Tree', 'Hard', 55.0, null, 'f.md', 'trees', 'senior', 5, 'Preorder + null markers', 1, 'Serialize tree', 'Ex', 'Preorder DFS', 'O(n)', null, null],
    ['longest-increasing-subseq', 300, 'Longest Increasing Subsequence', 'Medium', 53.5, null, 'f.md', 'dynamic-programming', 'mid', 4, 'Patience sort or DP', 1, 'LIS length', 'Ex', 'DP or binary search', 'O(n log n)', null, null],
    ['task-scheduler', 621, 'Task Scheduler', 'Medium', 57.0, null, 'f.md', 'arrays-hashing', 'mid', 3, 'Greedy frequency', 1, 'Min intervals', 'Ex', 'Count idle', 'O(n)', null, null],
    ['system-design-basics', null, 'System Design Basics', 'Medium', null, null, 'f.md', 'system-design', 'staff', 5, 'Foundational concepts', 0, 'Basics', 'Ex', null, null, null, null],
    ['rotate-image', 48, 'Rotate Image', 'Medium', 72.4, null, 'f.md', 'arrays-hashing', 'junior', 2, 'Transpose + reverse', 1, 'Rotate 90', 'Ex', 'In-place rotate', 'O(n²)', null, null],
    ['edit-distance', 72, 'Edit Distance', 'Medium', 54.8, null, 'f.md', 'dynamic-programming', 'senior', 5, '2D DP table', 1, 'Min edits', 'Ex', 'DP 2D', 'O(mn)', null, null],
  ];

  const insertPT = db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)');
  const insertPC = db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)');
  const insertPP = db.prepare('INSERT OR IGNORE INTO problem_patterns (problem_slug, pattern) VALUES (?, ?)');

  const tx = db.transaction(() => {
    for (const p of problems) {
      insertProblem.run(...p);
    }

    // Topic assignments
    const topicMap: Record<string, string[]> = {
      'two-sum': ['arrays-hashing'],
      '3sum': ['arrays-hashing'],
      'merge-intervals': ['arrays-hashing'],
      'binary-tree-level-order': ['trees'],
      'trapping-rain-water': ['dynamic-programming', 'arrays-hashing'],
      'coin-change': ['dynamic-programming'],
      'valid-parentheses': ['arrays-hashing'],
      'lru-cache': ['system-design'],
      'word-search': ['trees'],
      'climbing-stairs': ['dynamic-programming'],
      'median-two-sorted': ['arrays-hashing'],
      'design-twitter': ['system-design'],
      'house-robber': ['dynamic-programming'],
      'number-of-islands': ['trees'],
      'serialize-binary-tree': ['trees'],
      'longest-increasing-subseq': ['dynamic-programming'],
      'task-scheduler': ['arrays-hashing'],
      'system-design-basics': ['system-design'],
      'rotate-image': ['arrays-hashing'],
      'edit-distance': ['dynamic-programming'],
    };
    for (const [slug, topics] of Object.entries(topicMap)) {
      for (const t of topics) insertPT.run(slug, t);
    }

    // Company assignments
    const companyMap: Record<string, [string, number][]> = {
      'two-sum': [['google', 12.5], ['amazon', 10.0], ['meta', 8.0], ['dell', 2.0]],
      '3sum': [['google', 9.0], ['amazon', 7.0], ['meta', 6.0]],
      'trapping-rain-water': [['google', 15.0], ['amazon', 11.0]],
      'lru-cache': [['amazon', 14.0], ['google', 10.0], ['meta', 7.0]],
      'coin-change': [['amazon', 5.0], ['dell', 1.5]],
      'merge-intervals': [['google', 8.0], ['meta', 3.0]],
      'number-of-islands': [['amazon', 9.0], ['google', 6.0]],
      'edit-distance': [['google', 4.0]],
    };
    for (const [slug, companies] of Object.entries(companyMap)) {
      for (const [comp, freq] of companies) insertPC.run(slug, comp, freq);
    }

    // Patterns
    const patternMap: Record<string, string[]> = {
      'two-sum': ['hash map'],
      '3sum': ['sort + two pointers'],
      'trapping-rain-water': ['two pointers', 'dynamic programming'],
      'coin-change': ['bottom-up DP'],
      'lru-cache': ['doubly linked list'],
    };
    for (const [slug, patterns] of Object.entries(patternMap)) {
      for (const p of patterns) insertPP.run(slug, p);
    }

    // Build FTS — ensure tables exist
    try { db.exec(`CREATE VIRTUAL TABLE IF NOT EXISTS problems_fts USING fts5(slug UNINDEXED, title, one_liner, description_md, solution_md, patterns, tokenize='porter unicode61')`); } catch {}
    try { db.exec('DELETE FROM problems_fts'); } catch {}
    db.exec(`INSERT INTO problems_fts (slug, title, one_liner, description_md, solution_md, patterns)
      SELECT slug, title, one_liner, description_md, solution_md,
        (SELECT GROUP_CONCAT(pattern, ', ') FROM problem_patterns WHERE problem_slug = problems.slug)
      FROM problems`);
  });
  tx();
}

describe('problem.service', () => {
  before(() => {
    initSchema();
    seed();
  });

  after(() => {
    closeDb();
    try { fs.unlinkSync(TEST_DB); } catch {}
    try { fs.unlinkSync(TEST_DB + '-wal'); } catch {}
    try { fs.unlinkSync(TEST_DB + '-shm'); } catch {}
  });

  describe('queryProblems', () => {
  it('should return all problems with no filters', () => {
    const { items, total } = queryProblems({});
    assert.equal(total, 20);
    assert.ok(items.length <= 25);
  });

  it('should filter by difficulty = Easy', () => {
    const { items, total } = queryProblems({ difficulties: ['Easy'] });
    assert.ok(total > 0, 'Should find Easy problems');
    for (const p of items) assert.equal(p.difficulty, 'Easy');
  });

  it('should filter by difficulty = Hard', () => {
    const { items, total } = queryProblems({ difficulties: ['Hard'] });
    assert.ok(total > 0, 'Should find Hard problems');
    for (const p of items) assert.equal(p.difficulty, 'Hard');
  });

  it('should filter by multiple difficulties', () => {
    const { items } = queryProblems({ difficulties: ['Easy', 'Hard'] });
    for (const p of items) {
      assert.ok(['Easy', 'Hard'].includes(p.difficulty), `Unexpected difficulty: ${p.difficulty}`);
    }
  });

  it('should filter by topics', () => {
    const { items } = queryProblems({ topics: ['dynamic-programming'] });
    assert.ok(items.length > 0);
    for (const p of items) {
      assert.ok(
        p.topics.includes('dynamic-programming') || p.primaryTopic === 'dynamic-programming',
        `${p.slug} should have topic dynamic-programming`,
      );
    }
  });

  it('should filter by companies', () => {
    const { items } = queryProblems({ companies: ['dell'] });
    assert.ok(items.length > 0, 'Should find problems tagged Dell');
  });

  it('should filter by seniority', () => {
    const { items } = queryProblems({ seniority: 'senior' });
    assert.ok(items.length > 0);
    for (const p of items) assert.equal(p.seniority, 'senior');
  });

  it('should filter by minInterviewValue', () => {
    const { items } = queryProblems({ minInterviewValue: 5 });
    assert.ok(items.length > 0);
    for (const p of items) {
      assert.ok(p.interviewValue! >= 5, `${p.slug} interviewValue=${p.interviewValue}`);
    }
  });

  it('should support matchMode=all for topics', () => {
    const { items } = queryProblems({
      topics: ['dynamic-programming', 'arrays-hashing'],
      matchMode: 'all',
    });
    // Only trapping-rain-water has both
    for (const p of items) {
      assert.ok(
        p.topics.includes('dynamic-programming') && p.topics.includes('arrays-hashing'),
        `${p.slug} should have both topics`,
      );
    }
  });

  it('should support matchMode=any (default)', () => {
    const { items } = queryProblems({
      topics: ['dynamic-programming', 'system-design'],
      matchMode: 'any',
    });
    assert.ok(items.length > 0);
  });

  it('should support FTS query', () => {
    const { items } = queryProblems({ q: 'hash map' });
    assert.ok(items.length > 0, 'FTS for "hash map" should find results');
  });

  it('should paginate correctly', () => {
    const page1 = queryProblems({ page: 1, pageSize: 5 });
    const page2 = queryProblems({ page: 2, pageSize: 5 });
    assert.equal(page1.items.length, 5);
    assert.equal(page2.items.length, 5);
    const slugs1 = page1.items.map(p => p.slug);
    const slugs2 = page2.items.map(p => p.slug);
    assert.ok(!slugs1.some(s => slugs2.includes(s)), 'Pages should not overlap');
  });

  it('should sort by title asc', () => {
    const { items } = queryProblems({ sort: 'title', order: 'asc', pageSize: 100 });
    assert.ok(items.length > 1, 'Need multiple items to test sort');
    // SQLite uses BINARY collation by default — verify items are returned in a consistent sorted order
    for (let i = 1; i < items.length; i++) {
      assert.ok(items[i].title >= items[i - 1].title,
        `${items[i].title} should come after ${items[i - 1].title} (binary collation)`);
    }
  });

  it('should return empty for impossible filters', () => {
    const { items, total } = queryProblems({
      companies: ['nonexistent-company-xyz'],
    });
    assert.equal(total, 0);
    assert.equal(items.length, 0);
  });

  it('should hydrate topics and companies on list items', () => {
    const { items } = queryProblems({ pageSize: 5 });
    for (const p of items) {
      assert.ok(Array.isArray(p.topics));
      assert.ok(Array.isArray(p.companies));
      assert.ok(Array.isArray(p.patterns));
    }
  });
  });

  describe('getProblemBySlug', () => {
  it('should return full detail for a valid slug', () => {
    const detail = getProblemBySlug('two-sum');
    assert.equal(detail.slug, 'two-sum');
    assert.equal(detail.title, 'Two Sum');
    assert.equal(detail.difficulty, 'Easy');
    assert.ok(detail.descriptionMd);
    assert.ok(Array.isArray(detail.topics));
    assert.ok(Array.isArray(detail.relatedSlugs));
  });

  it('should throw NotFoundError for unknown slug', () => {
    assert.throws(
      () => getProblemBySlug('nonexistent-problem-xyz'),
      (err: any) => err.constructor.name === 'NotFoundError',
    );
  });
  });

  describe('getProblemSolution', () => {
  it('should return solution fields', () => {
    const sol = getProblemSolution('two-sum');
    assert.ok('solutionMd' in sol);
    assert.ok('complexityMd' in sol);
  });
  });

  describe('getRandomProblem', () => {
  it('should return a random problem', () => {
    const p = getRandomProblem({});
    assert.ok(p, 'should not be null');
    assert.ok(p!.slug);
    assert.ok(p!.title);
  });

  it('should respect difficulty filter', () => {
    const p = getRandomProblem({ difficulties: ['Easy'] });
    assert.ok(p, 'should not be null');
    assert.equal(p!.difficulty, 'Easy');
  });
  });
});
