import fs from 'node:fs';
import path from 'node:path';
import { Subject } from '../types/problem.types.js';
import { THEORY_FILES, METADATA_DIR, CONTENT_ROOT } from '../config/paths.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('parse-theory');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export async function parseTheory(): Promise<void> {
  log.info('Starting theory parsing...');

  const subjects: Subject[] = [];
  const seenIds = new Set<string>();

  for (const filePath of THEORY_FILES) {
    if (!fs.existsSync(filePath)) {
      log.warn(`Theory file not found: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(CONTENT_ROOT, filePath);
    const fileSlug = slugify(path.basename(filePath, '.md'));

    // Split by ## headings
    const lines = content.split('\n');
    let currentHeading = '';
    let currentLevel = 0;
    let currentBody: string[] = [];
    let sectionCount = 0;

    const flush = () => {
      if (!currentHeading) return;
      const body = currentBody.join('\n').trim();
      if (!body) return;

      const headingSlug = slugify(currentHeading);
      let id = `${fileSlug}--${headingSlug}`;
      // Deduplicate
      if (seenIds.has(id)) {
        let counter = 2;
        while (seenIds.has(`${id}-${counter}`)) counter++;
        id = `${id}-${counter}`;
      }
      seenIds.add(id);

      subjects.push({
        id,
        sourceFile: relativePath,
        title: currentHeading,
        level: currentLevel,
        bodyMd: body,
        wordCount: countWords(body),
        primaryTopic: null,
        topics: [],
        keyConcepts: [],
      });
      sectionCount++;
    };

    for (const line of lines) {
      // Match ## headings (level 2 and 3)
      const h2Match = line.match(/^## (.+)/);
      const h3Match = line.match(/^### (.+)/);

      if (h2Match) {
        flush();
        currentHeading = h2Match[1].trim();
        currentLevel = 2;
        currentBody = [];
      } else if (h3Match && currentLevel >= 2) {
        // Include h3 as part of the h2 body, don't split further
        currentBody.push(line);
      } else {
        currentBody.push(line);
      }
    }
    flush();

    log.info(`${relativePath}: ${sectionCount} subjects extracted`);
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });

  const outputPath = path.join(METADATA_DIR, 'subjects.json');
  fs.writeFileSync(outputPath, JSON.stringify(subjects, null, 2));
  log.info(`Wrote ${subjects.length} subjects to ${outputPath}`);
}
