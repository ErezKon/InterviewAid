/**
 * Shared markdown parsing utilities for content upload splitting.
 *
 * Handles:
 *  - Code-block-aware heading detection (lines inside fenced ``` blocks are skipped)
 *  - Decorative heading filtering (lines like "# ━━━━━━" are not real sections)
 *  - Table of Contents (TOC) detection and parsing
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TocEntry {
  /** 0-based position within the TOC list */
  index: number;
  /** Topic title extracted from the TOC item (e.g. "Python Core Mastery") */
  title: string;
}

// ---------------------------------------------------------------------------
// Code-block awareness
// ---------------------------------------------------------------------------

/**
 * Returns a Set of 0-based line indices that are inside fenced code blocks.
 * Both the opening/closing fence lines and all lines between them are included.
 */
export function getCodeBlockLines(lines: string[]): Set<number> {
  const inside = new Set<number>();
  let inBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart();
    if (trimmed.startsWith('```')) {
      inside.add(i);
      inBlock = !inBlock;
    } else if (inBlock) {
      inside.add(i);
    }
  }
  return inside;
}

// ---------------------------------------------------------------------------
// Decorative heading detection
// ---------------------------------------------------------------------------

/**
 * Check if a heading's text content (after the `#` prefix) is purely decorative.
 * Decorative headings contain only box-drawing / separator characters and whitespace.
 *
 * Examples that return true:
 *   "━━━━━━━━━━━━━━━"
 *   "═══════════════"
 *   "───────────────"
 *   "---"
 */
export function isDecorativeHeading(text: string): boolean {
  const stripped = text.trim();
  if (stripped.length === 0) return true;
  // Box-drawing, dashes, underscores, equals, tildes, asterisks, whitespace
  return /^[━═─—–\-_~*=\s]+$/.test(stripped);
}

// ---------------------------------------------------------------------------
// Table of Contents detection
// ---------------------------------------------------------------------------

/**
 * Detect a Table of Contents section and parse its entries.
 *
 * Looks for a heading (H1-H3) containing "Table of Contents" or "TOC",
 * then parses numbered or bulleted list items below it.
 *
 * Returns `null` if no TOC is found or fewer than 2 entries are detected.
 */
export function detectToc(content: string): TocEntry[] | null {
  const lines = content.split('\n');

  // Find TOC heading
  let tocStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,3}\s+(Table of Contents|TOC)\s*$/i.test(lines[i].trim())) {
      tocStart = i + 1;
      break;
    }
  }

  if (tocStart === -1) return null;

  const entries: TocEntry[] = [];
  let consecutiveEmpty = 0;

  for (let i = tocStart; i < lines.length; i++) {
    const line = lines[i].trim();

    // Stop at next heading or horizontal rule (only after we've collected entries)
    if (/^#{1,6}\s/.test(line)) break;
    if (/^[-*_]{3,}\s*$/.test(line) && entries.length > 0) break;

    if (line === '') {
      consecutiveEmpty++;
      // Two consecutive blanks after entries → end of list
      if (consecutiveEmpty >= 2 && entries.length > 0) break;
      continue;
    }
    consecutiveEmpty = 0;

    // Numbered item: "1. **Topic Name**" or "1. Topic Name" or "1) Topic"
    const numberedMatch = line.match(/^\d+[\.\)]\s+\*{0,2}(.+?)\*{0,2}\s*$/);
    if (numberedMatch) {
      entries.push({ index: entries.length, title: numberedMatch[1].trim() });
      continue;
    }

    // Bulleted item: "- **Topic**" or "- Topic" or "* Topic"
    const bulletMatch = line.match(/^[-*+]\s+\*{0,2}(.+?)\*{0,2}\s*$/);
    if (bulletMatch) {
      entries.push({ index: entries.length, title: bulletMatch[1].trim() });
      continue;
    }
  }

  return entries.length >= 2 ? entries : null;
}
