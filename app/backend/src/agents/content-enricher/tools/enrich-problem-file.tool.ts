import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { PROBLEMS_DIR } from '../../../config/paths.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('enrich_problem_file');

export const createEnrichProblemFileTool = () => tool(
  async (input) => {
    log.info(`INPUT: filename=${input.filename}, contentLength=${input.newContent.length}`);

    const filePath = path.join(PROBLEMS_DIR, input.filename);

    if (!fs.existsSync(filePath)) {
      return JSON.stringify({ error: `File not found: ${input.filename}` });
    }

    // Safety: back up original if not already backed up
    const backupPath = filePath + '.bak';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    fs.writeFileSync(filePath, input.newContent, 'utf-8');

    const output = JSON.stringify({
      filename: input.filename,
      status: 'written',
      lineCount: input.newContent.split('\n').length,
    });

    log.info(`OUTPUT: wrote ${input.newContent.split('\n').length} lines to ${input.filename}`);
    return output;
  },
  {
    name: 'enrich_problem_file',
    description: 'Write enriched markdown content back to a problem file. Provide the COMPLETE file content (header + enriched body). The original file is backed up automatically.',
    schema: z.object({
      filename: z.string().describe('Exact filename including .md extension'),
      newContent: z.string().describe('Complete enriched markdown content for the file'),
    }),
  }
);
