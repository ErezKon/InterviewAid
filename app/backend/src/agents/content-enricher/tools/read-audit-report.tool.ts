import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, PROBLEMS_DIR } from '../../../config/paths.js';
import { createLogger } from '../../../utils/logger.js';
import {
  type AuditItem,
  type InsufficientContentItem,
  extractSection,
  parseInsufficientContent,
  parseWrongPrimaryTopic,
  parseMissingSubTopics,
  parseSummary,
} from '../audit-report-parser.js';

const log = createLogger('read_audit_report');

const DEFAULT_AUDIT_PATH = path.join(CONTENT_ROOT, 'LeetCode', 'audit_report.md');

export const createReadAuditReportTool = () => tool(
  async (input) => {
    const auditPath = input.filePath || DEFAULT_AUDIT_PATH;
    const issueType = input.issueType;
    const offset = input.offset ?? 0;
    const batchSize = Math.min(input.batchSize ?? 20, 50);

    log.info(`INPUT: issueType=${issueType}, offset=${offset}, batchSize=${batchSize}, file=${auditPath}`);

    if (!fs.existsSync(auditPath)) {
      return JSON.stringify({ error: `Audit report not found: ${auditPath}` });
    }

    const content = fs.readFileSync(auditPath, 'utf-8');

    // Return summary if requested
    if (issueType === 'summary') {
      const summary = parseSummary(content);
      log.info(`OUTPUT: summary`);
      return JSON.stringify({ issueType: 'summary', summary });
    }

    let allItems: AuditItem[] = [];

    if (issueType === 'insufficient_content') {
      const tableLines = extractSection(content, '## 1. Insufficient Content');
      const parsed = parseInsufficientContent(tableLines);
      // Filter out items that are already fixed (all missing sections now exist)
      allItems = parsed.filter((item) => {
        const ic = item as InsufficientContentItem;
        const filePath = path.join(PROBLEMS_DIR, ic.filename);
        if (!fs.existsSync(filePath)) return true; // still unfixed (file missing)
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return ic.missingSections.some(s => {
          if (s === 'examples')    return !/##\s+(\d+\.\s+)?Examples?/i.test(fileContent);
          if (s === 'approach')    return !/##\s+(\d+\.\s+)?Approach/i.test(fileContent);
          if (s === 'walkthrough') return !/##\s+(\d+\.\s+)?Walkthrough/i.test(fileContent);
          if (s === 'complexity')  return !/##\s+(\d+\.\s+)?Complexity/i.test(fileContent);
          return true;
        });
      });
    } else if (issueType === 'wrong_primary_topic') {
      const tableLines = extractSection(content, '## 2. Wrong Primary Topic');
      allItems = parseWrongPrimaryTopic(tableLines);
    } else if (issueType === 'missing_sub_topics') {
      const tableLines = extractSection(content, '## 3. Missing Sub-Topics');
      allItems = parseMissingSubTopics(tableLines);
    }

    const batch = allItems.slice(offset, offset + batchSize);
    const hasMore = (offset + batchSize) < allItems.length;

    const output = JSON.stringify({
      issueType,
      totalIssues: allItems.length,
      offset,
      batchSize,
      returnedCount: batch.length,
      hasMore,
      nextOffset: hasMore ? offset + batchSize : null,
      items: batch,
    });

    log.info(`OUTPUT: ${batch.length}/${allItems.length} items (offset=${offset}, hasMore=${hasMore})`);
    return output;
  },
  {
    name: 'read_audit_report',
    description:
      'Read and parse the LeetCode audit report to get structured batches of issues. ' +
      'Supports issue types: "summary" (overview counts), "insufficient_content" (files needing enrichment), ' +
      '"wrong_primary_topic" (problems with incorrect primaryTopic), "missing_sub_topics" (problems missing sub-classifications). ' +
      'Returns paginated results with hasMore/nextOffset for batching.',
    schema: z.object({
      issueType: z.enum(['summary', 'insufficient_content', 'wrong_primary_topic', 'missing_sub_topics'])
        .describe('Type of audit issue to retrieve'),
      filePath: z.string().optional()
        .describe('Absolute path to the audit report .md file. Defaults to CONTENT_ROOT/LeetCode/audit_report.md'),
      offset: z.number().optional()
        .describe('0-indexed offset for pagination (default 0). Use nextOffset from previous result.'),
      batchSize: z.number().optional()
        .describe('Max items per batch (default 20, max 50).'),
    }),
  }
);
