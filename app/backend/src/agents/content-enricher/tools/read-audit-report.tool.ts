import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT } from '../../../config/paths.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('read_audit_report');

const DEFAULT_AUDIT_PATH = path.join(CONTENT_ROOT, 'LeetCode', 'audit_report.md');

// ── Parsers for each audit section ──────────────────────────────────────────

interface InsufficientContentItem {
  filename: string;
  missingSections: string[];
  lines: number;
}

interface WrongPrimaryTopicItem {
  title: string;
  currentPrimary: string;
  shouldBe: string;
  additionalSubTopics: string[];
}

interface MissingSubTopicsItem {
  title: string;
  primary: string;
  currentTopics: string[];
  missingSubTopics: string[];
}

type AuditItem = InsufficientContentItem | WrongPrimaryTopicItem | MissingSubTopicsItem;

function parseInsufficientContent(tableLines: string[]): InsufficientContentItem[] {
  const items: InsufficientContentItem[] = [];
  for (const line of tableLines) {
    // | 1 | Active Businesses.md | examples, walkthrough, complexity | 25 |
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 4 || cols[0] === '#') continue;
    const filename = cols[1];
    const missingSections = cols[2].split(',').map(s => s.trim()).filter(Boolean);
    const lines = parseInt(cols[3], 10) || 0;
    items.push({ filename, missingSections, lines });
  }
  return items;
}

function parseWrongPrimaryTopic(tableLines: string[]): WrongPrimaryTopicItem[] {
  const items: WrongPrimaryTopicItem[] = [];
  for (const line of tableLines) {
    // | 1 | 3Sum Closest | `arrays-hashing` | `two-pointers` | — |
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 5 || cols[0] === '#') continue;
    const title = cols[1];
    const currentPrimary = cols[2].replace(/`/g, '');
    const shouldBe = cols[3].replace(/`/g, '');
    const additionalRaw = cols[4].replace(/`/g, '').trim();
    const additionalSubTopics = additionalRaw === '—' || additionalRaw === '-'
      ? []
      : additionalRaw.split(',').map(s => s.trim()).filter(Boolean);
    items.push({ title, currentPrimary, shouldBe, additionalSubTopics });
  }
  return items;
}

function parseMissingSubTopics(tableLines: string[]): MissingSubTopicsItem[] {
  const items: MissingSubTopicsItem[] = [];
  for (const line of tableLines) {
    // | 1 | 01 Matrix | `arrays-hashing` | `arrays-hashing` | `graphs` |
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 5 || cols[0] === '#') continue;
    const title = cols[1];
    const primary = cols[2].replace(/`/g, '');
    const currentTopics = cols[3].replace(/`/g, '').split(',').map(s => s.trim()).filter(Boolean);
    const missingSubTopics = cols[4].replace(/`/g, '').split(',').map(s => s.trim()).filter(Boolean);
    items.push({ title, primary, currentTopics, missingSubTopics });
  }
  return items;
}

function extractSection(content: string, sectionHeader: string): string[] {
  const lines = content.split('\n');
  let inSection = false;
  let pastHeader = false;
  const tableLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## ') && inSection) break; // next section
    if (line.includes(sectionHeader)) {
      inSection = true;
      continue;
    }
    if (inSection) {
      // Skip sub-headers like ### 1b.
      if (line.startsWith('### ')) { continue; }
      // Skip the table header row and separator
      if (line.startsWith('| #') || line.startsWith('|---')) {
        pastHeader = true;
        continue;
      }
      if (pastHeader && line.startsWith('|')) {
        tableLines.push(line);
      }
    }
  }
  return tableLines;
}

function parseSummary(content: string): Record<string, number> {
  const summary: Record<string, number> = {};
  const headerMatch = content.match(/\*\*Total files scanned:\*\*\s*(\d+)/);
  if (headerMatch) summary.totalFiles = parseInt(headerMatch[1], 10);

  const sufficientMatch = content.match(/\*\*Sufficient content:\*\*\s*(\d+)/);
  if (sufficientMatch) summary.sufficientContent = parseInt(sufficientMatch[1], 10);

  const insufficientMatch = content.match(/\*\*Insufficient content:\*\*\s*(\d+)/);
  if (insufficientMatch) summary.insufficientContent = parseInt(insufficientMatch[1], 10);

  const wrongTopicMatch = content.match(/\*\*Wrong primary topic:\*\*\s*(\d+)/);
  if (wrongTopicMatch) summary.wrongPrimaryTopic = parseInt(wrongTopicMatch[1], 10);

  const missingSubMatch = content.match(/\*\*Missing sub-topics:\*\*\s*(\d+)/);
  if (missingSubMatch) summary.missingSubTopics = parseInt(missingSubMatch[1], 10);

  return summary;
}

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
      allItems = parseInsufficientContent(tableLines);
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
