import { Router } from 'express';
import {
  listThreads, getThread, deleteThread, updateThreadTitle,
  getThreadMessages, getInterviewSession,
} from '../services/session.service.js';

export const sessionsRouter = Router();

sessionsRouter.get('/threads', (_req, res, next) => {
  try {
    res.json({ data: listThreads() });
  } catch (err) { next(err); }
});

sessionsRouter.get('/threads/:id', (req, res, next) => {
  try {
    const thread = getThread(req.params.id);
    const messages = getThreadMessages(req.params.id);
    res.json({ data: { ...thread, messages } });
  } catch (err) { next(err); }
});

sessionsRouter.delete('/threads/:id', (req, res, next) => {
  try {
    deleteThread(req.params.id);
    res.json({ data: { deleted: true } });
  } catch (err) { next(err); }
});

sessionsRouter.post('/threads/:id/title', (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'title is required' } });
      return;
    }
    updateThreadTitle(req.params.id, title);
    res.json({ data: { updated: true } });
  } catch (err) { next(err); }
});

sessionsRouter.get('/interview-sessions/:threadId', (req, res, next) => {
  try {
    const session = getInterviewSession(req.params.threadId);
    if (!session) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No interview session for this thread' } });
      return;
    }
    res.json({ data: session });
  } catch (err) { next(err); }
});
