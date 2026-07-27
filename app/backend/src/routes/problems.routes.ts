import { Router } from 'express';
import { problemsQuerySchema, problemDetailParamsSchema } from '../types/api.types.js';
import { queryProblems, getProblemBySlug, getProblemSolution, getRandomProblem } from '../services/problem.service.js';

export const problemsRouter = Router();

problemsRouter.get('/problems', (req, res, next) => {
  try {
    const parsed = problemsQuerySchema.parse(req.query);
    const { items, total } = queryProblems({
      companies: parsed.companies,
      difficulties: parsed.difficulties,
      topics: parsed.topics,
      patterns: parsed.patterns,
      seniority: parsed.seniority,
      minAcceptance: parsed.minAcceptance,
      maxAcceptance: parsed.maxAcceptance,
      minInterviewValue: parsed.minInterviewValue,
      hasSolution: parsed.hasSolution,
      q: parsed.q,
      matchMode: parsed.matchMode,
      sort: parsed.sort,
      order: parsed.order,
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
        appliedFilters: {
          companies: parsed.companies,
          difficulties: parsed.difficulties,
          topics: parsed.topics,
          patterns: parsed.patterns,
          seniority: parsed.seniority,
          q: parsed.q,
          matchMode: parsed.matchMode,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

problemsRouter.get('/problems/random', (req, res, next) => {
  try {
    const parsed = problemsQuerySchema.parse(req.query);
    const item = getRandomProblem({
      difficulties: parsed.difficulties,
      topics: parsed.topics,
      companies: parsed.companies,
    });
    if (!item) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No matching problems found' } });
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

problemsRouter.get('/problems/:slug', (req, res, next) => {
  try {
    const { slug } = problemDetailParamsSchema.parse(req.params);
    const detail = getProblemBySlug(slug);
    res.json({ data: detail });
  } catch (err) {
    next(err);
  }
});

problemsRouter.get('/problems/:slug/solution', (req, res, next) => {
  try {
    const { slug } = problemDetailParamsSchema.parse(req.params);
    const solution = getProblemSolution(slug);
    res.json({ data: solution });
  } catch (err) {
    next(err);
  }
});
