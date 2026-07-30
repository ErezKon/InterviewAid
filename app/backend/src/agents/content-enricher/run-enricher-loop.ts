import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { HumanMessage } from '@langchain/core/messages';
import { createContentEnricherAgent } from './content-enricher.agent.js';
import { PROBLEMS_DIR, CONTENT_ROOT } from '../../config/paths.js';
import { createLogger } from '../../utils/logger.js';
import { countRemainingAuditIssues, fixClassificationIssuesDirect, type AuditFixType } from './audit-report-parser.js';

const log = createLogger('enricher-loop');

function isRateLimitError(err: unknown): boolean {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    return msg.includes('429') || msg.includes('rate limit') || msg.includes('rate_limit');
  }
  return false;
}

function isConnectionError(err: unknown): boolean {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    return msg.includes('connection error') || msg.includes('econnrefused')
      || msg.includes('econnreset') || msg.includes('etimedout')
      || msg.includes('fetch failed') || msg.includes('socket hang up');
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
  const basename = path.basename(filePath);
  if (basename === 'INDEX.md') return false;
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

type AuditFixTypeOrAll = AuditFixType | 'all';

const AUDIT_FIX_TYPES: AuditFixType[] = ['wrong_primary_topic', 'missing_sub_topics', 'insufficient_content'];

function buildAuditMessage(auditFile: string, fixType: AuditFixType, remaining: number, batchSize: number): string {
  const batchHint = fixType === 'insufficient_content'
    ? `Use batchSize=${batchSize}.`
    : `Use batchSize=50.`;

  return [
    `Fix "${fixType}" issues from the audit report.`,
    `There are ${remaining} remaining issues of this type.`,
    `Audit file: ${auditFile}`,
    `Call read_audit_report(issueType="${fixType}", filePath="${auditFile}") to get a batch. ${batchHint}`,
    `Process the entire batch, then stop. Pass filePath="${auditFile}" to every read_audit_report call.`,
  ].join(' ');
}

async function main() {
  const args = process.argv.slice(2);
  const modelId = args.find(a => a.startsWith('--model='))?.split('=')[1] || 'gpt-oss-120b';
  const batchSize = Number(args.find(a => a.startsWith('--batch='))?.split('=')[1] ?? 5);
  const maxBatches = Number(args.find(a => a.startsWith('--max-batches='))?.split('=')[1] ?? Infinity);

  // Audit mode
  const auditMode = args.includes('--audit');
  const auditFile = args.find(a => a.startsWith('--audit-file='))?.split('=')[1]
    ?? path.join(CONTENT_ROOT, 'Data', 'Problems', 'LeetCode', 'audit_report.md');
  const fixArg = args.find(a => a.startsWith('--fix='))?.split('=')[1] as AuditFixTypeOrAll | undefined;
  const fixType: AuditFixTypeOrAll = fixArg && [...AUDIT_FIX_TYPES, 'all'].includes(fixArg) ? fixArg : 'all';

  if (auditMode) {
    return runAuditLoop(modelId, auditFile, fixType, batchSize, maxBatches);
  }

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
      } else if (isConnectionError(err)) {
        rateLimitStreak++;
        if (rateLimitStreak > MAX_RATE_LIMIT_RETRIES) {
          log.error(`${MAX_RATE_LIMIT_RETRIES} consecutive connection failures — aborting.`);
          break;
        }
        const waitSec = rateLimitStreak * 15;
        log.info(`Connection error — waiting ${waitSec}s before retry (${rateLimitStreak}/${MAX_RATE_LIMIT_RETRIES})...`);
        await sleep(waitSec * 1000);
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

async function runAuditLoop(
  modelId: string,
  auditFile: string,
  fixType: AuditFixTypeOrAll,
  batchSize: number,
  maxBatches: number,
) {
  if (!fs.existsSync(auditFile)) {
    log.error(`Audit report not found: ${auditFile}`);
    process.exit(1);
  }

  const globalStart = Date.now();
  const fixTypes = fixType === 'all' ? AUDIT_FIX_TYPES : [fixType];

  log.info('=== Audit Fix Loop Started ===');
  log.info(`Config: model=${modelId}, auditFile=${auditFile}, fixTypes=${fixTypes.join(',')}, maxBatches=${maxBatches === Infinity ? '∞' : maxBatches}`);

  let totalBatches = 0;
  let rateLimitStreak = 0;
  const MAX_RATE_LIMIT_RETRIES = 5;
  let consecutiveOtherFailures = 0;
  const MAX_OTHER_FAILURES = 3;

  for (const currentFixType of fixTypes) {
    log.info(`--- Processing issue type: ${currentFixType} ---`);

    // Classification fixes (wrong_primary_topic, missing_sub_topics) are deterministic —
    // apply them directly without an LLM.
    if (currentFixType === 'wrong_primary_topic' || currentFixType === 'missing_sub_topics') {
      const before = countRemainingAuditIssues(auditFile, currentFixType);
      log.info(`Scan: ${before.remaining}/${before.total} ${currentFixType} issues still unfixed`);
      if (before.remaining === 0) {
        log.info(`All ${currentFixType} issues are fixed. Moving on.`);
        continue;
      }
      const { fixed, notFound } = fixClassificationIssuesDirect(auditFile, currentFixType);
      const after = countRemainingAuditIssues(auditFile, currentFixType);
      log.info(`Direct fix: ${fixed} fixed, ${notFound} not found. Remaining: ${after.remaining}/${after.total}`);
      continue;
    }

    // Content fixes (insufficient_content) require the LLM.
    let batchNum = 0;

    while (true) {
      // Check remaining issues against live data before each batch
      const { total, remaining } = countRemainingAuditIssues(auditFile, currentFixType);
      log.info(`Scan: ${remaining}/${total} ${currentFixType} issues still unfixed`);

      if (remaining === 0) {
        log.info(`All ${currentFixType} issues are fixed. Moving on.`);
        break;
      }

      if (batchNum >= maxBatches) {
        log.info(`Reached max batches limit (${maxBatches}) for ${currentFixType}. Moving on.`);
        break;
      }

      batchNum++;
      totalBatches++;
      const batchStart = Date.now();
      log.info(`--- ${currentFixType} batch ${batchNum} starting (${remaining} remaining) ---`);

      try {
        const { agent, def } = await createContentEnricherAgent(modelId);
        log.info(`Agent created with model ${def.id}`);

        const message = buildAuditMessage(auditFile, currentFixType, remaining, batchSize);

        const result = await agent.invoke(
          { messages: [new HumanMessage(message)] },
          { recursionLimit: 200 },
        );

        const lastMsg = result.messages?.[result.messages.length - 1];
        const content = typeof lastMsg?.content === 'string' ? lastMsg.content : '';
        const elapsed = ((Date.now() - batchStart) / 1000).toFixed(1);
        log.info(`Batch completed in ${elapsed}s — ${content.slice(0, 200)}`);
        rateLimitStreak = 0;
        consecutiveOtherFailures = 0;
      } catch (err) {
        const elapsed = ((Date.now() - batchStart) / 1000).toFixed(1);
        log.error(`Batch failed after ${elapsed}s: ${err instanceof Error ? err.message : String(err)}`);

        if (isRateLimitError(err)) {
          rateLimitStreak++;
          if (rateLimitStreak > MAX_RATE_LIMIT_RETRIES) {
            log.error(`${MAX_RATE_LIMIT_RETRIES} consecutive rate-limit failures — aborting.`);
            break;
          }
          const waitMinutes = rateLimitStreak;
          log.info(`Rate limited — waiting ${waitMinutes} minute(s) before retry...`);
          await sleep(waitMinutes * 60_000);
        } else if (isConnectionError(err)) {
          rateLimitStreak++;
          if (rateLimitStreak > MAX_RATE_LIMIT_RETRIES) {
            log.error(`${MAX_RATE_LIMIT_RETRIES} consecutive connection failures — aborting.`);
            break;
          }
          const waitSec = rateLimitStreak * 15;
          log.info(`Connection error — waiting ${waitSec}s before retry (${rateLimitStreak}/${MAX_RATE_LIMIT_RETRIES})...`);
          await sleep(waitSec * 1000);
        } else {
          consecutiveOtherFailures++;
          if (err instanceof Error && err.stack) console.error(err.stack);
          if (consecutiveOtherFailures >= MAX_OTHER_FAILURES) {
            log.error(`${MAX_OTHER_FAILURES} consecutive failures — aborting ${currentFixType}.`);
            break;
          }
          log.info(`Continuing (${consecutiveOtherFailures}/${MAX_OTHER_FAILURES} failures)...`);
        }
      }
    }
  }

  const totalElapsed = ((Date.now() - globalStart) / 1000).toFixed(1);
  log.info(`=== Audit Fix Loop Finished: ${totalBatches} batches in ${totalElapsed}s ===`);
}

main().catch(err => {
  log.error(`Fatal: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
