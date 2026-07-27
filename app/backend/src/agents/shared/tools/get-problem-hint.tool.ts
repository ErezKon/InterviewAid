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

    let hintContent: string;

    if (level === 1) {
      hintContent = [
        `Problem: ${detail.title} (${detail.difficulty})`,
        `Topics: ${detail.topics.join(', ')}`,
        `Patterns: ${detail.patterns.join(', ')}`,
        detail.oneLiner ? `Key insight: ${detail.oneLiner}` : '',
        '',
        'INSTRUCTION: Deliver only a level 1 hint — restate the problem and share observations about its structure. Do NOT reveal the approach, technique name, or solution.',
      ].filter(Boolean).join('\n');
    } else if (level === 2) {
      hintContent = [
        `Problem: ${detail.title} (${detail.difficulty})`,
        `Topics: ${detail.topics.join(', ')}`,
        `Patterns: ${detail.patterns.join(', ')}`,
        detail.oneLiner ? `Key insight: ${detail.oneLiner}` : '',
        detail.complexityMd ? `\nComplexity hints:\n${detail.complexityMd.slice(0, 500)}` : '',
        '',
        'INSTRUCTION: Deliver a level 2 hint — name the pattern/technique and suggest the data structure, but do NOT outline the full algorithm or show code.',
      ].filter(Boolean).join('\n');
    } else {
      hintContent = [
        `Problem: ${detail.title} (${detail.difficulty})`,
        `Topics: ${detail.topics.join(', ')}`,
        `Patterns: ${detail.patterns.join(', ')}`,
        detail.oneLiner ? `Key insight: ${detail.oneLiner}` : '',
        detail.solutionMd ? `\nSolution outline:\n${detail.solutionMd.slice(0, 1500)}` : '',
        detail.complexityMd ? `\nComplexity:\n${detail.complexityMd}` : '',
        '',
        'INSTRUCTION: Deliver a level 3 hint — give a step-by-step outline of the algorithm without full final code. Help the candidate write it themselves.',
      ].filter(Boolean).join('\n');
    }

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
