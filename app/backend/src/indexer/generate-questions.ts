import { getDb, initSchema } from '../db/connection.js';
import { generateQuestionsForSubject } from '../services/quiz-generator.service.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('generate-questions');

const DELAY_BETWEEN_SUBJECTS_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateQuestions(force = false, modelId?: string): Promise<void> {
  const db = getDb();
  initSchema();

  // Ensure subject_questions table exists
  db.exec(`CREATE TABLE IF NOT EXISTS subject_questions (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('open', 'multiple-choice')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question TEXT NOT NULL,
    options TEXT,
    expected_answer TEXT NOT NULL,
    reference_quote TEXT NOT NULL,
    follow_up TEXT,
    generated_at TEXT NOT NULL,
    model_id TEXT
  )`);
  db.exec('CREATE INDEX IF NOT EXISTS idx_sq_subject ON subject_questions(subject_id)');

  const subjects = db.prepare(
    'SELECT id, title, body_md, word_count FROM subjects ORDER BY main_subject, title'
  ).all() as { id: string; title: string; body_md: string; word_count: number }[];

  if (subjects.length === 0) {
    log.warn('No subjects found in DB. Run parse and build stages first.');
    return;
  }

  log.info(`Found ${subjects.length} subjects`);

  // Determine which subjects need questions
  const existingCounts = db.prepare(
    'SELECT subject_id, COUNT(*) as cnt FROM subject_questions GROUP BY subject_id'
  ).all() as { subject_id: string; cnt: number }[];
  const existingMap = new Map(existingCounts.map(r => [r.subject_id, r.cnt]));

  const toProcess = force
    ? subjects
    : subjects.filter(s => !existingMap.has(s.id));

  if (toProcess.length === 0) {
    log.info('All subjects already have questions. Use --force to regenerate.');
    return;
  }

  log.info(`Generating questions for ${toProcess.length} subjects${force ? ' (force mode)' : ''}...`);

  const insertQuestion = db.prepare(`INSERT OR REPLACE INTO subject_questions (
    id, subject_id, type, difficulty, question, options,
    expected_answer, reference_quote, follow_up, generated_at, model_id
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const deleteForSubject = db.prepare('DELETE FROM subject_questions WHERE subject_id = ?');

  let successCount = 0;
  let failCount = 0;
  let totalQuestions = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const subject = toProcess[i];
    log.info(`[${i + 1}/${toProcess.length}] ${subject.title}`);

    try {
      const questions = await generateQuestionsForSubject({
        id: subject.id,
        title: subject.title,
        bodyMd: subject.body_md,
        wordCount: subject.word_count,
      }, modelId);

      if (questions.length === 0) {
        log.warn(`  No valid questions generated for "${subject.title}"`);
        failCount++;
        continue;
      }

      // Replace existing questions for this subject
      db.exec('BEGIN');
      try {
        deleteForSubject.run(subject.id);
        const now = new Date().toISOString();
        for (const q of questions) {
          insertQuestion.run(
            q.id, q.subjectId, q.type, q.difficulty, q.question,
            q.options ? JSON.stringify(q.options) : null,
            q.expectedAnswer, q.referenceQuote, q.followUp ?? null,
            now, modelId ?? 'default',
          );
        }
        db.exec('COMMIT');
        totalQuestions += questions.length;
        successCount++;
        log.info(`  Saved ${questions.length} questions`);
      } catch (dbErr) {
        db.exec('ROLLBACK');
        throw dbErr;
      }
    } catch (err) {
      log.error(`  Failed: ${(err as Error).message}`);
      failCount++;
    }

    // Rate limit between subjects
    if (i < toProcess.length - 1) {
      await sleep(DELAY_BETWEEN_SUBJECTS_MS);
    }
  }

  log.info('=== Question Generation Summary ===');
  log.info(`  Subjects processed: ${successCount} succeeded, ${failCount} failed`);
  log.info(`  Total questions generated: ${totalQuestions}`);

  const totalInDb = (db.prepare('SELECT COUNT(*) as c FROM subject_questions').get() as { c: number }).c;
  log.info(`  Total questions in DB: ${totalInDb}`);
}
