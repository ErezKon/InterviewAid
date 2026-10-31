import { Router } from 'express';
import fs from 'node:fs';
import { env } from '../config/env.js';
import { getProblemCount, getSubjectCount, getIndexedAt } from '../db/queries.js';
import { loadDesignProblems } from '../services/design.service.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  const dbExists = fs.existsSync(env.DB_PATH);
  let problemCount = 0;
  let subjectCount = 0;
  let indexedAt: string | null = null;
  if (dbExists) {
    try {
      problemCount = getProblemCount();
      subjectCount = getSubjectCount();
      indexedAt = getIndexedAt();
    } catch { /* db not initialized yet */ }
  }
  let designProblemCount = 0;
  try { designProblemCount = loadDesignProblems().length; } catch { /* design folder unreadable */ }
  res.json({
    data: {
      status: 'ok',
      dbPath: env.DB_PATH,
      problemCount,
      subjectCount,
      designProblemCount,
      indexedAt,
    },
  });
});
