import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { PROBLEMS_DIR } from '../../../config/paths.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('scan_problems');

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

export const createScanProblemsTool = () => tool(
  async (input) => {
    const batchSize = Math.min(input.batchSize ?? 5, 10);
    log.info(`INPUT: offset=${input.offset}, batchSize=${batchSize}`);

    const allFiles = fs.readdirSync(PROBLEMS_DIR)
      .filter(f => f.endsWith('.md'))
      .sort();

    const start = Math.max(0, (input.offset ?? 1) - 1);
    const insufficient: { index: number; filename: string; lineCount: number }[] = [];
    let scannedUpTo = start;

    // Scan forward until we collect batchSize insufficient files or reach end
    for (let i = start; i < allFiles.length && insufficient.length < batchSize; i++) {
      scannedUpTo = i + 1;
      const filename = allFiles[i];
      const filePath = path.join(PROBLEMS_DIR, filename);
      if (isInsufficient(filePath)) {
        const lineCount = fs.readFileSync(filePath, 'utf-8').split('\n').length;
        insufficient.push({ index: i + 1, filename, lineCount });
      }
    }

    const hasMore = scannedUpTo < allFiles.length;
    const output = JSON.stringify({
      totalFiles: allFiles.length,
      scannedUpTo,
      batchSize,
      insufficientCount: insufficient.length,
      hasMore,
      nextOffset: hasMore ? scannedUpTo + 1 : null,
      files: insufficient,
    });

    log.info(`OUTPUT: scanned to ${scannedUpTo}, found ${insufficient.length} insufficient, hasMore=${hasMore}`);
    return output;
  },
  {
    name: 'scan_problems',
    description: 'Scan problem files and return the next batch of INSUFFICIENT files that need enrichment. Returns only insufficient files (up to batchSize, default 5). Use nextOffset from previous result to continue scanning.',
    schema: z.object({
      offset: z.number().optional().describe('1-indexed start position (default 1). Use nextOffset from previous scan result.'),
      batchSize: z.number().optional().describe('Max insufficient files to return per batch (default 5, max 10). Keep small so each batch can be fully processed.'),
    }),
  }
);
