import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, MATERIAL_DIR, METADATA_DIR, PROBLEMS_DIR } from '../config/paths.js';
import { Problem, Subject } from '../types/problem.types.js';
import { getDb } from '../db/connection.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('upload-service');

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProgressCallback = (event: string, data: unknown) => void;

export interface UploadMeta {
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject?: string;
  subSubject?: string;
  classification?: string;
  subClassification?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface UploadResult {
  type: string;
  filesProcessed: number;
  items: { id: string; title: string; filePath: string }[];
  message: string;
}

// ---------------------------------------------------------------------------
// Helpers (reuse patterns from parse-theory-md.ts / parse-problem-md.ts)
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Derive a human-readable sub-subject from a filename. */
function deriveSubSubject(filename: string): string {
  const base = filename.replace(/\.md$/i, '');
  const stripped = base.replace(/^\d+[-\s]+/, '');
  return stripped
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Strip leading number prefix from a heading. */
function stripHeadingNumber(heading: string): string {
  return heading
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/^Part\s+[IVXLCDM\d]+\s*[—–\-:]\s*/i, '');
}

/** Sanitize a filename: strip directory components and prevent traversal. */
function sanitizeFilename(name: string): string {
  // Replace special characters BEFORE path.basename to prevent
  // path separators (/) from truncating the filename.
  const cleaned = name
    .replace(/&/g, 'And')    // "Anti-Patterns & Common Pitfalls" → "Anti-Patterns And Common Pitfalls"
    .replace(/\//g, '-');     // "React 18/19" → "React 18-19"
  return path.basename(cleaned).replace(/[^\w\s\-().]/g, '_');
}

// ---------------------------------------------------------------------------
// Subject (Material) Builder
// ---------------------------------------------------------------------------

function buildSubjectEntry(
  content: string,
  relativePath: string,
  mainSubject: string,
  subSubject: string | null,
  seenIds: Set<string>,
): Subject {
  const mainSlug = slugify(mainSubject);
  const subSlug = subSubject ? slugify(subSubject) : slugify(path.basename(relativePath, '.md'));

  // Derive title from first H1 or H2
  let title: string | null = null;
  const firstH1 = content.match(/^# (.+)/m);
  const firstH2 = content.match(/^## (.+)/m);
  if (firstH1) {
    const h1Pos = content.indexOf(firstH1[0]);
    const h2Pos = firstH2 ? content.indexOf(firstH2[0]) : Infinity;
    if (h1Pos < h2Pos) {
      title = stripHeadingNumber(firstH1[1].trim());
    }
  }
  if (!title && firstH2) {
    title = stripHeadingNumber(firstH2[1].trim());
  }
  if (!title) {
    title = subSubject ?? deriveSubSubject(path.basename(relativePath));
  }

  let id = [mainSlug, subSlug].filter(Boolean).join('--');
  if (seenIds.has(id)) {
    let counter = 2;
    while (seenIds.has(`${id}-${counter}`)) counter++;
    id = `${id}-${counter}`;
  }
  seenIds.add(id);

  return {
    id,
    sourceFile: relativePath,
    title,
    level: 1,
    bodyMd: content.trim(),
    wordCount: countWords(content),
    mainSubject,
    subSubject,
    primaryTopic: null,
    topics: [],
    keyConcepts: [],
  };
}

// ---------------------------------------------------------------------------
// Problem Builder
// ---------------------------------------------------------------------------

interface MdSection { heading: string; body: string }

function splitSections(content: string): MdSection[] {
  const lines = content.split('\n');
  const sections: MdSection[] = [];
  let heading = '';
  let body: string[] = [];

  for (const line of lines) {
    const match = line.match(/^## (.+)/);
    if (match) {
      if (heading || body.length > 0) {
        sections.push({ heading, body: body.join('\n').trim() });
      }
      heading = match[1].trim();
      body = [];
    } else {
      body.push(line);
    }
  }
  if (heading || body.length > 0) {
    sections.push({ heading, body: body.join('\n').trim() });
  }
  return sections;
}

function findSection(sections: MdSection[], pattern: RegExp): string | null {
  const match = sections.find(s => pattern.test(s.heading));
  return match ? match.body : null;
}

function concatSections(sections: MdSection[], pattern: RegExp): string | null {
  const matches = sections.filter(s => pattern.test(s.heading));
  if (matches.length === 0) return null;
  return matches.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n---\n\n');
}

function buildProblemEntry(
  content: string,
  relativePath: string,
  meta: UploadMeta,
  seenSlugs: Set<string>,
): Problem {
  // Parse header: # <id>. <title>
  const headerMatch = content.match(/^#\s+(\d+)\.\s+(.+)$/m);
  const leetcodeId = headerMatch ? parseInt(headerMatch[1], 10) : null;
  const title = headerMatch ? headerMatch[2].trim() : meta.title;

  // Parse metadata fields from content
  const difficultyMatch = content.match(/\*\*Difficulty:\*\*\s*(.+)/);
  const acceptanceMatch = content.match(/\*\*Acceptance:\*\*\s*(.+)/);
  const urlMatch = content.match(/\*\*LeetCode:\*\*\s*\[?([^\]\s)]+)/);
  const companiesMatch = content.match(/\*\*Companies?:\*\*\s*(.+)/);

  let difficulty: 'Easy' | 'Medium' | 'Hard' = meta.difficulty ?? 'Medium';
  if (difficultyMatch) {
    const clean = difficultyMatch[1].replace(/[🟢🟡🔴⚪️\s]/g, '').trim();
    if (/easy/i.test(clean)) difficulty = 'Easy';
    else if (/medium/i.test(clean)) difficulty = 'Medium';
    else if (/hard/i.test(clean)) difficulty = 'Hard';
  }

  let acceptance: number | null = null;
  if (acceptanceMatch) {
    const m = acceptanceMatch[1].match(/([\d.]+)%?/);
    if (m) acceptance = parseFloat(m[1]);
  }

  let url: string | null = null;
  if (urlMatch) {
    const rawUrl = urlMatch[1].replace(/[[\]()]/g, '');
    url = rawUrl.startsWith('http') ? rawUrl : null;
  }

  const companies: Problem['companies'] = [];
  if (companiesMatch) {
    companiesMatch[1]
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)
      .forEach(name => companies.push({ slug: slugify(name), name, frequency: null }));
  }

  const sections = splitSections(content);
  const descriptionMd = findSection(sections, /problem description/i);
  const examplesMd = findSection(sections, /examples?/i);
  const solutionMd = concatSections(sections, /approach|solution|walkthrough|handling/i);
  const complexityMd = findSection(sections, /complexity/i);
  const followUpsMd = findSection(sections, /follow[- ]?up/i);
  const takeawayMd = findSection(sections, /key takeaway/i);

  let slug = slugify(title);
  if (seenSlugs.has(slug) && leetcodeId !== null) {
    slug = `${slug}-${leetcodeId}`;
  }
  let counter = 2;
  while (seenSlugs.has(slug)) {
    slug = `${slugify(title)}-${counter++}`;
  }
  seenSlugs.add(slug);

  return {
    slug,
    leetcodeId,
    title,
    difficulty,
    acceptance,
    url,
    filePath: relativePath,
    companies,
    descriptionMd,
    examplesMd,
    solutionMd,
    complexityMd,
    followUpsMd,
    takeawayMd,
    hasSolution: !!solutionMd && solutionMd.length > 50,
    primaryTopic: meta.classification ?? null,
    topics: [meta.classification, meta.subClassification].filter((t): t is string => !!t),
    patterns: [],
    seniority: null,
    interviewValue: null,
    oneLiner: null,
  };
}

// ---------------------------------------------------------------------------
// DB Incremental Insert Helpers
// ---------------------------------------------------------------------------

function insertSubjectsIntoDb(subjects: Subject[]): void {
  const db = getDb();
  const now = new Date().toISOString();

  const insertSubject = db.prepare(`INSERT OR REPLACE INTO subjects (
    id, title, source_file, heading_level, main_subject, sub_subject,
    primary_topic, key_concepts, word_count, body_md, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const insertTopic = db.prepare(
    'INSERT OR IGNORE INTO subject_topics (subject_id, topic_id) VALUES (?, ?)',
  );

  // FTS: virtual tables may not exist if the indexer build step hasn't run
  let hasFts = true;
  try {
    db.prepare('DELETE FROM subjects_fts WHERE 0').run();
  } catch {
    hasFts = false;
    log.warn('subjects_fts table not available — FTS indexing will be skipped');
  }

  const tx = db.transaction(() => {
    for (const s of subjects) {
      insertSubject.run(
        s.id, s.title, s.sourceFile, s.level,
        s.mainSubject, s.subSubject,
        s.primaryTopic, JSON.stringify(s.keyConcepts),
        s.wordCount, s.bodyMd, now,
      );

      for (const topic of s.topics) {
        insertTopic.run(s.id, topic);
      }

      if (hasFts) {
        try {
          db.prepare('DELETE FROM subjects_fts WHERE id = ?').run(s.id);
          db.prepare(
            'INSERT INTO subjects_fts (id, title, key_concepts, body_md) VALUES (?, ?, ?, ?)',
          ).run(s.id, s.title, s.keyConcepts.join(', '), s.bodyMd);
        } catch {
          log.warn(`FTS insert failed for subject ${s.id}`);
        }
      }
    }
  });
  tx();
}

function insertProblemsIntoDb(problems: Problem[]): void {
  const db = getDb();
  const now = new Date().toISOString();

  const insertProblem = db.prepare(`INSERT OR REPLACE INTO problems (
    slug, leetcode_id, title, difficulty, acceptance, url, file_path,
    primary_topic, seniority, interview_value, one_liner, has_solution,
    description_md, examples_md, solution_md, complexity_md, follow_ups_md, takeaway_md,
    updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const insertTopic = db.prepare(
    'INSERT OR IGNORE INTO problem_topics (problem_slug, topic_id) VALUES (?, ?)',
  );
  const insertPattern = db.prepare(
    'INSERT OR IGNORE INTO problem_patterns (problem_slug, pattern) VALUES (?, ?)',
  );
  const insertCompany = db.prepare(
    'INSERT OR IGNORE INTO problem_companies (problem_slug, company_slug, frequency) VALUES (?, ?, ?)',
  );

  // FTS: virtual tables may not exist if the indexer build step hasn't run
  let hasFts = true;
  try {
    db.prepare('DELETE FROM problems_fts WHERE 0').run();
  } catch {
    hasFts = false;
    log.warn('problems_fts table not available — FTS indexing will be skipped');
  }

  const tx = db.transaction(() => {
    for (const p of problems) {
      // primary_topic is NOT NULL in schema — use a fallback if unclassified
      const primaryTopic = p.primaryTopic || 'uncategorized';

      insertProblem.run(
        p.slug, p.leetcodeId, p.title, p.difficulty, p.acceptance, p.url, p.filePath,
        primaryTopic, p.seniority, p.interviewValue, p.oneLiner,
        p.hasSolution ? 1 : 0,
        p.descriptionMd, p.examplesMd, p.solutionMd, p.complexityMd,
        p.followUpsMd, p.takeawayMd, now,
      );

      for (const topic of p.topics) {
        insertTopic.run(p.slug, topic);
      }

      for (const pattern of p.patterns) {
        insertPattern.run(p.slug, pattern);
      }

      for (const comp of p.companies) {
        insertCompany.run(p.slug, comp.slug, comp.frequency);
      }

      if (hasFts) {
        try {
          db.prepare('DELETE FROM problems_fts WHERE slug = ?').run(p.slug);
          db.prepare(
            'INSERT INTO problems_fts (slug, title, one_liner, description_md, solution_md, patterns) VALUES (?, ?, ?, ?, ?, ?)',
          ).run(
            p.slug, p.title, p.oneLiner ?? '',
            p.descriptionMd ?? '', p.solutionMd ?? '',
            p.patterns.join(', '),
          );
        } catch {
          log.warn(`FTS insert failed for problem ${p.slug}`);
        }
      }
    }
  });
  tx();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function handleUpload(
  files: Express.Multer.File[],
  meta: UploadMeta,
  progress?: ProgressCallback,
): Promise<UploadResult> {
  if (meta.agentic) {
    return handleAgenticUpload(files, meta, progress!);
  }
  return handleManualUpload(files, meta);
}

// ---------------------------------------------------------------------------
// Non-Agentic (Manual) Upload
// ---------------------------------------------------------------------------

function handleManualUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  if (meta.type === 'material') {
    return handleMaterialUpload(files, meta);
  }
  return handleProblemUpload(files, meta);
}

function handleMaterialUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  const mainSubject = meta.mainSubject || meta.title;
  const subjectDir = path.join(MATERIAL_DIR, mainSubject);
  fs.mkdirSync(subjectDir, { recursive: true });

  const subjectsJsonPath = path.join(METADATA_DIR, 'subjects.json');
  const subjects: Subject[] = fs.existsSync(subjectsJsonPath)
    ? JSON.parse(fs.readFileSync(subjectsJsonPath, 'utf-8'))
    : [];
  const seenIds = new Set(subjects.map(s => s.id));

  const items: UploadResult['items'] = [];
  const newSubjects: Subject[] = [];

  for (const file of files) {
    const content = file.buffer.toString('utf-8');
    const fileName = sanitizeFilename(file.originalname);
    const destPath = path.join(subjectDir, fileName);

    fs.writeFileSync(destPath, content);

    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const subSubject = meta.subSubject || deriveSubSubject(fileName);
    const subject = buildSubjectEntry(content, relativePath, mainSubject, subSubject, seenIds);

    subjects.push(subject);
    newSubjects.push(subject);
    items.push({ id: subject.id, title: subject.title, filePath: relativePath });
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  fs.writeFileSync(subjectsJsonPath, JSON.stringify(subjects, null, 2));
  log.info(`Updated subjects.json — added ${newSubjects.length} entries`);

  insertSubjectsIntoDb(newSubjects);
  log.info(`Inserted ${newSubjects.length} subjects into DB`);

  return {
    type: 'material',
    filesProcessed: files.length,
    items,
    message: `Successfully uploaded ${files.length} material file(s) to ${mainSubject}`,
  };
}

function handleProblemUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  const problemsJsonPath = path.join(METADATA_DIR, 'problems.json');
  const problems: Problem[] = fs.existsSync(problemsJsonPath)
    ? JSON.parse(fs.readFileSync(problemsJsonPath, 'utf-8'))
    : [];
  const seenSlugs = new Set(problems.map(p => p.slug));

  const items: UploadResult['items'] = [];
  const newProblems: Problem[] = [];

  for (const file of files) {
    const content = file.buffer.toString('utf-8');
    const fileName = sanitizeFilename(file.originalname);
    const destPath = path.join(PROBLEMS_DIR, fileName);

    fs.writeFileSync(destPath, content);

    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const problem = buildProblemEntry(content, relativePath, meta, seenSlugs);

    problems.push(problem);
    newProblems.push(problem);
    items.push({ id: problem.slug, title: problem.title, filePath: relativePath });
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  fs.writeFileSync(problemsJsonPath, JSON.stringify(problems, null, 2));
  log.info(`Updated problems.json — added ${newProblems.length} entries`);

  insertProblemsIntoDb(newProblems);
  log.info(`Inserted ${newProblems.length} problems into DB`);

  return {
    type: 'problem',
    filesProcessed: files.length,
    items,
    message: `Successfully uploaded ${files.length} problem file(s)`,
  };
}

// ---------------------------------------------------------------------------
// Agentic Upload
// ---------------------------------------------------------------------------

async function handleAgenticUpload(
  files: Express.Multer.File[],
  meta: UploadMeta,
  progress: ProgressCallback,
): Promise<UploadResult> {
  // Lazy import to avoid circular dependencies and loading agent code on non-agentic paths
  const { createContentUploaderAgent } = await import(
    '../agents/content-uploader/content-uploader.agent.js'
  );
  const { HumanMessage } = await import('@langchain/core/messages');

  progress('status', { phase: 'starting', message: 'Analyzing uploaded files...' });

  // Build file-contents list; shared with the agent tools via UploadContext
  const fileContents = files.map(f => ({
    name: f.originalname,
    content: f.buffer.toString('utf-8'),
  }));

  const { agent } = await createContentUploaderAgent(fileContents);

  const userMessage = [
    `Classify and process these uploaded ${meta.type} file(s).`,
    `Type: ${meta.type}`,
    meta.mainSubject ? `Main Subject Hint: ${meta.mainSubject}` : '',
    meta.subSubject ? `Sub-Subject Hint: ${meta.subSubject}` : '',
    '',
    'Files:',
    ...fileContents.map(f => `--- ${f.name} ---\n${f.content}\n`),
    '',
    `Analyze each file, classify it, ${
      meta.type === 'material'
        ? 'split if it contains multiple distinct topics, '
        : ''
    }and save using save_uploaded_files.`,
  ].filter(Boolean).join('\n');

  const stream = await agent.stream(
    { messages: [new HumanMessage(userMessage)] },
    { recursionLimit: 50 },
  );

  let lastSaveResult: string | null = null;

  // Use a manual async iterator instead of for-await so we can abandon the
  // stream without awaiting the iterator's .return() cleanup — which can
  // hang indefinitely when the underlying LLM request is still in flight.
  const iterator = stream[Symbol.asyncIterator]();
  try {
    while (true) {
      const { done, value: chunk } = await iterator.next();
      if (done) break;

      for (const nodeName of Object.keys(chunk)) {
        const nodeData = chunk[nodeName];
        if (!nodeData?.messages) continue;

        for (const msg of nodeData.messages) {
          // Forward tool call starts
          if (msg.tool_calls?.length) {
            for (const tc of msg.tool_calls) {
              progress('tool', { name: tc.name, phase: 'start' });
            }
          }
          // Forward tool results
          if (msg._getType?.() === 'tool') {
            const content = typeof msg.content === 'string' ? msg.content : '';
            progress('tool', {
              name: (msg as any).name ?? 'tool',
              phase: 'end',
              result: content.slice(0, 300),
            });

            // Capture the last save_uploaded_files result for the response
            if ((msg as any).name === 'save_uploaded_files') {
              lastSaveResult = content;
            }
          }
        }
      }

      // Once save_uploaded_files has returned, we have all the data we need.
      // Stop immediately — the LLM's final prose response adds no value and
      // can hang for minutes waiting for the model to reply.
      if (lastSaveResult) {
        log.info('save_uploaded_files completed — ending agent stream');
        break;
      }
    }
  } finally {
    // Fire-and-forget stream cleanup so we never block the response
    iterator.return?.().catch(() => {});
  }

  progress('status', { phase: 'complete', message: 'Upload processing complete' });

  // Try to extract items from the save tool result
  let savedItems: UploadResult['items'] = [];
  if (lastSaveResult) {
    try {
      const parsed = JSON.parse(lastSaveResult);
      if (parsed.items) savedItems = parsed.items;
    } catch { /* ignore parse errors */ }
  }

  return {
    type: meta.type,
    filesProcessed: files.length,
    items: savedItems,
    message: `Agentic upload complete for ${files.length} file(s)`,
  };
}

// ---------------------------------------------------------------------------
// Exported helpers for the save-uploaded-files agent tool
// ---------------------------------------------------------------------------

export {
  buildSubjectEntry,
  buildProblemEntry,
  insertSubjectsIntoDb,
  insertProblemsIntoDb,
  sanitizeFilename,
  slugify,
};
