import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { env } from './config/env.js';
import { log } from './utils/logger.js';
import { initSchema } from './db/connection.js';
import { healthRouter } from './routes/health.routes.js';
import { filtersRouter } from './routes/filters.routes.js';
import { problemsRouter } from './routes/problems.routes.js';
import { subjectsRouter } from './routes/subjects.routes.js';
import { companiesRouter } from './routes/companies.routes.js';
import { modelsRouter } from './routes/models.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { quizRouter } from './routes/quiz.routes.js';
import { AppError } from './utils/errors.js';
import { ZodError } from 'zod';

const app = express();

app.use(cors());
app.use(express.json());

// Request-ID middleware
app.use((req, _res, next) => {
  const reqId = (req.headers['x-request-id'] as string) || crypto.randomUUID().slice(0, 8);
  (req as any).requestId = reqId;
  log.debug(`${req.method} ${req.path} [${reqId}]`);
  next();
});

// Initialize DB schema
try { initSchema(); } catch (e) { log.warn('Schema init skipped (DB may not exist yet)'); }

// §3 Non-agentic REST routes
app.use('/api', healthRouter);
app.use('/api', filtersRouter);
app.use('/api', problemsRouter);
app.use('/api', subjectsRouter);
app.use('/api', companiesRouter);
app.use('/api', modelsRouter);
app.use('/api', sessionsRouter);
app.use('/api', quizRouter);

// §4 Agentic chat route
app.use('/api', chatRouter);

app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err.issues },
    });
    return;
  }
  log.error('Unhandled error', err);
  res.status(500).json({ error: { code: 'INTERNAL', message: 'Internal server error' } });
});

app.listen(env.PORT, () => {
  log.info(`Server listening on http://localhost:${env.PORT}`);
  log.info(`Content root: ${env.CONTENT_ROOT}`);
  log.info(`DB path: ${env.DB_PATH}`);
});

export default app;
