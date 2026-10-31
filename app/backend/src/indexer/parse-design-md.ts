import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT } from '../config/paths.js';
import { DESIGN_CATEGORIES, DesignCategory } from './taxonomy.js';
import { splitSections } from './parse-problem-md.js';
import { DesignProblem, Difficulty } from '../types/design.types.js';

/** Files in the design folder that are not problems. */
const SKIP_FILES = new Set(['readme.md', 'index.md']);

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Resolve a category from the `**Category:**` value, falling back to the parent folder name. */
export function resolveDesignCategory(raw: string | undefined, folder: string): DesignCategory {
  for (const candidate of [raw, folder]) {
    if (!candidate) continue;
    const n = normalize(candidate);
    const match = DESIGN_CATEGORIES.find(c => [c.id, c.label, c.folder].some(v => normalize(v) === n))
      ?? (/lowlevel|oop|lld/.test(n) ? DESIGN_CATEGORIES[1]
        : /frontend/.test(n) ? DESIGN_CATEGORIES[2]
        : /aiml|machinelearning|llm/.test(n) ? DESIGN_CATEGORIES[3]
        : undefined);
    if (match) return match;
  }
  return DESIGN_CATEGORIES[0];
}

function parseDifficulty(raw: string | undefined): Difficulty {
  if (/easy/i.test(raw ?? '')) return 'Easy';
  if (/hard/i.test(raw ?? '')) return 'Hard';
  return 'Medium';
}

const csv = (raw: string | undefined) => (raw ?? '').split(',').map(s => s.trim()).filter(Boolean);

function summarize(statement: string | null): string {
  if (!statement) return '';
  const plain = statement
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[*_`>#]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= 220) return plain;
  const cut = plain.slice(0, 220);
  const sentenceEnd = cut.lastIndexOf('. ');
  return sentenceEnd > 80 ? cut.slice(0, sentenceEnd + 1) : cut.replace(/\s+\S*$/, '') + '…';
}

const SECTION_MATCHERS = {
  statement: /problem statement/i,
  clarifying: /clarifying/i,
  requirements: /^requirements/i,
  followUps: /follow[- ]?up/i,
  mistakes: /common mistakes|pitfalls/i,
  takeaways: /key takeaways?/i,
};

export function parseDesignFile(filePath: string): DesignProblem {
  const content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
  const field = (name: string) => content.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*(.+)`))?.[1]?.trim();

  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(filePath, '.md');
  const category = resolveDesignCategory(field('Category'), path.basename(path.dirname(filePath)));
  const seniority = field('Seniority')?.toLowerCase().match(/junior|mid|senior|staff|principal/)?.[0] ?? null;
  const time = field('Time')?.match(/\d+/)?.[0];

  const sections = splitSections(content).filter(s => s.heading);
  const find = (re: RegExp) => sections.find(s => re.test(s.heading))?.body || null;
  const isKnown = (heading: string) => Object.values(SECTION_MATCHERS).some(re => re.test(heading));
  const solutionSections = sections.filter(s => !isKnown(s.heading));

  const statementMd = find(SECTION_MATCHERS.statement);

  return {
    slug: slugify(title),
    title,
    category: category.id,
    categoryLabel: category.label,
    difficulty: parseDifficulty(field('Difficulty')),
    seniority,
    companies: csv(field('Companies?')),
    tags: csv(field('Tags')).map(t => t.toLowerCase()),
    timeMinutes: time ? parseInt(time, 10) : null,
    filePath: path.relative(CONTENT_ROOT, filePath),
    summary: summarize(statementMd),
    statementMd,
    clarifyingMd: find(SECTION_MATCHERS.clarifying),
    requirementsMd: find(SECTION_MATCHERS.requirements),
    solutionMd: solutionSections.length
      ? solutionSections.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n')
      : null,
    followUpsMd: find(SECTION_MATCHERS.followUps),
    mistakesMd: find(SECTION_MATCHERS.mistakes),
    takeawaysMd: find(SECTION_MATCHERS.takeaways),
    sections: sections.map(s => s.heading),
  };
}

/** Recursively list design problem files under `dir` (skips README/INDEX and `_`-prefixed files). */
export function listDesignFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listDesignFiles(full);
    const lower = entry.name.toLowerCase();
    return lower.endsWith('.md') && !SKIP_FILES.has(lower) && !entry.name.startsWith('_') ? [full] : [];
  }).sort();
}
