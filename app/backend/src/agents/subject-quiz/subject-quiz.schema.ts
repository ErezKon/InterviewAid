import { z } from 'zod';

export const subjectQuizResponseSchema = z.object({
  subject: z.object({
    id: z.string(),
    title: z.string(),
    sourceFile: z.string(),
  }),
  questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['open', 'multiple-choice']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    question: z.string(),
    options: z.array(z.string()).optional(),
    expectedAnswer: z.string(),
    referenceQuote: z.string(),
    followUp: z.string().optional(),
  })),
  studyTips: z.array(z.string()),
});

export type SubjectQuizResponse = z.infer<typeof subjectQuizResponseSchema>;
