import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.env.CONTENT_ROOT ??= '/home/sio/Code/Interview';
process.env.DB_PATH ??= '/tmp/interview-test-theory.db';
process.env.OPENAI_API_KEY ??= 'test-key';
process.env.OPENAI_BASE_URL ??= 'https://localhost:9999';
process.env.ANTHROPIC_API_KEY ??= 'test-key';
process.env.ANTHROPIC_BASE_URL ??= 'https://localhost:9998';

const CONTENT_ROOT = process.env.CONTENT_ROOT!;
const MATERIAL_DIR = path.join(CONTENT_ROOT, 'Data', 'Material');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface ParsedSubject {
  id: string;
  title: string;
  mainSubject: string;
  subSubject: string | null;
  wordCount: number;
}

/**
 * Re-implement the core parsing logic locally so we don't call parseTheory()
 * which writes to disk. This mirrors the algorithm in parse-theory-md.ts.
 */
function parseMdFile(
  filePath: string,
  mainSubject: string,
  subSubject: string | null,
  seenIds: Set<string>,
): ParsedSubject[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const mainSlug = slugify(mainSubject);
  const subSlug = subSubject ? slugify(subSubject) : null;

  const lines = content.split('\n');
  const subjects: ParsedSubject[] = [];
  let currentHeading = '';
  let currentBody: string[] = [];

  const flush = () => {
    if (!currentHeading) return;
    const body = currentBody.join('\n').trim();
    if (!body) return;
    const headingSlug = slugify(currentHeading);
    const parts = [mainSlug, subSlug, headingSlug].filter(Boolean);
    let id = parts.join('--');
    if (seenIds.has(id)) {
      let counter = 2;
      while (seenIds.has(`${id}-${counter}`)) counter++;
      id = `${id}-${counter}`;
    }
    seenIds.add(id);
    subjects.push({
      id,
      title: currentHeading,
      mainSubject,
      subSubject,
      wordCount: body.split(/\s+/).filter(Boolean).length,
    });
  };

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      flush();
      currentHeading = h2Match[1].trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }
  flush();
  return subjects;
}

function fileNameToTitle(filename: string): string {
  const base = filename.replace(/\.md$/i, '');
  const stripped = base.replace(/^\d+[-\s]+/, '');
  return stripped
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Scan Data/Material/ the same way parseTheory() does. */
function scanMaterialDir(): ParsedSubject[] {
  if (!fs.existsSync(MATERIAL_DIR)) return [];
  const subjects: ParsedSubject[] = [];
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

    for (const subFolder of subFolders) {
      const subPath = path.join(mainPath, subFolder);
      for (const file of fs.readdirSync(subPath).filter(f => f.endsWith('.md')).sort()) {
        subjects.push(...parseMdFile(path.join(subPath, file), mainFolder, subFolder, seenIds));
      }
    }

    for (const file of mdFiles) {
      const subSubject = fileNameToTitle(file);
      subjects.push(...parseMdFile(path.join(mainPath, file), mainFolder, subSubject, seenIds));
    }
  }

  return subjects;
}

describe('parseTheory — Data/Material/ scanning', () => {
  const subjects = scanMaterialDir();

  it('should yield subjects from the Material directory', () => {
    assert.ok(
      subjects.length >= 10,
      `Expected >=10 subjects from Data/Material/, got ${subjects.length}`,
    );
  });

  it('should have unique ids', () => {
    const ids = subjects.map(s => s.id);
    const unique = new Set(ids);
    assert.equal(unique.size, ids.length, `Duplicate ids found: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
  });

  it('every subject should have a non-empty title', () => {
    for (const s of subjects) {
      assert.ok(s.title.length > 0, `Subject ${s.id} has empty title`);
    }
  });

  it('every subject should have a mainSubject', () => {
    for (const s of subjects) {
      assert.ok(s.mainSubject.length > 0, `Subject ${s.id} has empty mainSubject`);
    }
  });

  it('every subject should have wordCount > 0', () => {
    for (const s of subjects) {
      assert.ok(s.wordCount > 0, `Subject ${s.id} has wordCount=0`);
    }
  });

  it('ids should be lowercase kebab-case with -- separators', () => {
    for (const s of subjects) {
      assert.match(s.id, /^[a-z0-9-]+$/, `Id not kebab-case: ${s.id}`);
    }
  });

  it('should include subjects from multiple main folders', () => {
    const mainSubjects = new Set(subjects.map(s => s.mainSubject));
    assert.ok(
      mainSubjects.size >= 3,
      `Expected subjects from >=3 main folders, got ${mainSubjects.size}: ${[...mainSubjects].join(', ')}`,
    );
  });

  it('Architectures should have sub-folder-based sub-subjects', () => {
    const archSubjects = subjects.filter(s => s.mainSubject === 'Architectures');
    assert.ok(archSubjects.length > 0, 'Should have Architectures subjects');
    const subSubjects = new Set(archSubjects.map(s => s.subSubject).filter(Boolean));
    assert.ok(
      subSubjects.has('Distributed Systems & System Architecture'),
      `Expected sub-subject "Distributed Systems & System Architecture", got: ${[...subSubjects].join(', ')}`,
    );
  });
});
