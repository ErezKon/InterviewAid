import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { METADATA_DIR } from '../../../config/paths.js';
import { TAXONOMY, TAXONOMY_IDS } from '../../../indexer/taxonomy.js';
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
    // Build a secondary index by filename (from filePath) for fallback matching
    const byFilename = new Map<string, Problem>();
    for (const p of problems) {
      if (p.filePath) {
        const fname = path.basename(p.filePath, '.md');
        byFilename.set(fname.toLowerCase(), p);
      }
    }

    const validTopicIds = new Set(TAXONOMY_IDS);
    // Build a lookup from slugified label → id for normalizing LLM-sent topic strings
    const labelToId = new Map<string, string>();
    for (const t of TAXONOMY) {
      labelToId.set(t.id, t.id);
      labelToId.set(slugify(t.label), t.id);
      labelToId.set(t.label.toLowerCase(), t.id);
    }

    const results: { slug: string; status: string }[] = [];
    let rejectedSample: string[] = [];

    for (const update of input.updates) {
      const slug = slugify(update.title);
      // Try slug match first, then fall back to filename match
      const problem = bySlug.get(slug)
        ?? byFilename.get(update.title.toLowerCase());

      if (!problem) {
        results.push({ slug, status: 'not_found' });
        continue;
      }

      // Normalize and validate topics — accept IDs, slugified labels, or lowercase labels
      const resolved: string[] = [];
      for (const raw of update.topics) {
        const cleaned = raw.replace(/`/g, '').trim();
        const match = labelToId.get(cleaned) ?? labelToId.get(slugify(cleaned));
        if (match) {
          resolved.push(match);
        } else if (rejectedSample.length < 5) {
          rejectedSample.push(cleaned);
        }
      }
      // Deduplicate while preserving order
      const validTopics = [...new Set(resolved)];
      let topicsChanged = false;
      if (validTopics.length > 0) {
        problem.topics = validTopics;
        problem.primaryTopic = validTopics[0];
        topicsChanged = true;
      }

      if (update.seniority) problem.seniority = update.seniority;
      if (update.oneLiner) problem.oneLiner = update.oneLiner;
      if (update.patterns) problem.patterns = update.patterns;

      results.push({ slug, status: topicsChanged ? 'updated' : 'no_valid_topics' });
    }

    fs.writeFileSync(problemsPath, JSON.stringify(problems, null, 2));

    const updated = results.filter(r => r.status === 'updated').length;
    const notFound = results.filter(r => r.status === 'not_found').length;
    const noValidTopics = results.filter(r => r.status === 'no_valid_topics').length;

    if (rejectedSample.length > 0) {
      log.warn(`Rejected topic samples: ${JSON.stringify(rejectedSample)}`);
    }

    const output = JSON.stringify({
      totalUpdated: updated,
      notFound,
      noValidTopics,
      results,
      validTopicIds: TAXONOMY_IDS,
    });

    log.info(`OUTPUT: ${updated} updated, ${notFound} not found, ${noValidTopics} no valid topics`);
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
