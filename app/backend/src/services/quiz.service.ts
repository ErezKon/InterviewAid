import { getDb } from '../db/connection.js';
import { NotFoundError } from '../utils/errors.js';
import { generateQuestionsForSubject } from './quiz-generator.service.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('quiz-service');

export interface QuizQuestion {
  id: string;
  subjectId: string;
  subjectTitle: string;
  mainSubject: string;
  type: 'open' | 'multiple-choice';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  expectedAnswer: string;
  referenceQuote: string;
  followUp?: string;
}

export interface QuizSubjectInfo {
  id: string;
  title: string;
  questionCount: number;
}

export interface QuizStatsGroup {
  mainSubject: string;
  subjects: QuizSubjectInfo[];
  totalQuestions: number;
}

export function getQuizStats(): QuizStatsGroup[] {
  const db = getDb();

  const rows = db.prepare(`
    SELECT s.id, s.title, s.main_subject,
           COUNT(sq.id) as question_count
    FROM subjects s
    LEFT JOIN subject_questions sq ON sq.subject_id = s.id
    GROUP BY s.id
    ORDER BY s.main_subject ASC, s.title ASC
  `).all() as { id: string; title: string; main_subject: string; question_count: number }[];

  const groupMap = new Map<string, QuizStatsGroup>();

  for (const row of rows) {
    let group = groupMap.get(row.main_subject);
    if (!group) {
      group = { mainSubject: row.main_subject, subjects: [], totalQuestions: 0 };
      groupMap.set(row.main_subject, group);
    }
    group.subjects.push({
      id: row.id,
      title: row.title,
      questionCount: row.question_count,
    });
    group.totalQuestions += row.question_count;
  }

  return Array.from(groupMap.values());
}

export function getQuestionsBySubjects(
  subjectIds: string[],
  options: { limit?: number; shuffle?: boolean } = {},
): QuizQuestion[] {
  const db = getDb();
  const { limit, shuffle = true } = options;

  if (subjectIds.length === 0) return [];

  const placeholders = subjectIds.map((_, i) => `:sid_${i}`);
  const params: Record<string, unknown> = {};
  subjectIds.forEach((id, i) => { params[`sid_${i}`] = id; });

  let sql = `
    SELECT sq.*, s.title as subject_title, s.main_subject
    FROM subject_questions sq
    JOIN subjects s ON s.id = sq.subject_id
    WHERE sq.subject_id IN (${placeholders.join(',')})
  `;

  if (shuffle) {
    sql += ' ORDER BY RANDOM()';
  } else {
    sql += ' ORDER BY sq.subject_id, sq.id';
  }

  if (limit) {
    sql += ` LIMIT :limit`;
    params.limit = limit;
  }

  const rows = db.prepare(sql).all(params) as any[];

  return rows.map(mapRowToQuestion);
}

export async function regenerateQuestions(subjectId: string, modelId?: string): Promise<QuizQuestion[]> {
  const db = getDb();

  const subject = db.prepare('SELECT id, title, body_md, word_count FROM subjects WHERE id = ?').get(subjectId) as
    { id: string; title: string; body_md: string; word_count: number } | undefined;

  if (!subject) throw new NotFoundError('Subject', subjectId);

  log.info(`Regenerating questions for "${subject.title}"`);

  const questions = await generateQuestionsForSubject({
    id: subject.id,
    title: subject.title,
    bodyMd: subject.body_md,
    wordCount: subject.word_count,
  }, modelId);

  if (questions.length === 0) {
    log.warn('LLM returned no valid questions');
    return [];
  }

  // Replace existing questions
  db.exec('BEGIN');
  try {
    db.prepare('DELETE FROM subject_questions WHERE subject_id = ?').run(subjectId);

    const insert = db.prepare(`INSERT INTO subject_questions (
      id, subject_id, type, difficulty, question, options,
      expected_answer, reference_quote, follow_up, generated_at, model_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    const now = new Date().toISOString();
    for (const q of questions) {
      insert.run(
        q.id, q.subjectId, q.type, q.difficulty, q.question,
        q.options ? JSON.stringify(q.options) : null,
        q.expectedAnswer, q.referenceQuote, q.followUp ?? null,
        now, modelId ?? 'default',
      );
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  // Return the newly generated questions with subject info
  return getQuestionsBySubjects([subjectId], { shuffle: false });
}

function mapRowToQuestion(row: any): QuizQuestion {
  return {
    id: row.id,
    subjectId: row.subject_id,
    subjectTitle: row.subject_title,
    mainSubject: row.main_subject,
    type: row.type,
    difficulty: row.difficulty,
    question: row.question,
    options: row.options ? JSON.parse(row.options) : undefined,
    expectedAnswer: row.expected_answer,
    referenceQuote: row.reference_quote,
    followUp: row.follow_up || undefined,
  };
}
