import fs from 'node:fs';
import path from 'node:path';
import { Subject } from '../types/problem.types.js';
import { MATERIAL_DIR, METADATA_DIR, CONTENT_ROOT } from '../config/paths.js';
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

/** Strip leading number prefix (e.g. "01-", "02-part-i-") and .md, then title-case. */
function fileNameToTitle(filename: string): string {
  const base = filename.replace(/\.md$/i, '');
  // Remove leading number + separator (e.g. "01-", "03-")
  const stripped = base.replace(/^\d+[-\s]+/, '');
  // Convert kebab-case to title case
  return stripped
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Strip leading number prefix from a heading (e.g. "14. SDD" → "SDD"). */
function stripHeadingNumber(heading: string): string {
  return heading.replace(/^\d+[\.\)]\s*/, '');
}

/** Derive the sub-subject name from a file name. */
function deriveSubSubject(filename: string): string {
  return fileNameToTitle(filename);
}

/**
 * Parse a single .md file and return ONE subject for the whole file.
 * The title is derived from the first ## heading (with number prefix stripped)
 * or from the filename. The entire file content is used as bodyMd.
 */
function parseMdFile(
  filePath: string,
  mainSubject: string,
  subSubject: string | null,
  seenIds: Set<string>,
): Subject {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const mainSlug = slugify(mainSubject);
  const subSlug = subSubject ? slugify(subSubject) : null;
  const fileSlug = slugify(path.basename(filePath, '.md'));

  // Derive title from the first ## heading (stripped of number prefix),
  // or fall back to subSubject / filename
  const firstH2 = content.match(/^## (.+)/m);
  let title: string;
  if (firstH2) {
    title = stripHeadingNumber(firstH2[1].trim());
  } else {
    title = subSubject ?? fileNameToTitle(path.basename(filePath));
  }

  const id_parts = [mainSlug, subSlug ?? fileSlug].filter(Boolean);
  let id = id_parts.join('--');
  if (seenIds.has(id)) {
    let counter = 2;
    while (seenIds.has(`${id}-${counter}`)) counter++;
    id = `${id}-${counter}`;
  }
  seenIds.add(id);

  return {
    id,
    sourceFile: relativePath,
    title,
    level: 1,
    bodyMd: content.trim(),
    wordCount: countWords(content),
    mainSubject,
    subSubject,
    primaryTopic: null,
    topics: [],
    keyConcepts: [],
  };
}

export async function parseTheory(): Promise<void> {
  log.info('Starting theory parsing...');

  if (!fs.existsSync(MATERIAL_DIR)) {
    log.warn(`Material directory not found: ${MATERIAL_DIR}`);
    return;
  }

  const subjects: Subject[] = [];
  const seenIds = new Set<string>();

  const mainFolders = fs.readdirSync(MATERIAL_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  for (const mainFolder of mainFolders) {
    const mainPath = path.join(MATERIAL_DIR, mainFolder);
    const entries = fs.readdirSync(mainPath, { withFileTypes: true });

    const subFolders = entries.filter(e => e.isDirectory()).map(e => e.name).sort();
    const mdFiles = entries.filter(e => e.isFile() && e.name.endsWith('.md')).map(e => e.name).sort();

    if (subFolders.length > 0) {
      // Nested structure: sub-folders are sub-subjects
      for (const subFolder of subFolders) {
        const subPath = path.join(mainPath, subFolder);
        const subFiles = fs.readdirSync(subPath)
          .filter(f => f.endsWith('.md'))
          .sort();

        for (const file of subFiles) {
          const filePath = path.join(subPath, file);
          subjects.push(parseMdFile(filePath, mainFolder, subFolder, seenIds));
        }
        log.info(`${mainFolder}/${subFolder}: ${subFiles.length} files`);
      }
    }

    if (mdFiles.length > 0) {
      // Flat structure: each md file is a sub-subject
      for (const file of mdFiles) {
        const filePath = path.join(mainPath, file);
        const subSubject = deriveSubSubject(file);
        subjects.push(parseMdFile(filePath, mainFolder, subSubject, seenIds));
      }
      log.info(`${mainFolder}: ${mdFiles.length} files (flat)`);
    }
  }

  fs.mkdirSync(METADATA_DIR, { recursive: true });

  const outputPath = path.join(METADATA_DIR, 'subjects.json');
  fs.writeFileSync(outputPath, JSON.stringify(subjects, null, 2));
  log.info(`Wrote ${subjects.length} subjects to ${outputPath}`);
}
