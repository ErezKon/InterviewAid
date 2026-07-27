import { getDb } from '../db/connection.js';
import { NotFoundError } from '../utils/errors.js';
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT } from '../config/paths.js';

export interface ProblemFilters {
  companies?: string[];
  difficulties?: string[];
  topics?: string[];
  patterns?: string[];
  seniority?: string;
  minAcceptance?: number;
  maxAcceptance?: number;
  minInterviewValue?: number;
  hasSolution?: boolean;
  q?: string;
  matchMode?: 'any' | 'all';
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface ProblemListItem {
  slug: string;
  leetcodeId: number | null;
  title: string;
  difficulty: string;
  acceptance: number | null;
  url: string | null;
  primaryTopic: string;
  topics: string[];
  patterns: string[];
  seniority: string | null;
  interviewValue: number | null;
  oneLiner: string | null;
  hasSolution: boolean;
  companies: { slug: string; name: string; frequency: number | null }[];
}

export interface ProblemDetail extends ProblemListItem {
  descriptionMd: string | null;
  examplesMd: string | null;
  solutionMd: string | null;
  complexityMd: string | null;
  followUpsMd: string | null;
  takeawayMd: string | null;
  rawMarkdown: string | null;
  relatedSlugs: string[];
}

export function queryProblems(filters: ProblemFilters): { items: ProblemListItem[]; total: number } {
  const db = getDb();
  const params: Record<string, unknown> = {};
  const joins: string[] = [];
  const wheres: string[] = [];
  const havings: string[] = [];
  let needsGroup = false;

  const matchMode = filters.matchMode ?? 'any';
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const sort = filters.sort ?? 'interviewValue';
  const order = filters.order ?? 'desc';

  // FTS
  if (filters.q) {
    joins.push('JOIN problems_fts fts ON fts.slug = p.slug');
    wheres.push(`problems_fts MATCH :q`);
    params.q = filters.q;
  }

  // Difficulty
  if (filters.difficulties?.length) {
    const placeholders = filters.difficulties.map((_, i) => `:diff_${i}`);
    wheres.push(`p.difficulty IN (${placeholders.join(',')})`);
    filters.difficulties.forEach((d, i) => { params[`diff_${i}`] = d; });
  }

  // Seniority
  if (filters.seniority) {
    wheres.push(`p.seniority = :seniority`);
    params.seniority = filters.seniority;
  }

  // Acceptance range
  if (filters.minAcceptance != null) {
    wheres.push(`p.acceptance >= :minAcceptance`);
    params.minAcceptance = filters.minAcceptance;
  }
  if (filters.maxAcceptance != null) {
    wheres.push(`p.acceptance <= :maxAcceptance`);
    params.maxAcceptance = filters.maxAcceptance;
  }

  // Interview value min
  if (filters.minInterviewValue != null) {
    wheres.push(`p.interview_value >= :minInterviewValue`);
    params.minInterviewValue = filters.minInterviewValue;
  }

  // Has solution
  if (filters.hasSolution != null) {
    wheres.push(`p.has_solution = :hasSolution`);
    params.hasSolution = filters.hasSolution ? 1 : 0;
  }

  // Topics
  if (filters.topics?.length) {
    joins.push('JOIN problem_topics pt_f ON pt_f.problem_slug = p.slug');
    const placeholders = filters.topics.map((_, i) => `:topic_${i}`);
    wheres.push(`pt_f.topic_id IN (${placeholders.join(',')})`);
    filters.topics.forEach((t, i) => { params[`topic_${i}`] = t; });
    if (matchMode === 'all') {
      needsGroup = true;
      havings.push(`COUNT(DISTINCT pt_f.topic_id) = :topicCount`);
      params.topicCount = filters.topics.length;
    } else {
      needsGroup = true;
    }
  }

  // Companies
  if (filters.companies?.length) {
    joins.push('JOIN problem_companies pc_f ON pc_f.problem_slug = p.slug');
    const placeholders = filters.companies.map((_, i) => `:comp_${i}`);
    wheres.push(`pc_f.company_slug IN (${placeholders.join(',')})`);
    filters.companies.forEach((c, i) => { params[`comp_${i}`] = c; });
    if (matchMode === 'all') {
      needsGroup = true;
      havings.push(`COUNT(DISTINCT pc_f.company_slug) = :compCount`);
      params.compCount = filters.companies.length;
    } else {
      needsGroup = true;
    }
  }

  // Patterns
  if (filters.patterns?.length) {
    joins.push('JOIN problem_patterns pp_f ON pp_f.problem_slug = p.slug');
    const placeholders = filters.patterns.map((_, i) => `:pat_${i}`);
    wheres.push(`pp_f.pattern IN (${placeholders.join(',')})`);
    filters.patterns.forEach((p2, i) => { params[`pat_${i}`] = p2; });
    needsGroup = true;
  }

  const whereClause = wheres.length ? `WHERE ${wheres.join(' AND ')}` : '';
  const groupClause = needsGroup ? `GROUP BY p.slug` : '';
  const havingClause = havings.length ? `HAVING ${havings.join(' AND ')}` : '';

  const sortMap: Record<string, string> = {
    title: 'p.title',
    difficulty: `CASE p.difficulty WHEN 'Easy' THEN 1 WHEN 'Medium' THEN 2 WHEN 'Hard' THEN 3 END`,
    acceptance: 'p.acceptance',
    interviewValue: 'p.interview_value',
  };
  const orderCol = sortMap[sort] ?? 'p.interview_value';
  const orderDir = order === 'asc' ? 'ASC' : 'DESC';

  // Count query
  const countSql = `
    SELECT COUNT(*) as total FROM (
      SELECT p.slug FROM problems p
      ${joins.join('\n')}
      ${whereClause}
      ${groupClause}
      ${havingClause}
    )
  `;
  const countRow = db.prepare(countSql).get(params) as { total: number };
  const total = countRow.total;

  // Data query
  const offset = (page - 1) * pageSize;
  const dataSql = `
    SELECT DISTINCT p.slug, p.leetcode_id, p.title, p.difficulty, p.acceptance,
           p.url, p.primary_topic, p.seniority, p.interview_value, p.one_liner, p.has_solution
    FROM problems p
    ${joins.join('\n')}
    ${whereClause}
    ${groupClause}
    ${havingClause}
    ORDER BY ${orderCol} ${orderDir}
    LIMIT :limit OFFSET :offset
  `;
  params.limit = pageSize;
  params.offset = offset;

  const rows = db.prepare(dataSql).all(params) as any[];

  // Hydrate topics, patterns, companies for each slug
  const slugs = rows.map(r => r.slug);
  const items: ProblemListItem[] = rows.map(row => ({
    slug: row.slug,
    leetcodeId: row.leetcode_id,
    title: row.title,
    difficulty: row.difficulty,
    acceptance: row.acceptance,
    url: row.url,
    primaryTopic: row.primary_topic,
    topics: getTopicsForProblem(row.slug),
    patterns: getPatternsForProblem(row.slug),
    seniority: row.seniority,
    interviewValue: row.interview_value,
    oneLiner: row.one_liner,
    hasSolution: row.has_solution === 1,
    companies: getCompaniesForProblem(row.slug),
  }));

  return { items, total };
}

export function getProblemBySlug(slug: string): ProblemDetail {
  const db = getDb();
  const row = db.prepare('SELECT * FROM problems WHERE slug = ?').get(slug) as any;
  if (!row) throw new NotFoundError('Problem', slug);

  let rawMarkdown: string | null = null;
  try {
    const fullPath = path.join(CONTENT_ROOT, row.file_path);
    if (fs.existsSync(fullPath)) {
      rawMarkdown = fs.readFileSync(fullPath, 'utf-8');
    }
  } catch { /* fall back to DB columns */ }

  // Related problems: same primary_topic, nearest interview_value, limit 5
  const related = db.prepare(`
    SELECT slug FROM problems
    WHERE primary_topic = ? AND slug != ?
    ORDER BY ABS(COALESCE(interview_value, 3) - COALESCE(?, 3))
    LIMIT 5
  `).all(row.primary_topic, slug, row.interview_value) as { slug: string }[];

  return {
    slug: row.slug,
    leetcodeId: row.leetcode_id,
    title: row.title,
    difficulty: row.difficulty,
    acceptance: row.acceptance,
    url: row.url,
    primaryTopic: row.primary_topic,
    topics: getTopicsForProblem(slug),
    patterns: getPatternsForProblem(slug),
    seniority: row.seniority,
    interviewValue: row.interview_value,
    oneLiner: row.one_liner,
    hasSolution: row.has_solution === 1,
    companies: getCompaniesForProblem(slug),
    descriptionMd: row.description_md,
    examplesMd: row.examples_md,
    solutionMd: row.solution_md,
    complexityMd: row.complexity_md,
    followUpsMd: row.follow_ups_md,
    takeawayMd: row.takeaway_md,
    rawMarkdown,
    relatedSlugs: related.map(r => r.slug),
  };
}

export function getProblemSolution(slug: string): {
  solutionMd: string | null;
  complexityMd: string | null;
  followUpsMd: string | null;
  takeawayMd: string | null;
} {
  const db = getDb();
  const row = db.prepare(
    'SELECT solution_md, complexity_md, follow_ups_md, takeaway_md FROM problems WHERE slug = ?'
  ).get(slug) as any;
  if (!row) throw new NotFoundError('Problem', slug);
  return {
    solutionMd: row.solution_md,
    complexityMd: row.complexity_md,
    followUpsMd: row.follow_ups_md,
    takeawayMd: row.takeaway_md,
  };
}

export function getRandomProblem(filters: ProblemFilters): ProblemListItem | null {
  const { items } = queryProblems({ ...filters, page: 1, pageSize: 100 });
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

function getTopicsForProblem(slug: string): string[] {
  const db = getDb();
  return (db.prepare('SELECT topic_id FROM problem_topics WHERE problem_slug = ?').all(slug) as any[])
    .map(r => r.topic_id);
}

function getPatternsForProblem(slug: string): string[] {
  const db = getDb();
  return (db.prepare('SELECT pattern FROM problem_patterns WHERE problem_slug = ?').all(slug) as any[])
    .map(r => r.pattern);
}

function getCompaniesForProblem(slug: string): { slug: string; name: string; frequency: number | null }[] {
  const db = getDb();
  return (db.prepare(`
    SELECT pc.company_slug as slug, c.name, pc.frequency
    FROM problem_companies pc
    JOIN companies c ON c.slug = pc.company_slug
    WHERE pc.problem_slug = ?
    ORDER BY pc.frequency DESC NULLS LAST
  `).all(slug) as any[]);
}
