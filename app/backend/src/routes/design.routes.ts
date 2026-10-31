import { Router } from 'express';
import { designQuerySchema, problemDetailParamsSchema } from '../types/api.types.js';
import {
  queryDesignProblems, getDesignProblemBySlug, getRandomDesignProblem, getDesignCategories,
} from '../services/design.service.js';

export const designRouter = Router();

designRouter.get('/design', (req, res, next) => {
  try {
    const parsed = designQuerySchema.parse(req.query);
    const { items, total } = queryDesignProblems(parsed);
    res.json({
      data: items,
      meta: {
        page: parsed.page,
        pageSize: parsed.pageSize,
        total,
        totalPages: Math.ceil(total / parsed.pageSize),
        appliedFilters: {
          q: parsed.q,
          categories: parsed.categories,
          difficulties: parsed.difficulties,
          seniority: parsed.seniority,
          companies: parsed.companies,
          tags: parsed.tags,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

designRouter.get('/design/categories', (_req, res, next) => {
  try {
    res.json({ data: getDesignCategories() });
  } catch (err) {
    next(err);
  }
});

designRouter.get('/design/random', (req, res, next) => {
  try {
    const item = getRandomDesignProblem(designQuerySchema.parse(req.query));
    if (!item) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No matching design problems found' } });
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

designRouter.get('/design/:slug', (req, res, next) => {
  try {
    const { slug } = problemDetailParamsSchema.parse(req.params);
    res.json({ data: getDesignProblemBySlug(slug) });
  } catch (err) {
    next(err);
  }
});
