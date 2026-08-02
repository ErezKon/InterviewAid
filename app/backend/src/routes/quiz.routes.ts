import { Router } from 'express';
import { z } from 'zod';
import { getQuizStats, getQuestionsBySubjects, regenerateQuestions } from '../services/quiz.service.js';

export const quizRouter = Router();

const quizQuerySchema = z.object({
  subjects: z.string().transform(v => v.split(',').map(s => s.trim()).filter(Boolean)),
  limit: z.coerce.number().int().min(1).max(200).optional(),
  shuffle: z.enum(['true', 'false']).default('true').transform(v => v === 'true'),
});

quizRouter.get('/quiz/stats', (_req, res, next) => {
  try {
    const stats = getQuizStats();
    res.json({ data: stats });
  } catch (err) {
    next(err);
  }
});

quizRouter.get('/quiz', (req, res, next) => {
  try {
    const parsed = quizQuerySchema.parse(req.query);
    const questions = getQuestionsBySubjects(parsed.subjects, {
      limit: parsed.limit,
      shuffle: parsed.shuffle,
    });
    res.json({ data: questions, meta: { total: questions.length } });
  } catch (err) {
    next(err);
  }
});

quizRouter.post('/quiz/regenerate/:subjectId', async (req, res, next) => {
  try {
    const subjectId = req.params.subjectId;
    const modelId = req.body?.modelId;
    const questions = await regenerateQuestions(subjectId, modelId);
    res.json({ data: questions, meta: { total: questions.length } });
  } catch (err) {
    next(err);
  }
});
