import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, MATERIAL_DIR, METADATA_DIR, PROBLEMS_DIR } from '../../../config/paths.js';
import { Problem, Subject } from '../../../types/problem.types.js';
import {
  buildSubjectEntry,
  buildProblemEntry,
  insertSubjectsIntoDb,
  insertProblemsIntoDb,
  sanitizeFilename,
} from '../../../services/upload.service.js';
import { createLogger } from '../../../utils/logger.js';
import type { UploadContext } from '../upload-context.js';

const log = createLogger('save_uploaded_files');

/**
 * Resolve file content from explicit value, split context, or original upload context.
 * Returns null when content cannot be found.
 *
 * Uses exact key lookup first, then a case-insensitive / trimmed fallback
 * because the LLM may produce slightly different filenames between tool calls.
 */
function resolveContent(
  fileName: string,
  explicitContent: string | undefined,
  ctx?: UploadContext,
): string | null {
  if (explicitContent) return explicitContent;
  if (!ctx) return null;

  // Exact match (most common path)
  const fromSplit = ctx.splitFiles.get(fileName);
  if (fromSplit !== undefined && fromSplit.length > 0) return fromSplit;
  const fromOriginal = ctx.originalFiles.get(fileName);
  if (fromOriginal !== undefined && fromOriginal.length > 0) return fromOriginal;

  // Fuzzy fallback: case-insensitive + trimmed
  const norm = fileName.trim().toLowerCase();
  for (const [key, value] of ctx.splitFiles) {
    if (key.trim().toLowerCase() === norm && value.length > 0) return value;
  }
  for (const [key, value] of ctx.originalFiles) {
    if (key.trim().toLowerCase() === norm && value.length > 0) return value;
  }

  return null;
}

function saveMaterialFiles(input: {
  mainSubject: string;
  files: Array<{
    fileName: string;
    content?: string;
    title: string;
    subSubject?: string;
    primaryTopic?: string;
    topics?: string[];
    keyConcepts?: string[];
  }>;
}, ctx?: UploadContext): string {
  const subjectDir = path.join(MATERIAL_DIR, input.mainSubject);
  fs.mkdirSync(subjectDir, { recursive: true });

  const subjectsJsonPath = path.join(METADATA_DIR, 'subjects.json');
  const subjects: Subject[] = fs.existsSync(subjectsJsonPath)
    ? JSON.parse(fs.readFileSync(subjectsJsonPath, 'utf-8'))
    : [];
  const seenIds = new Set(subjects.map(s => s.id));

  const newSubjects: Subject[] = [];
  const items: { id: string; title: string; filePath: string }[] = [];

  for (const file of input.files) {
    const content = resolveContent(file.fileName, file.content, ctx);
    if (!content) {
      log.error(`No content found for file "${file.fileName}"`);
      continue;
    }

    const fileName = sanitizeFilename(file.fileName);
    const destPath = path.join(subjectDir, fileName);
    fs.writeFileSync(destPath, content);

    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const subject = buildSubjectEntry(
      content, relativePath, input.mainSubject,
      file.subSubject ?? null, seenIds,
    );

    // Apply LLM-provided classification
    if (file.primaryTopic) subject.primaryTopic = file.primaryTopic;
    if (file.topics?.length) subject.topics = file.topics;
    if (file.keyConcepts?.length) subject.keyConcepts = file.keyConcepts;

    subjects.push(subject);
    newSubjects.push(subject);
    items.push({ id: subject.id, title: subject.title, filePath: relativePath });
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  fs.writeFileSync(subjectsJsonPath, JSON.stringify(subjects, null, 2));
  insertSubjectsIntoDb(newSubjects);

  log.info(`Saved ${newSubjects.length} material files to ${input.mainSubject}`);
  return JSON.stringify({
    status: 'saved',
    type: 'material',
    count: newSubjects.length,
    items,
  });
}

function saveProblemFiles(input: {
  files: Array<{
    fileName: string;
    content?: string;
    title: string;
    classification?: string;
    subClassification?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    patterns?: string[];
    seniority?: string;
    primaryTopic?: string;
    topics?: string[];
  }>;
}, ctx?: UploadContext): string {
  const problemsJsonPath = path.join(METADATA_DIR, 'problems.json');
  const problems: Problem[] = fs.existsSync(problemsJsonPath)
    ? JSON.parse(fs.readFileSync(problemsJsonPath, 'utf-8'))
    : [];
  const seenSlugs = new Set(problems.map(p => p.slug));

  const newProblems: Problem[] = [];
  const items: { id: string; title: string; filePath: string }[] = [];

  for (const file of input.files) {
    const content = resolveContent(file.fileName, file.content, ctx);
    if (!content) {
      log.error(`No content found for file "${file.fileName}"`);
      continue;
    }

    const fileName = sanitizeFilename(file.fileName);
    const destPath = path.join(PROBLEMS_DIR, fileName);
    fs.writeFileSync(destPath, content);

    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const meta = {
      type: 'problem' as const,
      title: file.title,
      agentic: true,
      classification: file.classification ?? file.primaryTopic,
      subClassification: file.subClassification,
      difficulty: file.difficulty,
    };
    const problem = buildProblemEntry(content, relativePath, meta, seenSlugs);

    // Apply additional LLM-provided classification
    if (file.topics?.length) problem.topics = file.topics;
    if (file.primaryTopic) problem.primaryTopic = file.primaryTopic;
    if (file.patterns?.length) problem.patterns = file.patterns;
    if (file.seniority) problem.seniority = file.seniority;

    problems.push(problem);
    newProblems.push(problem);
    items.push({ id: problem.slug, title: problem.title, filePath: relativePath });
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });
  fs.writeFileSync(problemsJsonPath, JSON.stringify(problems, null, 2));
  insertProblemsIntoDb(newProblems);

  log.info(`Saved ${newProblems.length} problem files`);
  return JSON.stringify({
    status: 'saved',
    type: 'problem',
    count: newProblems.length,
    items,
  });
}

export const createSaveUploadedFilesTool = (ctx?: UploadContext) => tool(
  async (input) => {
    log.info(`INPUT: type=${input.type}, files=${input.files.length}`);

    try {
      if (input.type === 'material') {
        if (!input.mainSubject) {
          return JSON.stringify({ error: 'mainSubject is required for material uploads' });
        }
        return saveMaterialFiles({
          mainSubject: input.mainSubject,
          files: input.files,
        }, ctx);
      }
      return saveProblemFiles({ files: input.files }, ctx);
    } catch (err: any) {
      log.error('Save failed', err);
      return JSON.stringify({ error: err.message ?? 'Failed to save files' });
    }
  },
  {
    name: 'save_uploaded_files',
    description:
      'Save classified files to disk and update metadata (JSON + SQLite). ' +
      'Call this AFTER classify_content (and optionally split_material). ' +
      'Content is resolved automatically from the upload context — you only ' +
      'need to provide the fileName (matching the original or split filename) ' +
      'and classification metadata.',
    schema: z.object({
      type: z.enum(['material', 'problem']),
      mainSubject: z.string().optional().describe('Required for material — the broad subject area'),
      files: z.array(z.object({
        fileName: z.string().describe('Filename with .md extension — must match original or split filename'),
        content: z.string().optional().describe('Override content (optional — resolved from context if omitted)'),
        title: z.string().describe('Human-readable title'),
        subSubject: z.string().optional().describe('For material: sub-subject name'),
        primaryTopic: z.string().optional().describe('Primary taxonomy topic ID'),
        topics: z.array(z.string()).optional().describe('Taxonomy topic IDs'),
        keyConcepts: z.array(z.string()).optional().describe('Key concepts (material only)'),
        classification: z.string().optional().describe('Primary topic for problems'),
        subClassification: z.string().optional(),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
        patterns: z.array(z.string()).optional().describe('Algorithm patterns (problems only)'),
        seniority: z.string().optional().describe('Seniority level (problems only)'),
      })).describe('Files to save with classification metadata (content resolved from context)'),
    }),
  },
);
