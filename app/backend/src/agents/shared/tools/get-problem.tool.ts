import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getProblemBySlug } from '../../../services/problem.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('get_problem');

export const createGetProblemTool = () => tool(
  async (input) => {
    log.info(`INPUT: slug=${input.slug}, include=${input.include?.join(',') ?? 'default'}`);

    const detail = getProblemBySlug(input.slug);

    const include = new Set(input.include ?? ['description', 'examples']);

    const result: Record<string, any> = {
      slug: detail.slug,
      title: detail.title,
      difficulty: detail.difficulty,
      acceptance: detail.acceptance,
      url: detail.url,
      primaryTopic: detail.primaryTopic,
      topics: detail.topics,
      patterns: detail.patterns,
      companies: detail.companies.slice(0, 10).map(c => c.name),
      oneLiner: detail.oneLiner,
    };

    if (include.has('description')) result.descriptionMd = detail.descriptionMd;
    if (include.has('examples')) result.examplesMd = detail.examplesMd;
    if (include.has('solution')) result.solutionMd = detail.solutionMd;
    if (include.has('complexity')) result.complexityMd = detail.complexityMd;
    if (include.has('followUps')) result.followUpsMd = detail.followUpsMd;

    const output = JSON.stringify(result);
    log.info(`OUTPUT: ${output.length} chars`);
    return output;
  },
  {
    name: 'get_problem',
    description: 'Get full details for a specific problem by slug. By default excludes solution — you must explicitly include "solution" to see it. Use for presenting problem descriptions or reviewing specific problems.',
    schema: z.object({
      slug: z.string().describe('Problem slug (kebab-case identifier)'),
      include: z.array(z.enum(['description', 'examples', 'solution', 'complexity', 'followUps']))
        .optional()
        .describe('Sections to include. Default: description, examples. Solution excluded by default.'),
    }),
  }
);
