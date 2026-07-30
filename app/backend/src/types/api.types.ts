import { z } from 'zod';

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  appliedFilters?: Record<string, unknown>;
}

// Helper: parse CSV or repeated query param into string[]
function csvArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.flatMap(v => String(v).split(',').map(s => s.trim()).filter(Boolean));
  if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
  return [];
}

const csvArraySchema = z.preprocess(csvArray, z.array(z.string()));
const optionalCsvArray = csvArraySchema.optional();

export const problemsQuerySchema = z.object({
  companies: optionalCsvArray,
  difficulties: optionalCsvArray,
  topics: optionalCsvArray,
  patterns: optionalCsvArray,
  seniority: z.string().optional(),
  minAcceptance: z.coerce.number().optional(),
  maxAcceptance: z.coerce.number().optional(),
  minInterviewValue: z.coerce.number().int().min(1).max(5).optional(),
  hasSolution: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  q: z.string().optional(),
  matchMode: z.enum(['any', 'all']).default('any'),
  sort: z.enum(['title', 'difficulty', 'acceptance', 'interviewValue', 'companyFrequency']).default('interviewValue'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export type ProblemsQuery = z.infer<typeof problemsQuerySchema>;

export const problemDetailParamsSchema = z.object({
  slug: z.string().min(1),
});

export const subjectsQuerySchema = z.object({
  topics: optionalCsvArray,
  sourceFile: z.string().optional(),
  mainSubject: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
});

export type SubjectsQuery = z.infer<typeof subjectsQuerySchema>;

export const companiesQuerySchema = z.object({
  q: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export const chatBodySchema = z.object({
  message: z.string().min(1),
  modelId: z.string().optional(),
  threadId: z.string().optional(),
  mode: z.enum(['auto', 'find-problems', 'mock-interview', 'subject-quiz', 'content-enricher']).default('auto'),
  stream: z.boolean().default(true),
  context: z.object({
    subjectId: z.string().optional(),
    problemSlug: z.string().optional(),
    filters: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
});

export type ChatBody = z.infer<typeof chatBodySchema>;
