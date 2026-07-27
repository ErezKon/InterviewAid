import { Router } from 'express';
import { getDb } from '../db/connection.js';

export const filtersRouter = Router();

let cachedFilters: unknown = null;
let cachedAt = 0;
const TTL_MS = 60_000;

filtersRouter.get('/filters', (_req, res) => {
  const now = Date.now();
  if (cachedFilters && now - cachedAt < TTL_MS) {
    res.json({ data: cachedFilters });
    return;
  }

  const db = getDb();

  const companies = db.prepare(
    'SELECT slug, name, problem_count AS problemCount FROM companies ORDER BY problem_count DESC'
  ).all();

  const topics = db.prepare(`
    SELECT t.id, t.label, t.kind, COUNT(pt.problem_slug) AS problemCount
    FROM topics t
    LEFT JOIN problem_topics pt ON pt.topic_id = t.id
    GROUP BY t.id
    ORDER BY problemCount DESC
  `).all();

  const data = {
    companies,
    difficulties: ['Easy', 'Medium', 'Hard'],
    topics,
    seniority: ['junior', 'mid', 'senior', 'staff', 'principal'],
  };

  cachedFilters = data;
  cachedAt = now;

  res.json({ data });
});
