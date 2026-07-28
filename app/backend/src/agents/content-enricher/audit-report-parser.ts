import fs from 'node:fs';
import path from 'node:path';
import { PROBLEMS_DIR, METADATA_DIR } from '../../config/paths.js';
import { Problem } from '../../types/problem.types.js';

// ── Types ───────────────────────────────────────────────────────────────────

export interface InsufficientContentItem {
  filename: string;
  missingSections: string[];
  lines: number;
}

export interface WrongPrimaryTopicItem {
  title: string;
  currentPrimary: string;
  shouldBe: string;
  additionalSubTopics: string[];
}

export interface MissingSubTopicsItem {
  title: string;
  primary: string;
  currentTopics: string[];
  missingSubTopics: string[];
}

export type AuditItem = InsufficientContentItem | WrongPrimaryTopicItem | MissingSubTopicsItem;

// ── Section extraction ──────────────────────────────────────────────────────

export function extractSection(content: string, sectionHeader: string): string[] {
  const lines = content.split('\n');
  let inSection = false;
  let pastHeader = false;
  const tableLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## ') && inSection) break; // next section
    if (line.includes(sectionHeader)) {
      inSection = true;
      continue;
    }
    if (inSection) {
      if (line.startsWith('### ')) { continue; }
      if (line.startsWith('| #') || line.startsWith('|---')) {
        pastHeader = true;
        continue;
      }
      if (pastHeader && line.startsWith('|')) {
        tableLines.push(line);
      }
    }
  }
  return tableLines;
}

// ── Parsers ─────────────────────────────────────────────────────────────────

export function parseInsufficientContent(tableLines: string[]): InsufficientContentItem[] {
  const items: InsufficientContentItem[] = [];
  for (const line of tableLines) {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 4 || cols[0] === '#') continue;
    const filename = cols[1];
    const missingSections = cols[2].split(',').map(s => s.trim()).filter(Boolean);
    const lines = parseInt(cols[3], 10) || 0;
    items.push({ filename, missingSections, lines });
  }
  return items;
}

export function parseWrongPrimaryTopic(tableLines: string[]): WrongPrimaryTopicItem[] {
  const items: WrongPrimaryTopicItem[] = [];
  for (const line of tableLines) {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 5 || cols[0] === '#') continue;
    const title = cols[1];
    const currentPrimary = cols[2].replace(/`/g, '');
    const shouldBe = cols[3].replace(/`/g, '');
    const additionalRaw = cols[4].replace(/`/g, '').trim();
    const additionalSubTopics = additionalRaw === '—' || additionalRaw === '-'
      ? []
      : additionalRaw.split(',').map(s => s.trim()).filter(Boolean);
    items.push({ title, currentPrimary, shouldBe, additionalSubTopics });
  }
  return items;
}

export function parseMissingSubTopics(tableLines: string[]): MissingSubTopicsItem[] {
  const items: MissingSubTopicsItem[] = [];
  for (const line of tableLines) {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 5 || cols[0] === '#') continue;
    const title = cols[1];
    const primary = cols[2].replace(/`/g, '');
    const currentTopics = cols[3].replace(/`/g, '').split(',').map(s => s.trim()).filter(Boolean);
    const missingSubTopics = cols[4].replace(/`/g, '').split(',').map(s => s.trim()).filter(Boolean);
    items.push({ title, primary, currentTopics, missingSubTopics });
  }
  return items;
}

export function parseSummary(content: string): Record<string, number> {
  const summary: Record<string, number> = {};
  const headerMatch = content.match(/\*\*Total files scanned:\*\*\s*(\d+)/);
  if (headerMatch) summary.totalFiles = parseInt(headerMatch[1], 10);

  const sufficientMatch = content.match(/\*\*Sufficient content:\*\*\s*(\d+)/);
  if (sufficientMatch) summary.sufficientContent = parseInt(sufficientMatch[1], 10);

  const insufficientMatch = content.match(/\*\*Insufficient content:\*\*\s*(\d+)/);
  if (insufficientMatch) summary.insufficientContent = parseInt(insufficientMatch[1], 10);

  const wrongTopicMatch = content.match(/\*\*Wrong primary topic:\*\*\s*(\d+)/);
  if (wrongTopicMatch) summary.wrongPrimaryTopic = parseInt(wrongTopicMatch[1], 10);

  const missingSubMatch = content.match(/\*\*Missing sub-topics:\*\*\s*(\d+)/);
  if (missingSubMatch) summary.missingSubTopics = parseInt(missingSubMatch[1], 10);

  return summary;
}

// ── Live-data verification ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function loadProblemsMap(): Map<string, Problem> {
  const problemsPath = path.join(METADATA_DIR, 'problems.json');
  if (!fs.existsSync(problemsPath)) return new Map();
  const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  const map = new Map<string, Problem>();
  for (const p of problems) {
    map.set(p.slug, p);
    // Secondary index by filename
    if (p.filePath) {
      const fname = path.basename(p.filePath, '.md');
      map.set(`file:${fname.toLowerCase()}`, p);
    }
  }
  return map;
}

function findProblem(bySlug: Map<string, Problem>, title: string): Problem | undefined {
  return bySlug.get(slugify(title)) ?? bySlug.get(`file:${title.toLowerCase()}`);
}

// Map audit section names to markdown heading patterns
const SECTION_PATTERNS: Record<string, RegExp> = {
  'examples':   /##\s+(\d+\.\s+)?Examples?/i,
  'approach':   /##\s+(\d+\.\s+)?Approach/i,
  'walkthrough': /##\s+(\d+\.\s+)?Walkthrough/i,
  'complexity': /##\s+(\d+\.\s+)?Complexity/i,
};

function fileHasSection(filePath: string, sectionName: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf-8');
  const pattern = SECTION_PATTERNS[sectionName];
  return pattern ? pattern.test(content) : false;
}

export type AuditFixType = 'wrong_primary_topic' | 'missing_sub_topics' | 'insufficient_content';

/**
 * Count how many audit issues of a given type are still unfixed,
 * by verifying against the live state of problems.json / .md files.
 */
export function countRemainingAuditIssues(
  auditFile: string,
  fixType: AuditFixType,
): { total: number; remaining: number } {
  const content = fs.readFileSync(auditFile, 'utf-8');

  if (fixType === 'wrong_primary_topic') {
    const tableLines = extractSection(content, '## 2. Wrong Primary Topic');
    const items = parseWrongPrimaryTopic(tableLines);
    const bySlug = loadProblemsMap();
    let remaining = 0;
    for (const item of items) {
      const problem = findProblem(bySlug, item.title);
      if (!problem) { remaining++; continue; }
      if (problem.primaryTopic !== item.shouldBe) { remaining++; }
    }
    return { total: items.length, remaining };
  }

  if (fixType === 'missing_sub_topics') {
    const tableLines = extractSection(content, '## 3. Missing Sub-Topics');
    const items = parseMissingSubTopics(tableLines);
    const bySlug = loadProblemsMap();
    let remaining = 0;
    for (const item of items) {
      const problem = findProblem(bySlug, item.title);
      if (!problem) { remaining++; continue; }
      const currentTopics = new Set(problem.topics ?? []);
      const allPresent = item.missingSubTopics.every(t => currentTopics.has(t));
      if (!allPresent) { remaining++; }
    }
    return { total: items.length, remaining };
  }

  // insufficient_content
  const tableLines = extractSection(content, '## 1. Insufficient Content');
  const items = parseInsufficientContent(tableLines);
  let remaining = 0;
  for (const item of items) {
    const filePath = path.join(PROBLEMS_DIR, item.filename);
    const stillMissing = item.missingSections.some(s => !fileHasSection(filePath, s));
    if (stillMissing) { remaining++; }
  }
  return { total: items.length, remaining };
}

/**
 * Directly apply deterministic classification fixes (wrong_primary_topic, missing_sub_topics)
 * without an LLM. Returns the number of problems actually modified.
 */
export function fixClassificationIssuesDirect(
  auditFile: string,
  fixType: 'wrong_primary_topic' | 'missing_sub_topics',
): { fixed: number; notFound: number } {
  const content = fs.readFileSync(auditFile, 'utf-8');
  const problemsPath = path.join(METADATA_DIR, 'problems.json');
  if (!fs.existsSync(problemsPath)) return { fixed: 0, notFound: 0 };

  const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  const bySlug = new Map<string, Problem>();
  const byFilename = new Map<string, Problem>();
  for (const p of problems) {
    bySlug.set(p.slug, p);
    if (p.filePath) {
      const fname = path.basename(p.filePath, '.md');
      byFilename.set(`file:${fname.toLowerCase()}`, p);
    }
  }
  const find = (title: string) =>
    bySlug.get(slugify(title)) ?? byFilename.get(`file:${title.toLowerCase()}`);

  let fixed = 0;
  let notFound = 0;

  if (fixType === 'wrong_primary_topic') {
    const tableLines = extractSection(content, '## 2. Wrong Primary Topic');
    const items = parseWrongPrimaryTopic(tableLines);
    for (const item of items) {
      const problem = find(item.title);
      if (!problem) { notFound++; continue; }
      if (problem.primaryTopic === item.shouldBe) continue; // already fixed
      const newTopics = [item.shouldBe, ...item.additionalSubTopics];
      // Merge with existing topics (preserve any that aren't being replaced)
      const existing = problem.topics ?? [];
      const merged = [...new Set([...newTopics, ...existing.filter(t => t !== problem.primaryTopic)])];
      problem.topics = merged;
      problem.primaryTopic = merged[0];
      fixed++;
    }
  } else {
    const tableLines = extractSection(content, '## 3. Missing Sub-Topics');
    const items = parseMissingSubTopics(tableLines);
    for (const item of items) {
      const problem = find(item.title);
      if (!problem) { notFound++; continue; }
      const currentTopics = new Set(problem.topics ?? []);
      const allPresent = item.missingSubTopics.every(t => currentTopics.has(t));
      if (allPresent) continue; // already fixed
      const merged = [...new Set([...(problem.topics ?? []), ...item.missingSubTopics])];
      problem.topics = merged;
      problem.primaryTopic = merged[0];
      fixed++;
    }
  }

  if (fixed > 0) {
    fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));
  }

  return { fixed, notFound };
}
