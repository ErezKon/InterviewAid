import { getDb } from '../db/connection.js';
import { NotFoundError } from '../utils/errors.js';
import crypto from 'node:crypto';

export function createThread(mode: string, modelId: string, title?: string): string {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO chat_threads (id, title, mode, model_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, title ?? null, mode, modelId, now, now);
  return id;
}

export function getThread(id: string) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM chat_threads WHERE id = ?').get(id) as any;
  if (!row) throw new NotFoundError('Thread', id);
  return mapThread(row);
}

export function listThreads() {
  const db = getDb();
  return (db.prepare('SELECT * FROM chat_threads ORDER BY updated_at DESC').all() as any[])
    .map(mapThread);
}

export function updateThreadTitle(id: string, title: string) {
  const db = getDb();
  const result = db.prepare('UPDATE chat_threads SET title = ?, updated_at = ? WHERE id = ?')
    .run(title, new Date().toISOString(), id);
  if (result.changes === 0) throw new NotFoundError('Thread', id);
}

export function deleteThread(id: string) {
  const db = getDb();
  db.prepare('DELETE FROM chat_messages WHERE thread_id = ?').run(id);
  db.prepare('DELETE FROM interview_sessions WHERE thread_id = ?').run(id);
  const result = db.prepare('DELETE FROM chat_threads WHERE id = ?').run(id);
  if (result.changes === 0) throw new NotFoundError('Thread', id);
}

export function appendMessage(
  threadId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  payloadJson?: string,
): string {
  const db = getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO chat_messages (id, thread_id, role, content, payload_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, threadId, role, content, payloadJson ?? null, now);
  db.prepare('UPDATE chat_threads SET updated_at = ? WHERE id = ?').run(now, threadId);
  return id;
}

export function getThreadMessages(threadId: string, limit = 50) {
  const db = getDb();
  return (db.prepare(
    'SELECT * FROM chat_messages WHERE thread_id = ? ORDER BY created_at ASC LIMIT ?'
  ).all(threadId, limit) as any[]).map(mapMessage);
}

export function getRecentMessages(threadId: string, limit = 12) {
  const db = getDb();
  const rows = db.prepare(`
    SELECT * FROM (
      SELECT * FROM chat_messages WHERE thread_id = ? ORDER BY created_at DESC LIMIT ?
    ) sub ORDER BY created_at ASC
  `).all(threadId, limit) as any[];
  return rows.map(mapMessage);
}

export function upsertInterviewSession(session: {
  id: string;
  threadId: string;
  targetCompany?: string;
  targetRole?: string;
  planJson: string;
  currentStep: number;
  stage: string;
  status: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO interview_sessions (id, thread_id, target_company, target_role, plan_json, current_step, stage, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      plan_json = excluded.plan_json,
      current_step = excluded.current_step,
      stage = excluded.stage,
      status = excluded.status,
      updated_at = excluded.updated_at
  `).run(
    session.id, session.threadId, session.targetCompany ?? null, session.targetRole ?? null,
    session.planJson, session.currentStep, session.stage, session.status, now, now,
  );
}

export function getInterviewSession(threadId: string) {
  const db = getDb();
  const row = db.prepare('SELECT * FROM interview_sessions WHERE thread_id = ? ORDER BY updated_at DESC LIMIT 1')
    .get(threadId) as any;
  if (!row) return null;
  return {
    id: row.id,
    threadId: row.thread_id,
    targetCompany: row.target_company,
    targetRole: row.target_role,
    planJson: row.plan_json,
    currentStep: row.current_step,
    stage: row.stage,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapThread(row: any) {
  return {
    id: row.id,
    title: row.title,
    mode: row.mode,
    modelId: row.model_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMessage(row: any) {
  return {
    id: row.id,
    threadId: row.thread_id,
    role: row.role,
    content: row.content,
    payloadJson: row.payload_json,
    createdAt: row.created_at,
  };
}
