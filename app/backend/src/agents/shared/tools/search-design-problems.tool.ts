import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { queryDesignProblems } from '../../../services/design.service.js';
import { DESIGN_CATEGORIES } from '../../../indexer/taxonomy.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('search_design_problems');

export const createSearchDesignProblemsTool = () => tool(
  async (input) => {
    log.info(`INPUT: ${JSON.stringify(input)}`);

    const { items, total } = queryDesignProblems({
      q: input.query,
      categories: input.categories,
      difficulties: input.difficulties,
      seniority: input.seniority,
      companies: input.companies,
      randomize: input.randomize,
      excludeSlugs: input.excludeSlugs,
      page: 1,
      pageSize: Math.min(input.limit ?? 10, 25),
    });

    const compact = items.map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      difficulty: p.difficulty,
      seniority: p.seniority,
      timeMinutes: p.timeMinutes,
      summary: p.summary,
      topCompanies: p.companies.slice(0, 5),
    }));

    log.info(`OUTPUT: found ${compact.length} of ${total} results`);
    return JSON.stringify({ count: compact.length, total, designProblems: compact });
  },
  {
    name: 'search_design_problems',
    description: 'Search the DESIGN interview problem bank (system design / HLD, low-level OOP design, frontend system design, AI/ML system design). '
      + 'Use this — not search_problems — for any "design X" / system design / LLD / architecture interview question. Returns compact cards without solutions.',
    schema: z.object({
      query: z.string().optional().describe('Free-text query, e.g. "url shortener", "rate limiter", "RAG", "parking lot"'),
      categories: z.array(z.enum(DESIGN_CATEGORIES.map(c => c.id) as [string, ...string[]])).optional()
        .describe('system-design = HLD/distributed systems, oop-design = low-level/OOP design, frontend-system-design, ai-ml-system-design'),
      difficulties: z.array(z.enum(['Easy', 'Medium', 'Hard'])).optional(),
      seniority: z.enum(['junior', 'mid', 'senior', 'staff']).optional(),
      companies: z.array(z.string()).optional().describe('Company names (case-insensitive substring match), e.g. ["Google", "Meta"]'),
      limit: z.number().optional().describe('Max results (default 10, max 25)'),
      randomize: z.boolean().optional().describe('Random order — use for random / "surprise me" requests'),
      excludeSlugs: z.array(z.string()).optional().describe('Design slugs already shown — use for "another/different" requests'),
    }),
  }
);
