import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { env } from '../config/env.js';
import { METADATA_DIR } from '../config/paths.js';
import { TAXONOMY_IDS, SENIORITY } from './taxonomy.js';
import { Problem, Subject } from '../types/problem.types.js';
import { createLogger } from '../utils/logger.js';
import { getAccessToken } from '../utils/oauth.util.js';

const log = createLogger('classify');

const BATCH_SIZE = 25;
const CONCURRENCY = 4;
const MAX_RETRIES = 3;
const DESCRIPTION_CHAR_LIMIT = 600;

// Zod schema for structured output
const taxonomyIdEnum = z.enum(TAXONOMY_IDS as [string, ...string[]]);
const seniorityEnum = z.enum(SENIORITY as unknown as [string, ...string[]]);

const classificationResultSchema = z.object({
  results: z.array(z.object({
    id: z.string(),
    topics: z.array(taxonomyIdEnum).min(1).max(3),
    primaryTopic: taxonomyIdEnum,
    patterns: z.array(z.string()).max(4),
    seniority: seniorityEnum,
    interviewValue: z.number().min(1).max(5),
    oneLiner: z.string().max(200),
  })),
});

const subjectClassificationSchema = z.object({
  results: z.array(z.object({
    id: z.string(),
    topics: z.array(taxonomyIdEnum).min(1).max(3),
    primaryTopic: taxonomyIdEnum,
    keyConcepts: z.array(z.string()),
  })),
});

type ClassificationResult = z.infer<typeof classificationResultSchema>['results'][number];
type SubjectClassificationResult = z.infer<typeof subjectClassificationSchema>['results'][number];

async function resolveApiKey(): Promise<string> {
  const explicit = env.OPENAI_API_KEY || undefined;
  if (explicit) return explicit;
  return getAccessToken();
}

async function createModel(): Promise<ChatOpenAI> {
  const apiKey = await resolveApiKey();
  return new ChatOpenAI({
    model: 'gpt-oss-120b',
    apiKey,
    temperature: 0,
    maxRetries: 0,
    timeout: 120_000,
    configuration: { baseURL: env.OPENAI_BASE_URL || undefined },
  });
}

function loadExistingClassifications(jsonlPath: string): Set<string> {
  const existing = new Set<string>();
  if (!fs.existsSync(jsonlPath)) return existing;

  const content = fs.readFileSync(jsonlPath, 'utf-8');
  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line);
      if (parsed.id) existing.add(parsed.id);
    } catch { /* skip malformed lines */ }
  }
  return existing;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function classifyBatch(
  model: ChatOpenAI,
  batch: { id: string; title: string; difficulty: string; description: string }[],
  retryCount = 0,
): Promise<ClassificationResult[]> {
  const taxonomyList = TAXONOMY_IDS.join(', ');
  const seniorityList = SENIORITY.join(', ');

  const prompt = `You are a LeetCode problem classifier. For each problem below, assign:
- topics: 1-3 from EXACTLY this list: [${taxonomyList}]
- primaryTopic: the single most relevant topic from the same list
- patterns: up to 4 algorithm patterns (e.g. "sort + two pointers", "monotonic stack", "BFS", "union-find")
- seniority: one of [${seniorityList}] — how senior a candidate should be to solve this in an interview
- interviewValue: 1-5 rating of how commonly asked and useful this problem is for interviews
- oneLiner: max 200 chars describing the core insight

Problems:
${batch.map(p => `---
ID: ${p.id}
Title: ${p.title}
Difficulty: ${p.difficulty}
Description: ${p.description}
`).join('\n')}

Return ONLY valid JSON matching this structure:
{"results": [{"id": "...", "topics": [...], "primaryTopic": "...", "patterns": [...], "seniority": "...", "interviewValue": N, "oneLiner": "..."}]}`;

  try {
    const modelWithOutput = model.withStructuredOutput(classificationResultSchema);
    const result = await modelWithOutput.invoke(prompt);
    return result.results;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log.warn(`Batch failed (attempt ${retryCount + 1}): ${message}`);

    if (retryCount < MAX_RETRIES) {
      const backoff = Math.pow(2, retryCount) * 1000;
      log.info(`Retrying in ${backoff}ms...`);
      await sleep(backoff);
      return classifyBatch(model, batch, retryCount + 1);
    }

    // Split batch in half and try each half
    if (batch.length > 1) {
      log.info(`Splitting batch of ${batch.length} in half after ${MAX_RETRIES} retries`);
      const mid = Math.floor(batch.length / 2);
      const [left, right] = await Promise.all([
        classifyBatch(model, batch.slice(0, mid), 0),
        classifyBatch(model, batch.slice(mid), 0),
      ]);
      return [...left, ...right];
    }

    // Single item still failing — give up
    throw err;
  }
}

export async function classifyProblems(force = false): Promise<void> {
  const problemsPath = path.join(METADATA_DIR, 'problems.json');
  if (!fs.existsSync(problemsPath)) {
    log.error('problems.json not found. Run parse stage first.');
    process.exit(1);
  }

  const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  log.info(`Loaded ${problems.length} raw problems`);

  const jsonlPath = path.join(METADATA_DIR, 'classification.jsonl');
  const errorsPath = path.join(METADATA_DIR, 'classification.errors.json');

  // Resumability: skip already classified
  let existing = new Set<string>();
  if (!force) {
    existing = loadExistingClassifications(jsonlPath);
    if (existing.size > 0) {
      log.info(`Resuming: ${existing.size} already classified, skipping`);
    }
  } else if (fs.existsSync(jsonlPath)) {
    fs.unlinkSync(jsonlPath);
  }

  const toClassify = problems.filter(p => !existing.has(p.slug));
  if (toClassify.length === 0) {
    log.info('All problems already classified');
  } else {
    log.info(`Classifying ${toClassify.length} problems in batches of ${BATCH_SIZE}...`);

    const model = await createModel();
    const batches: { id: string; title: string; difficulty: string; description: string }[][] = [];

    for (let i = 0; i < toClassify.length; i += BATCH_SIZE) {
      batches.push(
        toClassify.slice(i, i + BATCH_SIZE).map(p => ({
          id: p.slug,
          title: p.title,
          difficulty: p.difficulty,
          description: (p.descriptionMd ?? '').slice(0, DESCRIPTION_CHAR_LIMIT),
        }))
      );
    }

    const errors: { batch: number; ids: string[]; error: string }[] = [];
    let classified = existing.size;

    // Process batches with concurrency limit
    for (let i = 0; i < batches.length; i += CONCURRENCY) {
      const chunk = batches.slice(i, i + CONCURRENCY);
      const results = await Promise.allSettled(
        chunk.map((batch, j) => classifyBatch(model, batch))
      );

      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        const batchIdx = i + j;
        if (result.status === 'fulfilled') {
          // Append each result to JSONL immediately
          for (const item of result.value) {
            fs.appendFileSync(jsonlPath, JSON.stringify(item) + '\n');
            classified++;
          }
        } else {
          const batchIds = chunk[j].map(b => b.id);
          const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
          errors.push({ batch: batchIdx, ids: batchIds, error: message });
          log.error(`Batch ${batchIdx} failed permanently: ${message}`);
        }
      }

      log.info(`[classify] ${classified}/${problems.length}`);
    }

    if (errors.length > 0) {
      fs.writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
      log.warn(`${errors.length} batches failed — see classification.errors.json`);
    }
  }

  // Fold JSONL classifications back into problems.json
  const classificationMap = new Map<string, ClassificationResult>();
  if (fs.existsSync(jsonlPath)) {
    for (const line of fs.readFileSync(jsonlPath, 'utf-8').split('\n')) {
      if (!line.trim()) continue;
      try {
        const item = JSON.parse(line) as ClassificationResult;
        classificationMap.set(item.id, item);
      } catch { /* skip */ }
    }
  }

  for (const p of problems) {
    const cls = classificationMap.get(p.slug);
    if (cls) {
      p.primaryTopic = cls.primaryTopic;
      p.topics = cls.topics;
      p.patterns = cls.patterns;
      p.seniority = cls.seniority;
      p.interviewValue = cls.interviewValue;
      p.oneLiner = cls.oneLiner;
    }
  }

  fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));
  log.info(`Wrote ${problems.length} problems (with classifications) to problems.json`);
}

export async function classifySubjects(force = false): Promise<void> {
  const subjectsPath = path.join(METADATA_DIR, 'subjects.json');
  if (!fs.existsSync(subjectsPath)) {
    log.error('subjects.json not found. Run parse stage first.');
    process.exit(1);
  }

  const subjects: Subject[] = JSON.parse(fs.readFileSync(subjectsPath, 'utf-8'));
  log.info(`Loaded ${subjects.length} raw subjects`);

  const model = await createModel();
  const taxonomyList = TAXONOMY_IDS.join(', ');

  const batchInput = subjects.map(s => ({
    id: s.id,
    title: s.title,
    body: s.bodyMd.slice(0, DESCRIPTION_CHAR_LIMIT),
  }));

  const jsonlPath = path.join(METADATA_DIR, 'subjects.classification.jsonl');
  const existingSubjects = force ? new Set<string>() : loadExistingClassifications(jsonlPath);

  if (force && fs.existsSync(jsonlPath)) fs.unlinkSync(jsonlPath);

  const toClassify = batchInput.filter(s => !existingSubjects.has(s.id));

  if (toClassify.length > 0) {
    // Classify subjects in a single batch (usually ~30)
    for (let i = 0; i < toClassify.length; i += BATCH_SIZE) {
      const batch = toClassify.slice(i, i + BATCH_SIZE);
      const prompt = `You are a technical subject classifier. For each subject below, assign:
- topics: 1-3 from EXACTLY this list: [${taxonomyList}]
- primaryTopic: the single most relevant topic
- keyConcepts: key technical concepts covered (3-8 items)

Subjects:
${batch.map(s => `---
ID: ${s.id}
Title: ${s.title}
Content: ${s.body}
`).join('\n')}

Return ONLY valid JSON: {"results": [{"id": "...", "topics": [...], "primaryTopic": "...", "keyConcepts": [...]}]}`;

      try {
        const modelWithOutput = model.withStructuredOutput(subjectClassificationSchema);
        const result = await modelWithOutput.invoke(prompt);
        for (const item of result.results) {
          fs.appendFileSync(jsonlPath, JSON.stringify(item) + '\n');
        }
      } catch (err) {
        log.error(`Subject classification batch failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  // Fold JSONL classifications back into subjects.json
  const subjectClassMap = new Map<string, SubjectClassificationResult>();
  if (fs.existsSync(jsonlPath)) {
    for (const line of fs.readFileSync(jsonlPath, 'utf-8').split('\n')) {
      if (!line.trim()) continue;
      try {
        const item = JSON.parse(line) as SubjectClassificationResult;
        subjectClassMap.set(item.id, item);
      } catch { /* skip */ }
    }
  }

  for (const s of subjects) {
    const cls = subjectClassMap.get(s.id);
    if (cls) {
      s.primaryTopic = cls.primaryTopic;
      s.topics = cls.topics;
      s.keyConcepts = cls.keyConcepts;
    }
  }

  fs.writeFileSync(subjectsPath, JSON.stringify(subjects, null, 2));
  log.info(`Wrote ${subjects.length} subjects (with classifications) to subjects.json`);
}
