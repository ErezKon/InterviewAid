import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { querySubjects } from '../../../services/subject.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('search_subjects');

export const createSearchSubjectsTool = () => tool(
  async (input) => {
    log.info(`INPUT: query=${input.query}, topics=${input.topics?.join(',') ?? ''}`);

    const { items } = querySubjects({
      q: input.query,
      topics: input.topics,
      page: 1,
      pageSize: Math.min(input.limit ?? 10, 25),
    });

    const compact = items.map(s => ({
      id: s.id,
      title: s.title,
      sourceFile: s.sourceFile,
      primaryTopic: s.primaryTopic,
      keyConcepts: s.keyConcepts,
      wordCount: s.wordCount,
    }));

    const result = JSON.stringify({ count: compact.length, subjects: compact });
    log.info(`OUTPUT: found ${compact.length} subjects`);
    return result;
  },
  {
    name: 'search_subjects',
    description: 'Search theoretical subjects (interview theory materials). Returns subject list with IDs for further retrieval via get_subject.',
    schema: z.object({
      query: z.string().describe('Search query for subjects'),
      topics: z.array(z.string()).optional().describe('Filter by topic IDs'),
      limit: z.number().optional().describe('Max results (default 10)'),
    }),
  }
);
