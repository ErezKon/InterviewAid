import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

import { createLogger } from '../utils/logger.js';
import { parseProblems } from './parse-problem-md.js';
import { parseTheory } from './parse-theory-md.js';
import { classifyProblems, classifySubjects } from './classify-with-llm.js';
import { buildDb } from './build-db.js';
import { generateQuestions } from './generate-questions.js';

const log = createLogger('indexer');

async function main() {
  const args = process.argv.slice(2);
  const stageArg = args.find(a => a.startsWith('--stage='));
  const stage = stageArg?.split('=')[1] ?? 'all';
  const force = args.includes('--force');
  const modelArg = args.find(a => a.startsWith('--model='));
  const modelId = modelArg?.split('=')[1];

  log.info(`Running indexer stage: ${stage}${force ? ' (force)' : ''}`);
  const start = Date.now();

  try {
    switch (stage) {
      case 'parse':
        await parseProblems();
        await parseTheory();
        break;

      case 'classify':
        await classifyProblems(force);
        await classifySubjects(force);
        break;

      case 'build':
        await buildDb();
        break;

      case 'questions':
        await generateQuestions(force, modelId);
        break;

      case 'all':
        log.info('=== Stage 1: Parse ===');
        await parseProblems();
        await parseTheory();
        log.info('=== Stage 2: Classify ===');
        await classifyProblems(force);
        await classifySubjects(force);
        log.info('=== Stage 3: Build DB ===');
        await buildDb();
        break;

      default:
        log.error(`Unknown stage: ${stage}. Use: parse, classify, build, questions, or all`);
        process.exit(1);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    log.info(`Indexer stage '${stage}' completed in ${elapsed}s`);
  } catch (err) {
    log.error(`Indexer failed: ${err instanceof Error ? err.message : String(err)}`);
    if (err instanceof Error && err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

main();
