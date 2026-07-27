import { Router } from 'express';
import { subjectsQuerySchema, problemDetailParamsSchema } from '../types/api.types.js';
import { querySubjects, getSubjectById } from '../services/subject.service.js';

export const subjectsRouter = Router();

subjectsRouter.get('/subjects', (req, res, next) => {
  try {
    const parsed = subjectsQuerySchema.parse(req.query);
    const { items, total } = querySubjects({
      topics: parsed.topics,
      sourceFile: parsed.sourceFile,
      q: parsed.q,
      page: parsed.page,
      pageSize: parsed.pageSize,
    });

    res.json({
      data: items,
      meta: {
        page: parsed.page,
        pageSize: parsed.pageSize,
        total,
        totalPages: Math.ceil(total / parsed.pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
});

subjectsRouter.get('/subjects/:slug', (req, res, next) => {
  try {
    const id = req.params.slug;
    const detail = getSubjectById(id);
    res.json({ data: detail });
  } catch (err) {
    next(err);
  }
});
