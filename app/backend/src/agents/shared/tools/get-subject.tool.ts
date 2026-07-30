import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getSubjectById } from '../../../services/subject.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('get_subject');

export const createGetSubjectTool = () => tool(
  async (input) => {
    log.info(`INPUT: id=${input.id}, maxChars=${input.maxChars ?? 12000}`);

    const subject = getSubjectById(input.id);
    const maxChars = input.maxChars ?? 12000;

    let bodyMd = subject.bodyMd;
    if (bodyMd.length > maxChars) {
      // Truncate on section boundary
      const truncated = bodyMd.slice(0, maxChars);
      const lastSection = truncated.lastIndexOf('\n## ');
      bodyMd = lastSection > 0
        ? truncated.slice(0, lastSection) + '\n\n[...truncated]'
        : truncated + '\n\n[...truncated]';
    }

    const result = JSON.stringify({
      id: subject.id,
      title: subject.title,
      sourceFile: subject.sourceFile,
      mainSubject: subject.mainSubject,
      subSubject: subject.subSubject,
      primaryTopic: subject.primaryTopic,
      keyConcepts: subject.keyConcepts,
      wordCount: subject.wordCount,
      bodyMd,
    });

    log.info(`OUTPUT: ${result.length} chars`);
    return result;
  },
  {
    name: 'get_subject',
    description: 'Get full content of a theoretical subject by ID. Content is truncated at section boundaries to control token usage.',
    schema: z.object({
      id: z.string().describe('Subject ID'),
      maxChars: z.number().optional().describe('Max characters for body (default 12000)'),
    }),
  }
);
