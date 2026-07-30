import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';

// Set env before any config imports
process.env.CONTENT_ROOT ??= '/home/sio/Code/Interview';
process.env.DB_PATH ??= '/tmp/interview-test-parse.db';
process.env.OPENAI_API_KEY ??= 'test-key';
process.env.OPENAI_BASE_URL ??= 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY ??= 'test-key';
process.env.ANTHROPIC_BASE_URL ??= 'https://localhost:9998';

const { parseSingleFile } = await import('./parse-problem-md.js');

const CONTENT_ROOT = process.env.CONTENT_ROOT!;
const THREE_SUM_PATH = path.join(CONTENT_ROOT, 'Data', 'Problems', 'LeetCode', '3Sum.md');

describe('parseSingleFile', () => {
  let result: ReturnType<typeof parseSingleFile>;

  before(() => {
    result = parseSingleFile(THREE_SUM_PATH);
  });

  it('should extract leetcode id 15', () => {
    assert.equal(result.leetcodeId, 15);
  });

  it('should extract title "3Sum"', () => {
    assert.equal(result.title, '3Sum');
  });

  it('should extract difficulty Medium', () => {
    assert.equal(result.difficulty, 'Medium');
  });

  it('should generate a slug', () => {
    assert.equal(result.parsedSlug, '3sum');
  });

  it('should extract acceptance rate', () => {
    assert.notEqual(result.acceptance, null);
    assert.equal(typeof result.acceptance, 'number');
    assert.ok(result.acceptance! > 0 && result.acceptance! < 100);
  });

  it('should extract a url', () => {
    assert.ok(result.url, 'url should not be null');
    assert.ok(result.url!.includes('leetcode.com'), 'url should contain leetcode.com');
  });

  it('should extract >= 50 companies', () => {
    assert.ok(
      result.companies.length >= 50,
      `Expected >=50 companies, got ${result.companies.length}`,
    );
  });

  it('should have company slugs that are lowercase kebab-case', () => {
    for (const c of result.companies.slice(0, 10)) {
      assert.ok(c.slug, `Company missing slug: ${JSON.stringify(c)}`);
      assert.match(c.slug, /^[a-z0-9-]+$/, `Slug not kebab: ${c.slug}`);
    }
  });

  it('should have non-empty descriptionMd', () => {
    assert.ok(result.descriptionMd, 'descriptionMd should not be null');
    assert.ok(result.descriptionMd!.length > 20);
  });

  it('should have non-empty solutionMd', () => {
    assert.ok(result.solutionMd, 'solutionMd should not be null');
    assert.ok(result.solutionMd!.length > 50);
  });

  it('should have non-empty followUpsMd', () => {
    assert.ok(result.followUpsMd, 'followUpsMd should not be null');
    assert.ok(result.followUpsMd!.length > 10);
  });

  it('should have non-empty examplesMd', () => {
    assert.ok(result.examplesMd, 'examplesMd should not be null');
    assert.ok(result.examplesMd!.length > 10);
  });

  it('should flag hasSolution = true', () => {
    assert.equal(result.hasSolution, true);
  });

  it('should have a relative filePath', () => {
    assert.ok(result.filePath, 'filePath should not be empty');
    assert.ok(!path.isAbsolute(result.filePath), 'filePath should be relative');
    assert.ok(result.filePath.includes('3Sum.md'));
  });
});

describe('parseSingleFile — Two Sum (id=1)', () => {
  const TWO_SUM_PATH = path.join(CONTENT_ROOT, 'Data', 'Problems', 'LeetCode', 'Two Sum.md');
  let result: ReturnType<typeof parseSingleFile>;

  before(() => {
    result = parseSingleFile(TWO_SUM_PATH);
  });

  it('should extract leetcode id 1', () => {
    assert.equal(result.leetcodeId, 1);
  });

  it('should extract difficulty Easy', () => {
    assert.equal(result.difficulty, 'Easy');
  });
});
