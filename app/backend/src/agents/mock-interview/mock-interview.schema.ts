import { z } from 'zod';

export const mockInterviewResponseSchema = z.object({
  stage: z.enum(['plan', 'ask_basic', 'probe', 'expand', 'hint', 'feedback', 'next', 'end']),
  currentProblemSlug: z.string().nullable(),
  questionText: z.string(),
  hintsGiven: z.number(),
  evaluation: z.object({
    correctness: z.number().min(1).max(5),
    complexity: z.number().min(1).max(5),
    communication: z.number().min(1).max(5),
    edgeCases: z.number().min(1).max(5),
    notes: z.string(),
  }).optional(),
  sessionProgress: z.object({
    step: z.number(),
    total: z.number(),
  }),
  nextAction: z.enum(['wait_for_answer', 'next_problem', 'end_interview']),
});

export type MockInterviewResponse = z.infer<typeof mockInterviewResponseSchema>;
