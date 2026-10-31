import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, DESIGN_DIR } from '../config/paths.js';
import { DESIGN_CATEGORIES } from '../indexer/taxonomy.js';
import { listDesignFiles, parseDesignFile } from '../indexer/parse-design-md.js';
import {
  DesignProblem, DesignProblemListItem, DesignProblemDetail, DesignCategorySummary, Difficulty,
} from '../types/design.types.js';
import { NotFoundError } from '../utils/errors.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('design-service');

/**
 * Design problems are read straight from the markdown files (no LLM classification needed —
 * category, difficulty, seniority, companies and tags come from the file header). The parsed set
 * is cached in memory and re-parsed whenever a file is added, removed or modified.
 */
let cache: { fingerprint: string; problems: DesignProblem[] } | null = null;

const DIFFICULTY_ORDER: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };
const categoryOrder = (id: string) => {
  const i = DESIGN_CATEGORIES.findIndex(c => c.id === id);
  return i === -1 ? DESIGN_CATEGORIES.length : i;
};

export function loadDesignProblems(): DesignProblem[] {
  const files = listDesignFiles(DESIGN_DIR);
  const fingerprint = files.map(f => {
    const st = fs.statSync(f);
    return `${f}:${st.mtimeMs}:${st.size}`;
  }).join('|');
  if (cache?.fingerprint === fingerprint) return cache.problems;

  const seen = new Set<string>();
  const problems: DesignProblem[] = [];
  for (const file of files) {
    try {
      const p = parseDesignFile(file);
      let slug = p.slug;
      for (let n = 2; seen.has(slug); n++) slug = `${p.slug}-${n}`;
      seen.add(slug);
      problems.push({ ...p, slug });
    } catch (err) {
      log.warn(`Failed to parse ${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  problems.sort((a, b) =>
    categoryOrder(a.category) - categoryOrder(b.category)
    || DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]
    || a.title.localeCompare(b.title));

  log.info(`Loaded ${problems.length} design problems from ${DESIGN_DIR}`);
  cache = { fingerprint, problems };
  return problems;
}

export function toListItem(p: DesignProblem): DesignProblemListItem {
  const { slug, title, category, categoryLabel, difficulty, seniority, companies, tags, timeMinutes, summary } = p;
  return { slug, title, category, categoryLabel, difficulty, seniority, companies, tags, timeMinutes, summary };
}

export interface DesignQuery {
  q?: string;
  categories?: string[];
  difficulties?: string[];
  seniority?: string;
  companies?: string[];
  tags?: string[];
  randomize?: boolean;
  excludeSlugs?: string[];
  page?: number;
  pageSize?: number;
}

const lc = (values?: string[]) => (values ?? []).map(v => v.toLowerCase());

/** Common words people use for each category, so "lld parking" or "ml ranking" match. */
const CATEGORY_ALIASES: Record<string, string> = {
  'system-design': 'hld high-level distributed backend architecture',
  'oop-design': 'lld low-level oop object-oriented class machine-coding',
  'frontend-system-design': 'frontend front-end fe ui web client',
  'ai-ml-system-design': 'ai ml machine-learning llm genai',
};

/** Score a problem against free-text tokens; every token must match somewhere (AND), else 0. */
function score(p: DesignProblem, tokens: string[]): number {
  const fields: [string, number][] = [
    [p.title.toLowerCase(), 6],
    [p.tags.join(' '), 4],
    [`${p.categoryLabel} ${p.category} ${CATEGORY_ALIASES[p.category] ?? ''}`.toLowerCase(), 3],
    [p.companies.join(' ').toLowerCase(), 2],
    [(p.statementMd ?? '').toLowerCase(), 1.5],
    [[p.requirementsMd, p.solutionMd, p.takeawaysMd].join(' ').toLowerCase(), 0.5],
  ];
  let total = 0;
  for (const token of tokens) {
    // Word-prefix match ("rag" matches "RAG"/"rag-pipeline", not "storage")
    const re = new RegExp(`(^|[^a-z0-9])${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    const s = fields.reduce((acc, [text, weight]) => acc + (re.test(text) ? weight : 0), 0);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function queryDesignProblems(query: DesignQuery = {}): { items: DesignProblemListItem[]; total: number } {
  const categories = lc(query.categories);
  const difficulties = lc(query.difficulties);
  const companies = lc(query.companies);
  const tags = lc(query.tags);
  const exclude = new Set(query.excludeSlugs ?? []);
  const tokens = (query.q ?? '').toLowerCase().split(/\s+/).filter(t => t.length > 1);

  let matches = loadDesignProblems().filter(p =>
    !exclude.has(p.slug)
    && (!categories.length || categories.includes(p.category) || categories.includes(p.categoryLabel.toLowerCase()))
    && (!difficulties.length || difficulties.includes(p.difficulty.toLowerCase()))
    && (!query.seniority || p.seniority === query.seniority.toLowerCase())
    && (!companies.length || p.companies.some(c => companies.some(f => c.toLowerCase().includes(f))))
    && (!tags.length || p.tags.some(t => tags.includes(t))));

  if (tokens.length) {
    const scored = matches.map(p => ({ p, s: score(p, tokens) })).filter(x => x.s > 0);
    scored.sort((a, b) => b.s - a.s);
    matches = scored.map(x => x.p);
  }
  if (query.randomize) matches = shuffle(matches);

  const pageSize = query.pageSize ?? 100;
  const start = ((query.page ?? 1) - 1) * pageSize;
  return { items: matches.slice(start, start + pageSize).map(toListItem), total: matches.length };
}

export function getDesignProblemBySlug(slug: string): DesignProblemDetail {
  const all = loadDesignProblems();
  const problem = all.find(p => p.slug === slug);
  if (!problem) throw new NotFoundError('Design problem', slug);

  const rawMarkdown = fs.readFileSync(path.join(CONTENT_ROOT, problem.filePath), 'utf-8');
  const related = all
    .filter(p => p.slug !== slug && p.category === problem.category)
    .sort((a, b) =>
      Math.abs(DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[problem.difficulty])
      - Math.abs(DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[problem.difficulty]))
    .slice(0, 5)
    .map(toListItem);

  return { ...problem, rawMarkdown, related };
}

export function designProblemExists(slug: string): boolean {
  return loadDesignProblems().some(p => p.slug === slug);
}

export function getRandomDesignProblem(query: DesignQuery = {}): DesignProblemListItem | null {
  const { items } = queryDesignProblems({ ...query, randomize: true, page: 1, pageSize: 1 });
  return items[0] ?? null;
}

export function getDesignCategories(): DesignCategorySummary[] {
  const all = loadDesignProblems();
  return DESIGN_CATEGORIES.map(c => {
    const inCategory = all.filter(p => p.category === c.id);
    const difficulties: Record<Difficulty, number> = { Easy: 0, Medium: 0, Hard: 0 };
    for (const p of inCategory) difficulties[p.difficulty]++;
    return { id: c.id, label: c.label, count: inCategory.length, difficulties };
  });
}
