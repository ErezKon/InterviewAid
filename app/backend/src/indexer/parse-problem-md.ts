import fs from 'node:fs';
import path from 'node:path';
import { Problem, ParseReport } from '../types/problem.types.js';
import { PROBLEMS_DIR, PROBLEMS_DATA_JSON, METADATA_DIR, CONTENT_ROOT } from '../config/paths.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('parse-problems');

interface ProblemsDataEntry {
  id: string;
  title: string;
  difficulty: string;
  url: string;
  acceptance: string;
  companies: Record<string, string>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseAcceptance(raw: string | undefined): number | null {
  if (!raw) return null;
  const match = raw.match(/([\d.]+)%?/);
  return match ? parseFloat(match[1]) : null;
}

function parseDifficulty(raw: string | undefined): 'Easy' | 'Medium' | 'Hard' | null {
  if (!raw) return null;
  const clean = raw.replace(/[🟢🟡🔴⚪️\s]/g, '').trim();
  if (/easy/i.test(clean)) return 'Easy';
  if (/medium/i.test(clean)) return 'Medium';
  if (/hard/i.test(clean)) return 'Hard';
  return null;
}

function parseCompanies(raw: string): { slug: string; name: string }[] {
  if (!raw.trim()) return [];
  return raw
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)
    .map(name => ({ slug: slugify(name), name }));
}

interface MdSection {
  heading: string;
  body: string;
}

function splitSections(content: string): MdSection[] {
  const lines = content.split('\n');
  const sections: MdSection[] = [];
  let currentHeading = '';
  let currentBody: string[] = [];

  for (const line of lines) {
    const match = line.match(/^## (.+)/);
    if (match) {
      if (currentHeading || currentBody.length > 0) {
        sections.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
      }
      currentHeading = match[1].trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }
  if (currentHeading || currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
  }
  return sections;
}

function findSection(sections: MdSection[], pattern: RegExp): string | null {
  const match = sections.find(s => pattern.test(s.heading));
  return match ? match.body : null;
}

function concatSections(sections: MdSection[], pattern: RegExp): string | null {
  const matches = sections.filter(s => pattern.test(s.heading));
  if (matches.length === 0) return null;
  return matches.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n---\n\n');
}

export function parseSingleFile(filePath: string): Omit<Problem, 'slug'> & { parsedSlug: string } {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath, '.md');

  // Parse header: # <id>. <title>
  const headerMatch = content.match(/^#\s+(\d+)\.\s+(.+)$/m);
  const leetcodeId = headerMatch ? parseInt(headerMatch[1], 10) : null;
  const title = headerMatch ? headerMatch[2].trim() : filename;

  // Parse metadata fields
  const difficultyMatch = content.match(/\*\*Difficulty:\*\*\s*(.+)/);
  const acceptanceMatch = content.match(/\*\*Acceptance:\*\*\s*(.+)/);
  const urlMatch = content.match(/\*\*LeetCode:\*\*\s*\[?([^\]\s)]+)/);
  const companiesMatch = content.match(/\*\*Companies?:\*\*\s*(.+)/);

  const difficulty = parseDifficulty(difficultyMatch?.[1]);
  const acceptance = parseAcceptance(acceptanceMatch?.[1]);

  let url: string | null = null;
  if (urlMatch) {
    const rawUrl = urlMatch[1].replace(/[[\]()]/g, '');
    url = rawUrl.startsWith('http') ? rawUrl : null;
  }

  const companies = companiesMatch ? parseCompanies(companiesMatch[1]) : [];

  // Split body into sections
  const sections = splitSections(content);

  const descriptionMd = findSection(sections, /problem description/i);
  const examplesMd = findSection(sections, /examples?/i);
  const solutionMd = concatSections(sections, /approach|solution|walkthrough|handling/i);
  const complexityMd = findSection(sections, /complexity/i);
  const followUpsMd = findSection(sections, /follow[- ]?up/i);
  const takeawayMd = findSection(sections, /key takeaway/i);

  const relativePath = path.relative(CONTENT_ROOT, filePath);

  return {
    parsedSlug: slugify(title),
    leetcodeId,
    title,
    difficulty: difficulty ?? 'Medium',
    acceptance,
    url,
    filePath: relativePath,
    companies: companies.map(c => ({ ...c, frequency: null })),
    descriptionMd,
    examplesMd,
    solutionMd,
    complexityMd,
    followUpsMd,
    takeawayMd,
    hasSolution: !!solutionMd && solutionMd.length > 50,
    primaryTopic: null,
    topics: [],
    patterns: [],
    seniority: null,
    interviewValue: null,
    oneLiner: null,
  };
}

export async function parseProblems(): Promise<void> {
  log.info('Starting problem parsing...');

  // Load problems_data.json for merging
  let problemsData: Record<string, ProblemsDataEntry> = {};
  if (fs.existsSync(PROBLEMS_DATA_JSON)) {
    problemsData = JSON.parse(fs.readFileSync(PROBLEMS_DATA_JSON, 'utf-8'));
    log.info(`Loaded problems_data.json with ${Object.keys(problemsData).length} entries`);
  }

  // Build lookup by normalized title for fallback matching
  const dataByTitle = new Map<string, ProblemsDataEntry>();
  for (const entry of Object.values(problemsData)) {
    dataByTitle.set(normalizeTitle(entry.title), entry);
  }

  const mdFiles = fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.md')).sort();
  log.info(`Found ${mdFiles.length} .md files in Problems/`);

  const results: Problem[] = [];
  const failures: { file: string; error: string }[] = [];
  const seenSlugs = new Set<string>();

  for (const file of mdFiles) {
    const filePath = path.join(PROBLEMS_DIR, file);
    try {
      const parsed = parseSingleFile(filePath);

      // Merge with problems_data.json
      let dataEntry: ProblemsDataEntry | undefined;
      if (parsed.leetcodeId !== null) {
        dataEntry = problemsData[String(parsed.leetcodeId)];
      }
      if (!dataEntry) {
        dataEntry = dataByTitle.get(normalizeTitle(parsed.title));
      }

      if (dataEntry) {
        // problems_data.json wins for difficulty/acceptance/company percentages
        const dataDiff = parseDifficulty(dataEntry.difficulty);
        if (dataDiff) parsed.difficulty = dataDiff;

        const dataAcc = parseAcceptance(dataEntry.acceptance);
        if (dataAcc !== null) parsed.acceptance = dataAcc;

        if (dataEntry.url) parsed.url = dataEntry.url;
        if (parsed.leetcodeId === null && dataEntry.id) {
          parsed.leetcodeId = parseInt(dataEntry.id, 10);
        }

        // Merge company frequencies
        if (dataEntry.companies) {
          const existingSlugs = new Set(parsed.companies.map(c => c.slug));
          for (const [compName, freqStr] of Object.entries(dataEntry.companies)) {
            const compSlug = slugify(compName);
            const freq = parseFloat(freqStr) || null;
            const existing = parsed.companies.find(c => c.slug === compSlug);
            if (existing) {
              existing.frequency = freq;
            } else {
              parsed.companies.push({ slug: compSlug, name: compName, frequency: freq });
            }
          }
        }
      }

      // Deduplicate slug
      let slug = parsed.parsedSlug;
      if (seenSlugs.has(slug) && parsed.leetcodeId !== null) {
        slug = `${slug}-${parsed.leetcodeId}`;
      }
      let counter = 2;
      while (seenSlugs.has(slug)) {
        slug = `${parsed.parsedSlug}-${counter++}`;
      }
      seenSlugs.add(slug);

      const { parsedSlug: _, ...fields } = parsed;
      results.push({ ...fields, slug });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push({ file, error: message });
      log.warn(`Failed to parse ${file}: ${message}`);
    }
  }

  // Ensure output directory exists
  fs.mkdirSync(METADATA_DIR, { recursive: true });

  // Write results
  const outputPath = path.join(METADATA_DIR, 'problems.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  log.info(`Wrote ${results.length} problems to ${outputPath}`);

  // Write parse report
  const report: ParseReport = {
    totalFiles: mdFiles.length,
    parsed: results.length,
    failed: failures.length,
    failures,
    timestamp: new Date().toISOString(),
  };
  const reportPath = path.join(METADATA_DIR, 'parse-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log.info(`Parse report: ${report.parsed} parsed, ${report.failed} failed`);

  if (failures.length > 0) {
    log.warn(`${failures.length} files failed to parse — see parse-report.json`);
  }
}
