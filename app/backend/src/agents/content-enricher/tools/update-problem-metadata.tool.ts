import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { METADATA_DIR } from '../../../config/paths.js';
import { TAXONOMY_IDS } from '../../../indexer/taxonomy.js';
import { Problem } from '../../../types/problem.types.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('update_problem_metadata');

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export const createUpdateProblemMetadataTool = () => tool(
  async (input) => {
    log.info(`INPUT: ${input.updates.length} updates`);

    const problemsPath = path.join(METADATA_DIR, 'problems.json');
    if (!fs.existsSync(problemsPath)) {
      return JSON.stringify({ error: 'problems.json not found' });
    }

    const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
    const bySlug = new Map(problems.map(p => [p.slug, p]));

    const validTopicIds = new Set(TAXONOMY_IDS);
    const results: { slug: string; status: string }[] = [];

    for (const update of input.updates) {
      const slug = slugify(update.title);
      const problem = bySlug.get(slug);

      if (!problem) {
        results.push({ slug, status: 'not_found' });
        continue;
      }

      // Validate and set topics
      const validTopics = update.topics.filter(t => validTopicIds.has(t));
      if (validTopics.length > 0) {
        problem.topics = validTopics;
        problem.primaryTopic = validTopics[0];
      }

      if (update.seniority) problem.seniority = update.seniority;
      if (update.oneLiner) problem.oneLiner = update.oneLiner;
      if (update.patterns) problem.patterns = update.patterns;

      results.push({ slug, status: 'updated' });
    }

    fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));

    const updated = results.filter(r => r.status === 'updated').length;
    const notFound = results.filter(r => r.status === 'not_found').length;

    const output = JSON.stringify({
      totalUpdated: updated,
      notFound,
      results,
      validTopicIds: TAXONOMY_IDS,
    });

    log.info(`OUTPUT: ${updated} updated, ${notFound} not found`);
    return output;
  },
  {
    name: 'update_problem_metadata',
    description: 'Update classification metadata (topics, seniority, patterns, oneLiner) for problems in problems.json. Provide an array of updates keyed by problem title. Topics must be valid taxonomy IDs.',
    schema: z.object({
      updates: z.array(z.object({
        title: z.string().describe('Problem title (used to derive slug)'),
        topics: z.array(z.string()).describe('Array of taxonomy topic IDs (e.g. "arrays-hashing", "dynamic-programming")'),
        seniority: z.string().optional().describe('junior, mid, senior, staff, principal'),
        oneLiner: z.string().optional().describe('One-line problem summary'),
        patterns: z.array(z.string()).optional().describe('Algorithm patterns (e.g. "Two Pointers", "Sliding Window")'),
      })).describe('Array of classification updates'),
    }),
  }
);
