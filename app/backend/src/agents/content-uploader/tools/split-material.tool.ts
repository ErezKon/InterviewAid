import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { createLogger } from '../../../utils/logger.js';
import { getCodeBlockLines, isDecorativeHeading } from '../markdown-parser.js';
import type { UploadContext } from '../upload-context.js';

const log = createLogger('split_material');

// ---------------------------------------------------------------------------
// Heading helpers
// ---------------------------------------------------------------------------

/** Normalise a heading for fuzzy matching: strip numbering, lowercase, trim. */
function normalizeHeading(h: string): string {
  return h
    .trim()
    .replace(/^\d+[\.\)]\s*/, '')           // "1. Foo" → "Foo"
    .replace(/^Part\s+[IVXLCDM\d]+\s*[—–\-:]\s*/i, '')
    .toLowerCase();
}

/**
 * Renumber heading prefixes so each split file's topics start at 1.
 *
 * Given content that originally had e.g. "# 11. Architecture" / "## 11.1 …",
 * this rewrites it to "# 1. Architecture" / "## 1.1 …".
 *
 * Only heading lines (starting with `#`) with a leading number are affected.
 * The major number (before the first dot) is remapped; sub-numbers are kept.
 */
function renumberHeadings(content: string): string {
  const lines = content.split('\n');

  // First pass: collect unique major heading numbers in order of appearance
  const majorNumbers: number[] = [];
  for (const line of lines) {
    const m = line.match(/^#{1,6}\s+(\d+)[\.\)]/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (!majorNumbers.includes(num)) majorNumbers.push(num);
    }
  }

  if (majorNumbers.length === 0) return content; // no numbered headings

  // Build old → new mapping (sequential from 1)
  const renumberMap = new Map<number, number>();
  majorNumbers.forEach((oldNum, idx) => renumberMap.set(oldNum, idx + 1));

  // Second pass: replace major numbers in heading lines
  return lines
    .map(line => {
      const m = line.match(/^(#{1,6}\s+)(\d+)([\.\)].*)/);
      if (m) {
        const newNum = renumberMap.get(parseInt(m[2], 10));
        if (newNum !== undefined) return `${m[1]}${newNum}${m[3]}`;
      }
      return line;
    })
    .join('\n');
}

interface Section {
  heading: string;       // raw heading text (without the "#"/"## " prefix)
  headingLine: string;   // full line including "#"/"## "
  body: string;          // everything from heading line to next same-level heading (exclusive)
}

/**
 * Auto-detect the primary heading level used for major sections.
 * If there are 3+ H1 headings (excluding boilerplate like titles/TOC),
 * sections are at H1 level; otherwise at H2.
 *
 * Skips headings inside fenced code blocks and decorative-only headings.
 */
function detectSplitLevel(content: string): 1 | 2 {
  const boilerplate = /^(table of contents|toc|quick reference|appendix|references|changelog)/i;
  const lines = content.split('\n');
  const codeBlockLines = getCodeBlockLines(lines);
  let h1Count = 0;

  for (let i = 0; i < lines.length; i++) {
    if (codeBlockLines.has(i)) continue;
    const h1 = lines[i].match(/^# ([^#].+)/);
    if (h1 && !boilerplate.test(h1[1].trim()) && !isDecorativeHeading(h1[1])) {
      h1Count++;
    }
  }

  return h1Count >= 3 ? 1 : 2;
}

/**
 * Parse a markdown document into sections at the given heading level.
 * Content before the first heading at that level is the preamble.
 *
 * Skips headings inside fenced code blocks and decorative-only headings
 * (e.g. "# ━━━━━━") — these are treated as body content, not section boundaries.
 *
 * Uses a regex WITHOUT the $ anchor — trailing \r from CRLF line endings
 * prevents $ from matching after split('\n').
 */
function parseSections(content: string, level: 1 | 2): { preamble: string; sections: Section[] } {
  // Match "# text" but NOT "## text" (H1), or "## text" but NOT "### text" (H2).
  // No $ anchor — trailing \r from CRLF breaks $ after split('\n').
  const headingRegex = level === 1
    ? /^# ([^#].+)/
    : /^## ([^#].+)/;

  const lines = content.split('\n');
  const codeBlockLines = getCodeBlockLines(lines);
  const sections: Section[] = [];
  let preambleLines: string[] = [];
  let currentHeading: string | null = null;
  let currentHeadingLine: string | null = null;
  let currentBody: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Lines inside fenced code blocks are never headings
    if (codeBlockLines.has(i)) {
      currentBody.push(line);
      continue;
    }

    const match = line.match(headingRegex);

    // Decorative headings (only box-drawing / separator chars) are body content
    if (match && isDecorativeHeading(match[1])) {
      currentBody.push(line);
      continue;
    }

    if (match) {
      if (currentHeading !== null) {
        sections.push({
          heading: currentHeading,
          headingLine: currentHeadingLine!,
          body: [currentHeadingLine!, ...currentBody].join('\n'),
        });
      } else {
        preambleLines = currentBody;
      }
      currentHeading = match[1].trim();
      currentHeadingLine = line;
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  // Flush last section
  if (currentHeading !== null) {
    sections.push({
      heading: currentHeading,
      headingLine: currentHeadingLine!,
      body: [currentHeadingLine!, ...currentBody].join('\n'),
    });
  } else {
    preambleLines = [...preambleLines, ...currentBody];
  }

  return { preamble: preambleLines.join('\n').trim(), sections };
}

// ---------------------------------------------------------------------------
// Tool factory
// ---------------------------------------------------------------------------

export const createSplitMaterialTool = (ctx: UploadContext) => tool(
  async (input) => {
    log.info(`INPUT: sourceFile=${input.sourceFileName}, mainSubject=${input.mainSubject}, splits=${input.splits.length}`);

    // Resolve original content from context
    const originalContent = ctx.originalFiles.get(input.sourceFileName);
    if (!originalContent) {
      const available = [...ctx.originalFiles.keys()].join(', ');
      const msg = `Source file "${input.sourceFileName}" not found in upload context. Available: ${available}`;
      log.error(msg);
      return JSON.stringify({ error: msg });
    }

    // Auto-detect heading level
    const splitLevel = detectSplitLevel(originalContent);
    log.info(`Detected split level: H${splitLevel}`);

    const { preamble, sections } = parseSections(originalContent, splitLevel);
    log.info(`Parsed ${sections.length} sections (preamble: ${preamble.length > 0 ? 'yes' : 'no'})`);

    // Build a normalised-heading → section index lookup
    const normMap = new Map<string, number>();
    sections.forEach((sec, idx) => {
      normMap.set(normalizeHeading(sec.heading), idx);
    });

    const results: { fileName: string; subSubject: string; lineCount: number }[] = [];
    const assignedSections = new Set<number>();

    for (const split of input.splits) {
      const matchedIdxs: number[] = [];

      // Primary matching: use section indices if provided
      if (split.sectionIndices && split.sectionIndices.length > 0) {
        for (const idx of split.sectionIndices) {
          if (idx >= 0 && idx < sections.length) {
            matchedIdxs.push(idx);
            assignedSections.add(idx);
          } else {
            log.warn(`Split "${split.fileName}" references out-of-range section index ${idx} (total sections: ${sections.length})`);
          }
        }
      }

      // Fallback: match by heading text if no indices provided or indices yielded nothing
      if (matchedIdxs.length === 0 && split.sectionHeadings && split.sectionHeadings.length > 0) {
        for (const reqHeading of split.sectionHeadings) {
          const norm = normalizeHeading(reqHeading);
          const idx = normMap.get(norm);
          if (idx !== undefined) {
            matchedIdxs.push(idx);
            assignedSections.add(idx);
          } else {
            // Try substring matching as fallback
            for (const [normKey, secIdx] of normMap.entries()) {
              if (normKey.includes(norm) || norm.includes(normKey)) {
                if (!matchedIdxs.includes(secIdx)) {
                  matchedIdxs.push(secIdx);
                  assignedSections.add(secIdx);
                }
              }
            }
          }
        }
      }

      // Sort matched sections by their original order
      matchedIdxs.sort((a, b) => a - b);

      if (matchedIdxs.length === 0) {
        log.warn(
          `Split "${split.fileName}" matched 0 sections` +
          (split.sectionHeadings?.length ? ` for headings: ${JSON.stringify(split.sectionHeadings)}` : '') +
          (split.sectionIndices?.length ? ` for indices: ${JSON.stringify(split.sectionIndices)}` : ''),
        );
      }

      // Build the split content — renumber headings so each file starts at 1
      const parts: string[] = [];

      // Include preamble in the first split only
      if (results.length === 0 && preamble) {
        parts.push(preamble);
      }

      for (const idx of matchedIdxs) {
        parts.push(sections[idx].body);
      }

      const joined = renumberHeadings(parts.join('\n\n'));

      // Store in context for save_uploaded_files to pick up
      if (joined.trim().length > 0) {
        ctx.splitFiles.set(split.fileName, joined);
      } else {
        log.warn(`Split "${split.fileName}" produced empty content — skipping context entry`);
      }

      results.push({
        fileName: split.fileName,
        subSubject: split.subSubject,
        lineCount: joined.split('\n').length,
      });
    }

    // Warn about unassigned sections
    const unassigned = sections
      .filter((_, idx) => !assignedSections.has(idx))
      .map(s => s.heading);
    if (unassigned.length > 0) {
      log.warn(`Unassigned sections: ${JSON.stringify(unassigned)}`);
    }

    const emptyFiles = results.filter(r => r.lineCount === 0 || !ctx.splitFiles.has(r.fileName));

    const output = {
      splitCount: results.length,
      splitLevel,
      files: results,
      unassignedSections: unassigned,
      ...(emptyFiles.length > 0 && {
        emptyFiles: emptyFiles.map(f => f.fileName),
        warning: `${emptyFiles.length} split(s) produced empty content — their section headings did not match the document. ` +
          'Use sectionIndices (from detectedSections) or exact heading text from classify_content.',
      }),
    };

    log.info(`OUTPUT: ${results.length} splits produced at H${splitLevel}, ${unassigned.length} unassigned sections, ${emptyFiles.length} empty splits`);
    return JSON.stringify(output);
  },
  {
    name: 'split_material',
    description:
      'Split a large material file into per-topic sub-files using heading-based boundaries. ' +
      'The tool reads the original content from context — do NOT pass full content. ' +
      'It auto-detects whether to split by H1 or H2 headings. ' +
      'Heading numbers are automatically renumbered so each file starts at 1. ' +
      'Prefer sectionIndices (from classify_content detectedSections) over sectionHeadings for reliable matching.',
    schema: z.object({
      sourceFileName: z.string().describe('The original uploaded filename to split'),
      mainSubject: z.string().describe('Broad subject area (e.g., "AI", "JavaScript")'),
      splits: z.array(z.object({
        fileName: z.string().describe('Output filename for this split (e.g., "AI Agents.md")'),
        subSubject: z.string().describe('Sub-subject name for this split'),
        sectionIndices: z.array(z.number()).optional().describe(
          'Indices into the detectedSections array from classify_content. ' +
          'Preferred over sectionHeadings — uses positional matching so heading text mismatches cannot occur.',
        ),
        sectionHeadings: z.array(z.string()).optional().describe(
          'Fallback: section heading texts that belong in this split. ' +
          'Must match the EXACT text from detectedSections. ' +
          'Prefer sectionIndices instead for reliable matching.',
        ),
      })).describe('Array of split definitions — each groups sections into one output file'),
    }),
  },
);
