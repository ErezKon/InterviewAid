import fs from 'node:fs';
import path from 'node:path';
import { getDb, initSchema, closeDb } from '../db/connection.js';
import { METADATA_DIR } from '../config/paths.js';
import { TAXONOMY, TAXONOMY_MAP } from './taxonomy.js';
import { Problem, Subject } from '../types/problem.types.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('build-db');

export async function buildDb(): Promise<void> {
  const problemsPath = path.join(METADATA_DIR, 'problems.json');
  const subjectsPath = path.join(METADATA_DIR, 'subjects.json');

  if (!fs.existsSync(problemsPath)) {
    log.error('problems.json not found. Run parse stage first.');
    process.exit(1);
  }

  const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  log.info(`Loaded ${problems.length} problems`);

  let subjects: Subject[] = [];
  if (fs.existsSync(subjectsPath)) {
    subjects = JSON.parse(fs.readFileSync(subjectsPath, 'utf-8'));
    log.info(`Loaded ${subjects.length} subjects`);
  }

  const db = getDb();
  initSchema();

  const now = new Date().toISOString();

  // Drop and recreate content tables (never touch chat/session tables)
  const contentTables = [
    'problem_patterns', 'problem_companies', 'problem_topics',
    'subject_topics', 'problems', 'subjects', 'topics', 'companies',
  ];

  db.exec('BEGIN TRANSACTION');

  try {
    // Clear content tables
    for (const table of contentTables) {
      db.exec(`DELETE FROM ${table}`);
    }

    // Drop and recreate FTS tables
    db.exec('DROP TABLE IF EXISTS problems_fts');
    db.exec('DROP TABLE IF EXISTS subjects_fts');
    db.exec(`CREATE VIRTUAL TABLE problems_fts USING fts5(
      slug UNINDEXED, title, one_liner, description_md, solution_md, patterns,
      tokenize='porter unicode61'
    )`);
    db.exec(`CREATE VIRTUAL TABLE subjects_fts USING fts5(
      id UNINDEXED, title, key_concepts, body_md, tokenize='porter unicode61'
    )`);

    // Insert topics
    const insertTopic = db.prepare('INSERT OR REPLACE INTO topics (id, label, kind) VALUES (?, ?, ?)');
    for (const t of TAXONOMY) {
      const kind = t.id.startsWith('theory-') ? 'theory'
        : ['system-design', 'oop-design', 'data-structures-design'].includes(t.id) ? 'design'
        : 'algorithmic';
      insertTopic.run(t.id, t.label, kind);
    }
    log.info(`Inserted ${TAXONOMY.length} topics`);

    // Insert problems
    const insertProblem = db.prepare(`INSERT INTO problems (
      slug, leetcode_id, title, difficulty, acceptance, url, file_path,
      primary_topic, seniority, interview_value, one_liner, has_solution,
      description_md, examples_md, solution_md, complexity_md, follow_ups_md, takeaway_md,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    const insertProblemTopic = db.prepare('INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)');
    const insertProblemCompany = db.prepare('INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)');
    const insertProblemPattern = db.prepare('INSERT OR IGNORE INTO problem_patterns (problem_slug, pattern) VALUES (?, ?)');
    const insertProblemFts = db.prepare('INSERT INTO problems_fts (slug, title, one_liner, description_md, solution_md, patterns) VALUES (?, ?, ?, ?, ?, ?)');

    const companyMap = new Map<string, { name: string; count: number }>();

    for (const p of problems) {
      insertProblem.run(
        p.slug, p.leetcodeId, p.title, p.difficulty, p.acceptance, p.url, p.filePath,
        p.primaryTopic, p.seniority, p.interviewValue, p.oneLiner,
        p.hasSolution ? 1 : 0,
        p.descriptionMd, p.examplesMd, p.solutionMd, p.complexityMd,
        p.followUpsMd, p.takeawayMd, now,
      );

      for (const topic of p.topics) {
        insertProblemTopic.run(p.slug, topic);
      }

      for (const comp of p.companies) {
        insertProblemCompany.run(p.slug, comp.slug, comp.frequency);
        const existing = companyMap.get(comp.slug);
        if (existing) {
          existing.count++;
        } else {
          companyMap.set(comp.slug, { name: comp.name, count: 1 });
        }
      }

      for (const pattern of p.patterns) {
        insertProblemPattern.run(p.slug, pattern);
      }

      insertProblemFts.run(
        p.slug, p.title, p.oneLiner ?? '',
        p.descriptionMd ?? '', p.solutionMd ?? '',
        p.patterns.join(', '),
      );
    }
    log.info(`Inserted ${problems.length} problems`);

    // Insert companies
    const insertCompany = db.prepare('INSERT OR REPLACE INTO companies (slug, name, problem_count) VALUES (?, ?, ?)');
    for (const [slug, { name, count }] of companyMap) {
      insertCompany.run(slug, name, count);
    }
    log.info(`Inserted ${companyMap.size} companies`);

    // Insert subjects
    const insertSubject = db.prepare(`INSERT INTO subjects (
      id, title, source_file, heading_level, main_subject, sub_subject,
      primary_topic, key_concepts, word_count, body_md, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertSubjectTopic = db.prepare('INSERT OR IGNORE INTO subject_topics (subject_id, topic_id) VALUES (?, ?)');
    const insertSubjectFts = db.prepare('INSERT INTO subjects_fts (id, title, key_concepts, body_md) VALUES (?, ?, ?, ?)');

    for (const s of subjects) {
      insertSubject.run(
        s.id, s.title, s.sourceFile, s.level,
        s.mainSubject, s.subSubject,
        s.primaryTopic, JSON.stringify(s.keyConcepts),
        s.wordCount, s.bodyMd, now,
      );

      for (const topic of s.topics) {
        insertSubjectTopic.run(s.id, topic);
      }

      insertSubjectFts.run(s.id, s.title, s.keyConcepts.join(', '), s.bodyMd);
    }
    log.info(`Inserted ${subjects.length} subjects`);

    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  // Vacuum
  db.exec('VACUUM');
  log.info('VACUUM complete');

  // Generate filters.json
  const filtersData = {
    companies: db.prepare('SELECT slug, name, problem_count AS problemCount FROM companies ORDER BY problem_count DESC').all(),
    difficulties: ['Easy', 'Medium', 'Hard'],
    topics: db.prepare(`
      SELECT t.id, t.label, t.kind, COUNT(pt.problem_slug) AS problemCount
      FROM topics t
      LEFT JOIN problem_topics pt ON pt.topic_id = t.id
      GROUP BY t.id
      ORDER BY problemCount DESC
    `).all(),
    seniority: ['junior', 'mid', 'senior', 'staff', 'principal'],
  };

  const filtersPath = path.join(METADATA_DIR, 'filters.json');
  fs.writeFileSync(filtersPath, JSON.stringify(filtersData, null, 2));
  log.info(`Wrote filters.json`);

  // Print summary
  const stats = {
    problems: db.prepare('SELECT COUNT(*) as c FROM problems').get() as { c: number },
    subjects: db.prepare('SELECT COUNT(*) as c FROM subjects').get() as { c: number },
    companies: db.prepare('SELECT COUNT(*) as c FROM companies').get() as { c: number },
    topics: db.prepare('SELECT COUNT(*) as c FROM topics').get() as { c: number },
    problemTopics: db.prepare('SELECT COUNT(*) as c FROM problem_topics').get() as { c: number },
    problemCompanies: db.prepare('SELECT COUNT(*) as c FROM problem_companies').get() as { c: number },
    patterns: db.prepare('SELECT COUNT(*) as c FROM problem_patterns').get() as { c: number },
  };

  log.info('=== Build Summary ===');
  log.info(`  Problems:          ${stats.problems.c}`);
  log.info(`  Subjects:          ${stats.subjects.c}`);
  log.info(`  Companies:         ${stats.companies.c}`);
  log.info(`  Topics:            ${stats.topics.c}`);
  log.info(`  Problem-Topics:    ${stats.problemTopics.c}`);
  log.info(`  Problem-Companies: ${stats.problemCompanies.c}`);
  log.info(`  Patterns:          ${stats.patterns.c}`);

  closeDb();
}
