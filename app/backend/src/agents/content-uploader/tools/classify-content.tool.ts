import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { TAXONOMY, TAXONOMY_IDS } from '../../../indexer/taxonomy.js';
import { createLogger } from '../../../utils/logger.js';
import { getCodeBlockLines, isDecorativeHeading, detectToc, type TocEntry } from '../markdown-parser.js';
import type { UploadContext } from '../upload-context.js';

const log = createLogger('classify_content');

// Build lookups for normalizing LLM-provided topic strings
const labelToId = new Map<string, string>();
for (const t of TAXONOMY) {
  labelToId.set(t.id, t.id);
  labelToId.set(t.label.toLowerCase(), t.id);
  labelToId.set(
    t.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    t.id,
  );
}

function resolveTopicIds(raw: string[]): { valid: string[]; rejected: string[] } {
  const valid: string[] = [];
  const rejected: string[] = [];
  for (const r of raw) {
    const cleaned = r.replace(/`/g, '').trim();
    const match = labelToId.get(cleaned) ?? labelToId.get(cleaned.toLowerCase());
    if (match) {
      if (!valid.includes(match)) valid.push(match);
    } else {
      rejected.push(cleaned);
    }
  }
  return { valid, rejected };
}

// ---------------------------------------------------------------------------
// Heading-structure analysis
// ---------------------------------------------------------------------------

interface HeadingInfo {
  level: 1 | 2;
  text: string;
  line: number;
}

/**
 * Analyse a markdown document to determine:
 *  - Which heading level to use for splitting (H1 if 3+ H1 sections, else H2)
 *  - The list of section headings at that level
 *  - Whether the file should be split (3+ distinct sections)
 *  - Whether a Table of Contents exists (tocEntries)
 *
 * Skips headings inside fenced code blocks and decorative-only headings
 * (e.g. "# ━━━━━━") so they don't inflate the section count.
 */
function analyseHeadings(content: string): {
  shouldSplit: boolean;
  splitLevel: 1 | 2;
  sectionHeadings: string[];
  tocEntries: TocEntry[] | null;
} {
  const lines = content.split('\n');
  const codeBlockLines = getCodeBlockLines(lines);
  const h1s: HeadingInfo[] = [];
  const h2s: HeadingInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    // Skip lines inside fenced code blocks
    if (codeBlockLines.has(i)) continue;

    const h1Match = lines[i].match(/^# (.+)/);
    const h2Match = lines[i].match(/^## (.+)/);
    if (h1Match && !h2Match) {
      // Skip decorative headings (only box-drawing / separator chars)
      if (!isDecorativeHeading(h1Match[1])) {
        h1s.push({ level: 1, text: h1Match[1].trim(), line: i + 1 });
      }
    } else if (h2Match) {
      if (!isDecorativeHeading(h2Match[1])) {
        h2s.push({ level: 2, text: h2Match[1].trim(), line: i + 1 });
      }
    }
  }

  // Detect TOC
  const tocEntries = detectToc(content);

  // Filter out boilerplate H1s (title, TOC, quick-reference cards) for the
  // shouldSplit decision only — the returned sectionHeadings includes ALL
  // headings so indices align with parseSections in split_material.
  const boilerplate = /^(table of contents|toc|quick reference|appendix|references|changelog)/i;
  const contentH1s = h1s.filter(h => !boilerplate.test(h.text));

  // Use H1 if there are 3+ content H1 headings; otherwise fall back to H2
  if (contentH1s.length >= 3) {
    return {
      shouldSplit: true,
      splitLevel: 1,
      sectionHeadings: h1s.map(h => h.text),
      tocEntries,
    };
  }

  // H2-level: filter subsection numbering (e.g. "1.1 Foo") to count top-level groups
  const topLevelH2Groups = new Set<string>();
  for (const h of h2s) {
    // Extract the major number prefix if present: "1.1 Foo" → "1", "Hooks" → "Hooks"
    const numMatch = h.text.match(/^(\d+)\.\d+/);
    topLevelH2Groups.add(numMatch ? numMatch[1] : h.text);
  }

  if (topLevelH2Groups.size >= 3 || h2s.length >= 5) {
    return {
      shouldSplit: true,
      splitLevel: 2,
      sectionHeadings: h2s.map(h => h.text),
      tocEntries,
    };
  }

  return { shouldSplit: false, splitLevel: 2, sectionHeadings: [], tocEntries };
}

// ---------------------------------------------------------------------------
// Tool factory
// ---------------------------------------------------------------------------

export const createClassifyContentTool = (ctx?: UploadContext) => tool(
  async (input) => {
    log.info(`INPUT: type=${input.type}, title=${input.title}, topics=${input.topics.length}`);

    const { valid, rejected } = resolveTopicIds(input.topics);

    if (rejected.length > 0) {
      log.warn(`Rejected topic IDs: ${JSON.stringify(rejected)}`);
    }

    // Auto-detect shouldSplit from actual file structure
    let shouldSplit = input.shouldSplit;
    let splitLevel: 1 | 2 = 2;
    let detectedSections: string[] = [];
    let tocEntries: TocEntry[] | null = null;

    if (input.type === 'material' && ctx && input.sourceFileName) {
      const fileContent = ctx.originalFiles.get(input.sourceFileName);
      if (fileContent) {
        const analysis = analyseHeadings(fileContent);
        if (analysis.shouldSplit && !shouldSplit) {
          log.info(`Auto-detected shouldSplit=true (${analysis.sectionHeadings.length} sections at H${analysis.splitLevel} level)`);
        }
        shouldSplit = analysis.shouldSplit;
        splitLevel = analysis.splitLevel;
        detectedSections = analysis.sectionHeadings;
        tocEntries = analysis.tocEntries;
        if (tocEntries) {
          log.info(`Detected TOC with ${tocEntries.length} entries`);
        }
      }
    }

    const output: Record<string, unknown> = {
      status: 'classified',
      type: input.type,
      title: input.title,
      validTopics: valid,
      primaryTopic: valid[0] ?? null,
      rejectedTopics: rejected,
      shouldSplit,
      availableTopicIds: TAXONOMY_IDS,
    };

    // Include section info so the LLM knows how to call split_material
    if (shouldSplit && detectedSections.length > 0) {
      output.splitLevel = splitLevel;
      // Return sections with indices so split_material can use positional matching
      output.detectedSections = detectedSections.map((text, index) => ({ index, text }));

      if (tocEntries && tocEntries.length > 0) {
        output.tocEntries = tocEntries;
        output.splitInstructions =
          `The file has a Table of Contents with ${tocEntries.length} topics and ` +
          `${detectedSections.length} sections at H${splitLevel} level. ` +
          `Create one split file per TOC entry — use the TOC title as the file name. ` +
          `Map each TOC entry to the matching detectedSection index(es) using sectionIndices. ` +
          `Skip the document title section (usually index 0) — it is not a content topic. ` +
          `Headings will be automatically renumbered to start at 1 in each file.`;
      } else {
        output.splitInstructions =
          `The file has ${detectedSections.length} sections at H${splitLevel} level. ` +
          `Create one split file per section — each main topic becomes its own file. ` +
          `Skip document-level headers (titles, tables of contents) — only create files for content sections. ` +
          `Use sectionIndices (the index values from detectedSections) in your split_material call — ` +
          `this is more reliable than heading text matching. ` +
          `Headings will be automatically renumbered to start at 1 in each file.`;
      }
    }

    log.info(`OUTPUT: ${valid.length} valid topics, ${rejected.length} rejected, shouldSplit=${shouldSplit}`);
    return JSON.stringify(output);
  },
  {
    name: 'classify_content',
    description:
      'Classify uploaded content by type, subject, topics, and difficulty. ' +
      'Returns validated taxonomy IDs and determines whether the file should be split ' +
      '(auto-detected from heading structure). ' +
      'Call this FIRST before split_material or save_uploaded_files.',
    schema: z.object({
      content: z.string().describe('Brief summary of the content being classified (not full text)'),
      sourceFileName: z.string().optional().describe('Original uploaded filename — required for material to enable auto-split detection'),
      type: z.enum(['material', 'problem']),
      title: z.string().describe('Title derived from the file content'),
      mainSubject: z.string().optional().describe('For material: broad subject area (e.g., "AI", "JavaScript")'),
      subSubject: z.string().optional().describe('For material: specific sub-topic'),
      classification: z.string().optional().describe('For problems: primary topic from taxonomy'),
      subClassification: z.string().optional(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
      topics: z.array(z.string()).describe('1-3 taxonomy IDs'),
      primaryTopic: z.string().describe('Most relevant taxonomy ID'),
      keyConcepts: z.array(z.string()).optional().describe('3-8 key technical concepts for material'),
      patterns: z.array(z.string()).optional().describe('Algorithm patterns for problems'),
      seniority: z.string().optional().describe('junior | mid | senior | staff | principal'),
      shouldSplit: z.boolean().describe('Whether this material file should be split into sub-files'),
    }),
  },
);
