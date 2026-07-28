import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { HumanMessage } from '@langchain/core/messages';
import { createContentEnricherAgent } from './content-enricher.agent.js';
import { PROBLEMS_DIR } from '../../config/paths.js';
import { createLogger } from '../../utils/logger.js';

const log = createLogger('enricher-loop');

function isRateLimitError(err: unknown): boolean {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    return msg.includes('429') || msg.includes('rate limit') || msg.includes('rate_limit');
  }
  return false;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A problem file is considered "insufficient" when it:
 * - Has ≤ 12 lines (header + companies + separator + placeholder only)
 * - Contains the placeholder text "Solution approach and pseudocode to be added"
 * - Lacks a "## Problem Description" or "## 1. Problem Description" section
 */
function isInsufficient(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  if (lines.length <= 12) return true;
  if (content.includes('Solution approach and pseudocode to be added')) return true;
  if (!/##\s+(\d+\.\s+)?Problem Description/i.test(content)) return true;
  return false;
}

function countInsufficient(): { total: number; insufficient: number } {
  const allFiles = fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.md'));
  let insufficient = 0;
  for (const f of allFiles) {
    if (isInsufficient(path.join(PROBLEMS_DIR, f))) insufficient++;
  }
  return { total: allFiles.length, insufficient };
}

async function main() {
  const args = process.argv.slice(2);
  const modelId = args.find(a => a.startsWith('--model='))?.split('=')[1] || 'gpt-oss-120b';
  const batchSize = Number(args.find(a => a.startsWith('--batch='))?.split('=')[1] ?? 5);
  const maxBatches = Number(args.find(a => a.startsWith('--max-batches='))?.split('=')[1] ?? Infinity);

  let batchNum = 0;
  let rateLimitStreak = 0;
  const MAX_RATE_LIMIT_RETRIES = 5;
  let consecutiveOtherFailures = 0;
  const MAX_OTHER_FAILURES = 3;
  const globalStart = Date.now();

  log.info('=== Enricher Loop Started ===');
  log.info(`Config: model=${modelId}, batchSize=${batchSize}, maxBatches=${maxBatches === Infinity ? '∞' : maxBatches}`);

  while (true) {
    const { total, insufficient } = countInsufficient();
    log.info(`Scan: ${insufficient}/${total} files still need enrichment`);

    if (insufficient === 0) {
      log.info('All files are enriched. Done!');
      break;
    }

    if (batchNum >= maxBatches) {
      log.info(`Reached max batches limit (${maxBatches}). Stopping.`);
      break;
    }

    batchNum++;
    const batchStart = Date.now();
    log.info(`--- Batch ${batchNum} starting (${insufficient} remaining) ---`);

    try {
      // Fresh agent with clean context every batch
      const { agent, def } = await createContentEnricherAgent(modelId);
      log.info(`Agent created with model ${def.id}`);

      const result = await agent.invoke(
        {
          messages: [
            new HumanMessage(
              `Enrich the next batch of insufficient problems. Use scan_problems with batchSize=${batchSize}. Process all files in the batch, then call update_problem_metadata once.`
            ),
          ],
        },
        { recursionLimit: 200 },
      );

      // Extract final AI message for summary
      const lastMsg = result.messages?.[result.messages.length - 1];
      const content = typeof lastMsg?.content === 'string' ? lastMsg.content : '';
      const elapsed = ((Date.now() - batchStart) / 1000).toFixed(1);
      log.info(`Batch ${batchNum} completed in ${elapsed}s — ${content.slice(0, 200)}`);
      rateLimitStreak = 0;
      consecutiveOtherFailures = 0;
    } catch (err) {
      const elapsed = ((Date.now() - batchStart) / 1000).toFixed(1);
      log.error(`Batch ${batchNum} failed after ${elapsed}s: ${err instanceof Error ? err.message : String(err)}`);

      if (isRateLimitError(err)) {
        rateLimitStreak++;
        if (rateLimitStreak > MAX_RATE_LIMIT_RETRIES) {
          log.error(`${MAX_RATE_LIMIT_RETRIES} consecutive rate-limit failures — aborting.`);
          break;
        }
        const waitMinutes = rateLimitStreak;
        log.info(`Rate limited — waiting ${waitMinutes} minute(s) before retry (${rateLimitStreak}/${MAX_RATE_LIMIT_RETRIES})...`);
        await sleep(waitMinutes * 60_000);
      } else {
        consecutiveOtherFailures++;
        if (err instanceof Error && err.stack) {
          console.error(err.stack);
        }
        if (consecutiveOtherFailures >= MAX_OTHER_FAILURES) {
          log.error(`${MAX_OTHER_FAILURES} consecutive non-rate-limit failures — aborting.`);
          break;
        }
        log.info(`Continuing to next batch (${consecutiveOtherFailures}/${MAX_OTHER_FAILURES} consecutive failures)...`);
      }
    }
  }

  const totalElapsed = ((Date.now() - globalStart) / 1000).toFixed(1);
  log.info(`=== Enricher Loop Finished: ${batchNum} batches in ${totalElapsed}s ===`);
}

main().catch(err => {
  log.error(`Fatal: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
