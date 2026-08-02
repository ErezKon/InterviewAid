import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { getSubjectById } from '../../../services/subject.service.js';
import { createLogger } from '../../../utils/logger.js';

const log = createLogger('get_subject');

/* ── Section-extraction helpers ─────────────────────────────────── */

interface HeadingInfo { level: number; text: string; start: number }

/** Parse every markdown heading (# … ######) with its position. */
function parseHeadings(md: string): HeadingInfo[] {
  const regex = /^(#{1,6})\s+(.+)$/gm;
  const out: HeadingInfo[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(md)) !== null) {
    out.push({ level: m[1].length, text: m[2].trim(), start: m.index });
  }
  return out;
}

/** Strip leading number prefixes so "1.2 Types of Memory" → "types of memory". */
function normalizeForMatch(text: string): string {
  return text
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/^\d+\.\d+[\.\)]*\s*/, '')
    .trim()
    .toLowerCase();
}

/** Find the heading that best matches a free-text query. */
function findMatchingHeading(headings: HeadingInfo[], query: string): HeadingInfo | null {
  const q = query.toLowerCase().trim();

  // 1. Exact match after normalization
  const exact = headings.find(h => normalizeForMatch(h.text) === q);
  if (exact) return exact;

  // 2. Normalized heading contains the query
  const contains = headings.find(h => normalizeForMatch(h.text).includes(q));
  if (contains) return contains;

  // 3. Query contains the normalized heading (skip very short headings)
  const reverse = headings.find(h => {
    const n = normalizeForMatch(h.text);
    return n.length > 3 && q.includes(n);
  });
  return reverse ?? null;
}

/** Extract content from a heading to the next heading of same or higher level. */
function extractSectionContent(
  md: string, headings: HeadingInfo[], matched: HeadingInfo,
): string {
  const idx = headings.indexOf(matched);
  let endPos = md.length;
  for (let i = idx + 1; i < headings.length; i++) {
    if (headings[i].level <= matched.level) { endPos = headings[i].start; break; }
  }
  return md.slice(matched.start, endPos).trim();
}

/* ── Tool ───────────────────────────────────────────────────────── */

export const createGetSubjectTool = () => tool(
  async (input) => {
    log.info(`INPUT: id=${input.id}, section=${input.section ?? 'none'}, maxChars=${input.maxChars ?? 12000}`);

    const subject = getSubjectById(input.id);
    const maxChars = input.maxChars ?? 12000;
    const headings = parseHeadings(subject.bodyMd);
    const sections = headings.map(h => h.text);

    let bodyMd = subject.bodyMd;
    let sectionExtracted = false;
    let matchedSection: string | null = null;

    // If a section was requested, try to extract just that section
    if (input.section) {
      const matched = findMatchingHeading(headings, input.section);
      if (matched) {
        bodyMd = extractSectionContent(subject.bodyMd, headings, matched);
        sectionExtracted = true;
        matchedSection = matched.text;
        log.info(`Extracted section "${matched.text}"`);
      } else {
        log.info(`No section match for "${input.section}", returning full content`);
      }
    }

    // Truncate on section boundary if still too long
    if (bodyMd.length > maxChars) {
      const truncated = bodyMd.slice(0, maxChars);
      const lastSection = truncated.lastIndexOf('\n## ');
      bodyMd = lastSection > 0
        ? truncated.slice(0, lastSection) + '\n\n[...truncated]'
        : truncated + '\n\n[...truncated]';
    }

    const result = JSON.stringify({
      id: subject.id,
      title: subject.title,
      sourceFile: subject.sourceFile,
      mainSubject: subject.mainSubject,
      subSubject: subject.subSubject,
      primaryTopic: subject.primaryTopic,
      keyConcepts: subject.keyConcepts,
      wordCount: subject.wordCount,
      sections,
      sectionExtracted,
      matchedSection,
      bodyMd,
    });

    log.info(`OUTPUT: ${result.length} chars, sectionExtracted=${sectionExtracted}`);
    return result;
  },
  {
    name: 'get_subject',
    description: 'Get content of a theoretical subject by ID. Optionally pass a `section` name to retrieve only the matching section instead of the full file. Always returns the list of available sections for navigation.',
    schema: z.object({
      id: z.string().describe('Subject ID'),
      section: z.string().optional().describe('Section heading to extract (e.g. "types of memory"). If omitted, returns full content.'),
      maxChars: z.number().optional().describe('Max characters for body (default 12000)'),
    }),
  }
);
