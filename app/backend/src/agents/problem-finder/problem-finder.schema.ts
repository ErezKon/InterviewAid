import { z } from 'zod';

export const problemFinderResponseSchema = z.object({
  intent: z.enum(['find_problems', 'explain', 'hint', 'clarify']),
  summary: z.string(),
  interpretedFilters: z.object({
    companies: z.array(z.string()),
    difficulties: z.array(z.string()),
    topics: z.array(z.string()),
    seniority: z.string().nullable(),
  }),
  problems: z.array(z.object({
    slug: z.string(),
    title: z.string(),
    difficulty: z.string(),
    topics: z.array(z.string()),
    companies: z.array(z.string()),
    why: z.string(),
  })),
  hints: z.array(z.object({
    slug: z.string(),
    level: z.number(),
    text: z.string(),
  })).optional(),
  followUpSuggestions: z.array(z.string()),
});

export type ProblemFinderResponse = z.infer<typeof problemFinderResponseSchema>;
