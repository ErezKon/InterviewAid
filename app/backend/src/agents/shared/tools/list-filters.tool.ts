import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getDb } from '../../../db/connection.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('list_filters');

export const createListFiltersTool = () => tool(
  async (input) => {
    log.info(`INPUT: kind=${input.kind}, q=${input.q ?? ''}`);
    const db = getDb();
    let results: any[];

    switch (input.kind) {
      case 'companies': {
        if (input.q) {
          results = db.prepare(
            'SELECT slug, name FROM companies WHERE name LIKE ? ORDER BY problem_count DESC LIMIT 30'
          ).all(`%${input.q}%`);
        } else {
          results = db.prepare(
            'SELECT slug, name FROM companies ORDER BY problem_count DESC LIMIT 50'
          ).all();
        }
        break;
      }
      case 'topics': {
        results = db.prepare('SELECT id, label FROM topics ORDER BY label').all();
        if (input.q) {
          const q = input.q.toLowerCase();
          results = results.filter((r: any) => r.label.toLowerCase().includes(q) || r.id.includes(q));
        }
        break;
      }
      case 'difficulties': {
        results = [{ id: 'Easy' }, { id: 'Medium' }, { id: 'Hard' }];
        break;
      }
      default:
        results = [];
    }

    const result = JSON.stringify({ kind: input.kind, count: results.length, items: results });
    log.info(`OUTPUT: ${results.length} items`);
    return result;
  },
  {
    name: 'list_filters',
    description: 'List canonical filter values (companies, topics, or difficulties). Use to resolve user-provided names like "Dell" to the slug "dell", or "system design" to "system-design". Always call before search_problems for named entities.',
    schema: z.object({
      kind: z.enum(['companies', 'topics', 'difficulties']).describe('Which filter list to retrieve'),
      q: z.string().optional().describe('Optional search query to filter results'),
    }),
  }
);
