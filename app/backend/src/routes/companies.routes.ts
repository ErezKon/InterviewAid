import { Router } from 'express';
import { companiesQuerySchema } from '../types/api.types.js';
import { getDb } from '../db/connection.js';

export const companiesRouter = Router();

companiesRouter.get('/companies', (req, res, next) => {
  try {
    const { q, limit } = companiesQuerySchema.parse(req.query);
    const db = getDb();

    if (q) {
      const rows = db.prepare(
        'SELECT slug, name, problem_count AS problemCount FROM companies WHERE name LIKE ? ORDER BY problem_count DESC LIMIT ?'
      ).all(`%${q}%`, limit);
      res.json({ data: rows });
    } else {
      const rows = db.prepare(
        'SELECT slug, name, problem_count AS problemCount FROM companies ORDER BY problem_count DESC LIMIT ?'
      ).all(limit);
      res.json({ data: rows });
    }
  } catch (err) {
    next(err);
  }
});
