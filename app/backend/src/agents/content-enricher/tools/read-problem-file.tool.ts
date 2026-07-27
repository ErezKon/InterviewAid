import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { PROBLEMS_DIR } from '../../../config/paths.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('read_problem_file');

export const createReadProblemFileTool = () => tool(
  async (input) => {
    log.info(`INPUT: filename=${input.filename}`);

    const filePath = path.join(PROBLEMS_DIR, input.filename);

    if (!fs.existsSync(filePath)) {
      return JSON.stringify({ error: `File not found: ${input.filename}` });
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    const output = JSON.stringify({
      filename: input.filename,
      lineCount: content.split('\n').length,
      content,
    });

    log.info(`OUTPUT: ${content.split('\n').length} lines`);
    return output;
  },
  {
    name: 'read_problem_file',
    description: 'Read the full markdown content of a specific problem file. Use the exact filename from scan_problems.',
    schema: z.object({
      filename: z.string().describe('Exact filename including .md extension, e.g. "3Sum.md"'),
    }),
  }
);
