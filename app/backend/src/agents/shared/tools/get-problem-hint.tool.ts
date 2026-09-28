import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getProblemBySlug } from '../../../services/problem.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('get_problem_hint');

export const createGetProblemHintTool = () => tool(
  async (input) => {
    log.info(`INPUT: slug=${input.slug}, hintLevel=${input.hintLevel}`);

    const detail = getProblemBySlug(input.slug);
    const level = input.hintLevel;

    // Build structured data for the LLM, then append a system instruction
    // that must NOT be forwarded to the user.
    const header = [
      `**Problem:** ${detail.title} (${detail.difficulty})`,
      '',
      `**Topics:** ${detail.topics.join(', ')}`,
      '',
      `**Patterns:** ${detail.patterns.join(', ')}`,
      detail.oneLiner ? `\n**Key insight:** ${detail.oneLiner}` : '',
    ].filter(Boolean).join('\n');

    let sourceData = '';
    let instruction = '';

    if (level === 1) {
      instruction = [
        '---',
        '[SYSTEM — do NOT include this section in your response to the user]',
        'Using the problem info above as INTERNAL context only, write a level 1 hint for the user.',
        'Restate the problem in your own words and share observations about its structure.',
        'Do NOT reveal the approach, technique name, pattern names, key insight, or solution.',
        'Do NOT echo the raw data above — rephrase everything naturally.',
      ].join('\n');
    } else if (level === 2) {
      if (detail.complexityMd) {
        sourceData = `\n**Complexity hints:**\n${detail.complexityMd.slice(0, 500)}`;
      }
      instruction = [
        '---',
        '[SYSTEM — do NOT include this section in your response to the user]',
        'Using the problem info above as INTERNAL context only, write a level 2 hint for the user.',
        'Name the pattern/technique and suggest the data structure to use.',
        'Do NOT outline the full algorithm or show code.',
        'Do NOT echo the raw data above — rephrase everything naturally.',
      ].join('\n');
    } else {
      if (detail.solutionMd) {
        sourceData = `\n**Solution outline:**\n${detail.solutionMd.slice(0, 1500)}`;
      }
      if (detail.complexityMd) {
        sourceData += `\n\n**Complexity:**\n${detail.complexityMd}`;
      }
      instruction = [
        '---',
        '[SYSTEM — do NOT include this section in your response to the user]',
        'Using the problem info above as INTERNAL context only, write a level 3 hint for the user.',
        'Give a step-by-step outline of the algorithm without full final code.',
        'Help the candidate write it themselves.',
        'Do NOT echo the raw data above — rephrase everything naturally.',
      ].join('\n');
    }

    const hintContent = [header, sourceData, instruction].filter(Boolean).join('\n\n');

    log.info(`OUTPUT: level ${level} hint, ${hintContent.length} chars`);
    return hintContent;
  },
  {
    name: 'get_problem_hint',
    description: 'Get a progressive hint for a problem. Level 1 = restate + observations. Level 2 = pattern/technique name + data structure. Level 3 = step outline without final code. Never reveal full code.',
    schema: z.object({
      slug: z.string().describe('Problem slug'),
      hintLevel: z.number().min(1).max(3).describe('Hint level 1-3, each progressively more revealing'),
    }),
  }
);
