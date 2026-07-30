import { getDb } from '../db/connection.js';
import { NotFoundError } from '../utils/errors.js';

export interface SubjectFilters {
  topics?: string[];
  sourceFile?: string;
  mainSubject?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

export interface SubjectListItem {
  id: string;
  title: string;
  sourceFile: string;
  mainSubject: string;
  subSubject: string | null;
  primaryTopic: string | null;
  topics: string[];
  keyConcepts: string[];
  wordCount: number;
}

export interface SubjectDetail extends SubjectListItem {
  bodyMd: string;
}

export function querySubjects(filters: SubjectFilters): { items: SubjectListItem[]; total: number } {
  const db = getDb();
  const params: Record<string, unknown> = {};
  const joins: string[] = [];
  const wheres: string[] = [];

  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);

  if (filters.q) {
    joins.push('JOIN subjects_fts sfts ON sfts.id = s.id');
    wheres.push(`subjects_fts MATCH :q`);
    params.q = filters.q;
  }

  if (filters.topics?.length) {
    joins.push('JOIN subject_topics st_f ON st_f.subject_id = s.id');
    const placeholders = filters.topics.map((_, i) => `:topic_${i}`);
    wheres.push(`st_f.topic_id IN (${placeholders.join(',')})`);
    filters.topics.forEach((t, i) => { params[`topic_${i}`] = t; });
  }

  if (filters.sourceFile) {
    wheres.push(`s.source_file = :sourceFile`);
    params.sourceFile = filters.sourceFile;
  }

  if (filters.mainSubject) {
    wheres.push(`s.main_subject = :mainSubject`);
    params.mainSubject = filters.mainSubject;
  }

  const whereClause = wheres.length ? `WHERE ${wheres.join(' AND ')}` : '';

  const countSql = `
    SELECT COUNT(DISTINCT s.id) as total FROM subjects s
    ${joins.join('\n')}
    ${whereClause}
  `;
  const countRow = db.prepare(countSql).get(params) as { total: number };
  const total = countRow.total;

  const offset = (page - 1) * pageSize;
  const dataSql = `
    SELECT DISTINCT s.id, s.title, s.source_file, s.main_subject, s.sub_subject,
           s.primary_topic, s.key_concepts, s.word_count
    FROM subjects s
    ${joins.join('\n')}
    ${whereClause}
    ORDER BY s.main_subject ASC, s.sub_subject ASC, s.title ASC
    LIMIT :limit OFFSET :offset
  `;
  params.limit = pageSize;
  params.offset = offset;

  const rows = db.prepare(dataSql).all(params) as any[];

  const items: SubjectListItem[] = rows.map(row => ({
    id: row.id,
    title: row.title,
    sourceFile: row.source_file,
    mainSubject: row.main_subject,
    subSubject: row.sub_subject,
    primaryTopic: row.primary_topic,
    topics: getTopicsForSubject(row.id),
    keyConcepts: parseJsonArray(row.key_concepts),
    wordCount: row.word_count,
  }));

  return { items, total };
}

export function getSubjectById(id: string): SubjectDetail {
  const db = getDb();
  const row = db.prepare('SELECT * FROM subjects WHERE id = ?').get(id) as any;
  if (!row) throw new NotFoundError('Subject', id);

  return {
    id: row.id,
    title: row.title,
    sourceFile: row.source_file,
    mainSubject: row.main_subject,
    subSubject: row.sub_subject,
    primaryTopic: row.primary_topic,
    topics: getTopicsForSubject(id),
    keyConcepts: parseJsonArray(row.key_concepts),
    wordCount: row.word_count,
    bodyMd: row.body_md,
  };
}

function getTopicsForSubject(id: string): string[] {
  const db = getDb();
  return (db.prepare('SELECT topic_id FROM subject_topics WHERE subject_id = ?').all(id) as any[])
    .map(r => r.topic_id);
}

function parseJsonArray(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}
