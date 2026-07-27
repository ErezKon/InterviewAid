import { getDb } from './connection.js';

export function getProblemCount(): number {
  const row = getDb().prepare('SELECT COUNT(*) as c FROM problems').get() as { c: number };
  return row.c;
}

export function getSubjectCount(): number {
  const row = getDb().prepare('SELECT COUNT(*) as c FROM subjects').get() as { c: number };
  return row.c;
}

export function getIndexedAt(): string | null {
  const row = getDb().prepare('SELECT MAX(updated_at) as t FROM problems').get() as { t: string | null };
  return row.t;
}
