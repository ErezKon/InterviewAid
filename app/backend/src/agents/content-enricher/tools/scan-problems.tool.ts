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
    log.info(`INPUT: offset=${input.offset}, limit=${input.limit}`);

    const allFiles = fs.readdirSync(PROBLEMS_DIR)
      .filter(f => f.endsWith('.md'))
      .sort();

    const start = Math.max(0, (input.offset ?? 1) - 1);
    const limit = input.limit ?? 50;
    const slice = allFiles.slice(start, start + limit);

    const results: { index: number; filename: string; lineCount: number; insufficient: boolean }[] = [];

    for (let i = 0; i < slice.length; i++) {
      const filename = slice[i];
      const filePath = path.join(PROBLEMS_DIR, filename);
      const lineCount = fs.readFileSync(filePath, 'utf-8').split('\n').length;
      results.push({
        index: start + i + 1,
        filename,
        lineCount,
        insufficient: isInsufficient(filePath),
      });
    }

    const insufficientCount = results.filter(r => r.insufficient).length;
    const output = JSON.stringify({
      totalFiles: allFiles.length,
      scannedRange: `${start + 1}-${start + slice.length}`,
      scannedCount: slice.length,
      insufficientCount,
      files: results,
    });

    log.info(`OUTPUT: scanned ${slice.length}, ${insufficientCount} insufficient`);
    return output;
  },
  {
    name: 'scan_problems',
    description: 'Scan problem markdown files and identify which ones need enrichment. Returns file list with insufficient flag. Use offset/limit to paginate through all 3400+ files.',
    schema: z.object({
      offset: z.number().optional().describe('1-indexed start position (default 1)'),
      limit: z.number().optional().describe('Max files to scan (default 50, max 200)'),
    }),
  }
);
