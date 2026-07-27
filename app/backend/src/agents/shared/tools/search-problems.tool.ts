import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { queryProblems } from '../../../services/problem.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('search_problems');

export const createSearchProblemsTool = () => tool(
  async (input) => {
    log.info(`INPUT: ${JSON.stringify(input)}`);

    const { items } = queryProblems({
      q: input.query,
      companies: input.companies,
      difficulties: input.difficulties,
      topics: input.topics,
      patterns: input.patterns,
      seniority: input.seniority,
      matchMode: input.matchMode as 'any' | 'all' | undefined,
      minInterviewValue: input.minInterviewValue,
      page: 1,
      pageSize: Math.min(input.limit ?? 10, 25),
    });

    const compact = items.map(p => ({
      slug: p.slug,
      title: p.title,
      difficulty: p.difficulty,
      primaryTopic: p.primaryTopic,
      oneLiner: p.oneLiner,
      topCompanies: p.companies.slice(0, 5).map(c => c.name),
    }));

    const result = JSON.stringify({ count: compact.length, problems: compact });
    log.info(`OUTPUT: found ${compact.length} results`);
    return result;
  },
  {
    name: 'search_problems',
    description: 'Search the problem database with filters. Before calling, use list_filters to resolve company/topic names to canonical slugs. Returns compact list without solution bodies.',
    schema: z.object({
      query: z.string().optional().describe('Free-text search query'),
      companies: z.array(z.string()).optional().describe('Company slugs (use list_filters first)'),
      difficulties: z.array(z.string()).optional().describe('Easy, Medium, Hard'),
      topics: z.array(z.string()).optional().describe('Topic IDs from taxonomy'),
      patterns: z.array(z.string()).optional().describe('Algorithm pattern strings'),
      seniority: z.string().optional().describe('junior, mid, senior, staff, principal'),
      matchMode: z.enum(['any', 'all']).optional().describe('How to combine multi-value filters'),
      minInterviewValue: z.number().optional().describe('Minimum interview value 1-5'),
      limit: z.number().optional().describe('Max results (default 10, max 25)'),
    }),
  }
);
