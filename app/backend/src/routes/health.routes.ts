import { Router } from 'express';
import fs from 'node:fs';
import { env } from '../config/env.js';
import { getProblemCount, getSubjectCount, getIndexedAt } from '../db/queries.js';

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
  res.json({
    data: {
      status: 'ok',
      dbPath: env.DB_PATH,
      problemCount,
      subjectCount,
      indexedAt,
    },
  });
});
