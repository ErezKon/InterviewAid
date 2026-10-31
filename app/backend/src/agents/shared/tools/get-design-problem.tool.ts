import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getDesignProblemBySlug } from '../../../services/design.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('get_design_problem');

const SOLUTION_MAX_CHARS = 16000;

export const createGetDesignProblemTool = () => tool(
  async (input) => {
    log.info(`INPUT: slug=${input.slug}, include=${input.include?.join(',') ?? 'default'}`);

    const d = getDesignProblemBySlug(input.slug);
    const include = new Set(input.include ?? ['statement', 'requirements']);

    const result: Record<string, unknown> = {
      slug: d.slug,
      title: d.title,
      category: d.category,
      categoryLabel: d.categoryLabel,
      difficulty: d.difficulty,
      seniority: d.seniority,
      timeMinutes: d.timeMinutes,
      companies: d.companies,
      tags: d.tags,
      sections: d.sections,
      related: d.related.map(r => ({ slug: r.slug, title: r.title, difficulty: r.difficulty })),
    };

    if (include.has('statement')) result.statementMd = d.statementMd;
    if (include.has('requirements')) {
      result.clarifyingMd = d.clarifyingMd;
      result.requirementsMd = d.requirementsMd;
    }
    if (include.has('solution')) {
      const sol = d.solutionMd ?? '';
      result.solutionMd = sol.length > SOLUTION_MAX_CHARS
        ? sol.slice(0, sol.lastIndexOf('\n## ', SOLUTION_MAX_CHARS) > 0 ? sol.lastIndexOf('\n## ', SOLUTION_MAX_CHARS) : SOLUTION_MAX_CHARS) + '\n\n[…truncated]'
        : sol;
    }
    if (include.has('followUps')) result.followUpsMd = d.followUpsMd;
    if (include.has('mistakes')) result.mistakesMd = d.mistakesMd;
    if (include.has('takeaways')) result.takeawaysMd = d.takeawaysMd;
    if (include.has('full')) result.rawMarkdown = d.rawMarkdown;

    const output = JSON.stringify(result);
    log.info(`OUTPUT: ${output.length} chars`);
    return output;
  },
  {
    name: 'get_design_problem',
    description: 'Get a design interview problem by slug. Default: statement + clarifying questions + requirements (no solution). '
      + 'Include "solution" (capacity estimation, API, data model, architecture, deep dives, class diagrams…) only when the user asks for the solution/reference design, '
      + 'or for your own reference when evaluating a candidate or giving hints — never paste it to the candidate unprompted. "full" returns the raw markdown file.',
    schema: z.object({
      slug: z.string().describe('Design problem slug as returned by search_design_problems'),
      include: z.array(z.enum(['statement', 'requirements', 'solution', 'followUps', 'mistakes', 'takeaways', 'full']))
        .optional()
        .describe('Sections to include. Default: statement, requirements.'),
    }),
  }
);
