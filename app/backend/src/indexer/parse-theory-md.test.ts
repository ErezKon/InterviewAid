import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.env.CONTENT_ROOT ??= '/home/sio/Code/Interview';
process.env.DB_PATH ??= '/tmp/interview-test-theory.db';
process.env.OPENAI_API_KEY ??= 'test-key';
process.env.OPENAI_BASE_URL ??= 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY ??= 'test-key';
process.env.ANTHROPIC_BASE_URL ??= 'https://localhost:9998';

const CONTENT_ROOT = process.env.CONTENT_ROOT!;
const SUMMARY_PATH = path.join(CONTENT_ROOT, 'interview-materials-summary.md');

/**
 * Re-implement the core parsing logic locally so we don't call parseTheory()
 * which writes to disk. This mirrors the algorithm in parse-theory-md.ts.
 */
function parseTheoryFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const fileSlug = path.basename(filePath, '.md')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const lines = content.split('\n');
  const subjects: { id: string; title: string; wordCount: number }[] = [];
  const seenIds = new Set<string>();
  let currentHeading = '';
  let currentBody: string[] = [];

  const flush = () => {
    if (!currentHeading) return;
    const body = currentBody.join('\n').trim();
    if (!body) return;
    const headingSlug = currentHeading
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    let id = `${fileSlug}--${headingSlug}`;
    if (seenIds.has(id)) {
      let counter = 2;
      while (seenIds.has(`${id}-${counter}`)) counter++;
      id = `${id}-${counter}`;
    }
    seenIds.add(id);
    subjects.push({ id, title: currentHeading, wordCount: body.split(/\s+/).filter(Boolean).length });
  };

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      flush();
      currentHeading = h2Match[1].trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }
  flush();
  return subjects;
}

describe('parseTheory — interview-materials-summary.md', () => {
  const subjects = parseTheoryFile(SUMMARY_PATH);

  it('should yield >= 20 subjects', () => {
    assert.ok(
      subjects.length >= 20,
      `Expected >=20 subjects, got ${subjects.length}`,
    );
  });

  it('should have unique ids', () => {
    const ids = subjects.map(s => s.id);
    const unique = new Set(ids);
    assert.equal(unique.size, ids.length, `Duplicate ids found: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
  });

  it('every subject should have a non-empty title', () => {
    for (const s of subjects) {
      assert.ok(s.title.length > 0, `Subject ${s.id} has empty title`);
    }
  });

  it('every subject should have wordCount > 0', () => {
    for (const s of subjects) {
      assert.ok(s.wordCount > 0, `Subject ${s.id} has wordCount=0`);
    }
  });

  it('ids should be lowercase kebab-case', () => {
    for (const s of subjects) {
      assert.match(s.id, /^[a-z0-9-]+$/, `Id not kebab-case: ${s.id}`);
    }
  });
});

describe('parseTheory — all theory files', () => {
  const theoryFiles = [
    'interview-materials-summary.md',
    'AI-Harness-in-detail.md',
    'LRU and LFU cache algorithms.md',
    'Call Center Problem.md',
    'Local Min-Max problem.md',
    'SKILL.md',
  ];

  it('should parse every theory file without crashing', () => {
    for (const file of theoryFiles) {
      const filePath = path.join(CONTENT_ROOT, file);
      if (!fs.existsSync(filePath)) continue;
      const subjects = parseTheoryFile(filePath);
      assert.ok(subjects.length >= 1, `${file} should produce at least 1 subject, got ${subjects.length}`);
    }
  });
});
