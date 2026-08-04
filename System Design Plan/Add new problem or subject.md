---
agent: devin-local
session: phantom-wishbone
created: 2026-08-03T09:12:07Z
---
# User Content Upload Feature — Full Plan

Add a new "Upload" feature that lets users upload their own markdown files as either Material (study subjects) or Interview Problems, with both manual and LLM-agentic classification/splitting flows.

---

## Architecture Overview

```
Frontend (Angular)                Backend (Express + SQLite)
   Upload Page                       POST /api/upload
     |                                  |
     |-- file(s) + metadata --------->  |
     |                                  |-- Non-agentic: save files, update JSON + DB
     |                                  |-- Agentic: LLM reads file, classifies,
     |                                  |   splits material if needed, saves, updates DB
     |<-- SSE progress events --------|
     |<-- final result (success/err) -|
```

---

## Sub-Plan 1: Backend — Upload Route & Non-Agentic Flow

### Goal
Create `POST /api/upload` endpoint that accepts multipart file uploads with metadata, saves files to `Data/Problems/` or `Data/Material/<subject>/`, and updates `problems.json` / `subjects.json` + SQLite DB.

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `backend/src/routes/upload.routes.ts` | **Create** | Express router with `POST /api/upload` |
| `backend/src/services/upload.service.ts` | **Create** | Core upload logic (save files, update metadata, rebuild DB entries) |
| `backend/src/types/api.types.ts` | **Modify** | Add `uploadBodySchema` Zod validator |
| `backend/src/index.ts` | **Modify** | Mount `uploadRouter` |
| `backend/package.json` | **Modify** | Add `multer` for multipart file handling |

### Dependencies to Add
- `multer` (multipart form parsing) — well-established, no alternatives needed in Express

### API Design

```
POST /api/upload
Content-Type: multipart/form-data

Fields:
  - files: File[]              (one or more .md files)
  - type: "material" | "problem"
  - title: string              (required for problems; for material = main subject name)
  - agentic: boolean           (default false)
  - mainSubject: string        (material only — e.g. "AI", "JavaScript")
  - subSubject: string?        (material only — optional sub-subject)
  - classification: string?    (problem only — e.g. "dynamic-programming")  
  - subClassification: string? (problem only — optional)
  - difficulty: string?        (problem only — "Easy"|"Medium"|"Hard")

Response (non-agentic):
{
  "data": {
    "type": "material" | "problem",
    "filesProcessed": number,
    "items": [{ id/slug, title, filePath }],
    "message": string
  }
}

Response (agentic): SSE stream with progress events, same as chat flow
```

### upload.routes.ts — Code Sketch

```typescript
import { Router } from 'express';
import multer from 'multer';
import { handleUpload } from '../services/upload.service.js';
import { uploadBodySchema } from '../types/api.types.js';
import { initSse, sendSseEvent, sendSseDone, sendSseError, startHeartbeat } from '../services/sse.service.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('upload');

// Store uploads in memory (files are small markdown), then we write to disk ourselves
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
      cb(null, true);
    } else {
      cb(new Error('Only .md files are accepted'));
    }
  },
});

export const uploadRouter = Router();

uploadRouter.post('/upload', upload.array('files', 20), async (req, res, next) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: { code: 'NO_FILES', message: 'At least one .md file is required' } });
      return;
    }

    const meta = uploadBodySchema.parse(req.body);

    if (meta.agentic) {
      // SSE streaming for agentic flow
      initSse(res);
      const heartbeat = startHeartbeat(res);
      let closed = false;
      req.on('close', () => { closed = true; clearInterval(heartbeat); });

      try {
        const result = await handleUpload(files, meta, (event, data) => {
          if (!closed) sendSseEvent(res, event, data);
        });
        if (!closed) {
          sendSseEvent(res, 'result', result);
          sendSseDone(res);
        }
      } catch (err: any) {
        if (!closed) sendSseError(res, err.message ?? 'Upload failed');
      } finally {
        clearInterval(heartbeat);
      }
    } else {
      // Synchronous non-agentic flow
      const result = await handleUpload(files, meta);
      res.json({ data: result });
    }
  } catch (err) {
    next(err);
  }
});
```

### upload.service.ts — Non-Agentic Flow Code Sketch

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, MATERIAL_DIR, METADATA_DIR } from '../config/paths.js';
import { Problem, Subject } from '../types/problem.types.js';
import { parseMdFileForUpload } from './upload-parsers.js';
import { getDb, initSchema } from '../db/connection.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('upload-service');
const PROBLEMS_DIR = path.join(CONTENT_ROOT, 'Data', 'Problems');

export type ProgressCallback = (event: string, data: unknown) => void;

export interface UploadMeta {
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject?: string;
  subSubject?: string;
  classification?: string;
  subClassification?: string;
  difficulty?: string;
}

export interface UploadResult {
  type: string;
  filesProcessed: number;
  items: { id: string; title: string; filePath: string }[];
  message: string;
}

export async function handleUpload(
  files: Express.Multer.File[],
  meta: UploadMeta,
  progress?: ProgressCallback,
): Promise<UploadResult> {
  if (meta.agentic) {
    return handleAgenticUpload(files, meta, progress!);
  }
  return handleManualUpload(files, meta);
}

function handleManualUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  if (meta.type === 'material') {
    return handleMaterialUpload(files, meta);
  }
  return handleProblemUpload(files, meta);
}

function handleMaterialUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  const mainSubject = meta.mainSubject || meta.title;
  const subjectDir = path.join(MATERIAL_DIR, mainSubject);
  fs.mkdirSync(subjectDir, { recursive: true });

  const subjectsJsonPath = path.join(METADATA_DIR, 'subjects.json');
  const subjects: Subject[] = fs.existsSync(subjectsJsonPath)
    ? JSON.parse(fs.readFileSync(subjectsJsonPath, 'utf-8'))
    : [];
  const seenIds = new Set(subjects.map(s => s.id));

  const items: { id: string; title: string; filePath: string }[] = [];

  for (const file of files) {
    const content = file.buffer.toString('utf-8');
    const fileName = file.originalname;
    const destPath = path.join(subjectDir, fileName);

    // Write file to disk
    fs.writeFileSync(destPath, content);

    // Parse into Subject entry (reuse existing parse logic)
    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const subSubject = meta.subSubject || deriveSubSubject(fileName);
    const subject = buildSubjectEntry(content, relativePath, mainSubject, subSubject, seenIds);

    subjects.push(subject);
    items.push({ id: subject.id, title: subject.title, filePath: relativePath });
  }

  // Write updated subjects.json
  fs.writeFileSync(subjectsJsonPath, JSON.stringify(subjects, null, 2));

  // Insert into SQLite DB (incremental — don't rebuild entire DB)
  insertSubjectsIntoDb(items.map(i => subjects.find(s => s.id === i.id)!));

  return {
    type: 'material',
    filesProcessed: files.length,
    items,
    message: `Successfully uploaded ${files.length} material file(s) to ${mainSubject}`,
  };
}

function handleProblemUpload(files: Express.Multer.File[], meta: UploadMeta): UploadResult {
  const problemsJsonPath = path.join(METADATA_DIR, 'problems.json');
  const problems: Problem[] = fs.existsSync(problemsJsonPath)
    ? JSON.parse(fs.readFileSync(problemsJsonPath, 'utf-8'))
    : [];
  const seenSlugs = new Set(problems.map(p => p.slug));

  const items: { id: string; title: string; filePath: string }[] = [];

  for (const file of files) {
    const content = file.buffer.toString('utf-8');
    const fileName = file.originalname;
    const destPath = path.join(PROBLEMS_DIR, fileName);

    // Write file to disk
    fs.writeFileSync(destPath, content);

    // Parse into Problem entry
    const relativePath = path.relative(CONTENT_ROOT, destPath);
    const problem = buildProblemEntry(content, relativePath, meta, seenSlugs);

    problems.push(problem);
    items.push({ id: problem.slug, title: problem.title, filePath: relativePath });
  }

  // Write updated problems.json
  fs.writeFileSync(problemsJsonPath, JSON.stringify(problems, null, 2));

  // Insert into SQLite DB
  insertProblemsIntoDb(items.map(i => problems.find(p => p.slug === i.id)!));

  return {
    type: 'problem',
    filesProcessed: files.length,
    items,
    message: `Successfully uploaded ${files.length} problem file(s)`,
  };
}
```

### Key Helper Functions Needed

```typescript
// Reuse slugify from existing parsers
function slugify(text: string): string { /* same as parse-theory-md.ts */ }

function deriveSubSubject(filename: string): string {
  return filename.replace(/\.md$/i, '').replace(/^\d+[-\s]+/, '')
    .split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildSubjectEntry(
  content: string, relativePath: string, mainSubject: string,
  subSubject: string | null, seenIds: Set<string>
): Subject {
  // Reuse logic from parse-theory-md.ts parseMdFile()
  // Returns a Subject object with id, title, bodyMd, etc.
}

function buildProblemEntry(
  content: string, relativePath: string, meta: UploadMeta, seenSlugs: Set<string>
): Problem {
  // Reuse logic from parse-problem-md.ts parseSingleFile()
  // Apply manual classification/difficulty from meta
  // If meta.classification provided, set as primaryTopic
}

function insertSubjectsIntoDb(subjects: Subject[]): void {
  const db = getDb();
  const now = new Date().toISOString();
  const insert = db.prepare(`INSERT OR REPLACE INTO subjects (...) VALUES (...)`);
  const insertFts = db.prepare(`INSERT OR REPLACE INTO subjects_fts (...) VALUES (...)`);
  // ... same pattern as build-db.ts
}

function insertProblemsIntoDb(problems: Problem[]): void {
  const db = getDb();
  const now = new Date().toISOString();
  const insert = db.prepare(`INSERT OR REPLACE INTO problems (...) VALUES (...)`);
  // ... same pattern as build-db.ts
}
```

### api.types.ts Addition

```typescript
export const uploadBodySchema = z.object({
  type: z.enum(['material', 'problem']),
  title: z.string().min(1),
  agentic: z.preprocess(v => v === 'true' || v === true, z.boolean()).default(false),
  mainSubject: z.string().optional(),
  subSubject: z.string().optional(),
  classification: z.string().optional(),
  subClassification: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
});
```

### Validation Rules
- For `type=material`: `mainSubject` is required (or falls back to `title`)
- For `type=problem`: `title` is required, `classification` from taxonomy IDs
- Files must be `.md` extension, max 5MB each, max 20 files per request
- File names are sanitized (no path traversal)

---

## Sub-Plan 2: Backend — Agentic Flow (LLM-Based Classification & Material Splitting)

### Goal
When `agentic=true`, use the existing LangChain agent infrastructure to:
1. Read uploaded file(s)
2. Classify content (determine main subject, sub-subject, topic IDs, difficulty, etc.)
3. For Material: split large files into per-topic sub-files (renumber headings starting at 1)
4. Save files and update metadata + DB

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `backend/src/agents/content-uploader/content-uploader.agent.ts` | **Create** | Agent definition with tools |
| `backend/src/agents/content-uploader/content-uploader.prompt.ts` | **Create** | System prompt |
| `backend/src/agents/content-uploader/tools/classify-content.tool.ts` | **Create** | Tool: classify uploaded content |
| `backend/src/agents/content-uploader/tools/split-material.tool.ts` | **Create** | Tool: split material into sub-topic files |
| `backend/src/agents/content-uploader/tools/save-uploaded-files.tool.ts` | **Create** | Tool: write files to disk and update metadata |
| `backend/src/services/upload.service.ts` | **Modify** | Add `handleAgenticUpload()` implementation |

### Agent Design

The content-uploader agent follows the same pattern as the content-enricher agent:

```typescript
// content-uploader.agent.ts
import { createAgent } from 'langchain';
import { createChatModel, createResponseFormat } from '../model-factory.js';
import { createClassifyContentTool } from './tools/classify-content.tool.js';
import { createSplitMaterialTool } from './tools/split-material.tool.js';
import { createSaveUploadedFilesTool } from './tools/save-uploaded-files.tool.js';
import { CONTENT_UPLOADER_SYSTEM_PROMPT } from './content-uploader.prompt.js';

export async function createContentUploaderAgent(modelId?: string) {
  const { def, model } = await createChatModel(modelId);
  const tools = [
    createClassifyContentTool(),
    createSplitMaterialTool(),
    createSaveUploadedFilesTool(),
  ];

  const agent = createAgent({
    model,
    tools,
    systemPrompt: CONTENT_UPLOADER_SYSTEM_PROMPT,
  });

  return { agent, def };
}
```

### System Prompt — Key Instructions

```typescript
export const CONTENT_UPLOADER_SYSTEM_PROMPT = `You are a Content Upload Classifier AI.
Your job is to analyze uploaded markdown files, classify them, and organize them properly.

## For Material Files
1. Read the content and determine:
   - mainSubject: The broad subject area (e.g., "AI", "JavaScript", "Kubernetes")
   - subSubject: The specific sub-topic (e.g., "AI Agents & Sub Agents", "Closures")
   - topics: 1-3 taxonomy IDs from: [${TAXONOMY_IDS}]
   - primaryTopic: The most relevant taxonomy ID
   - keyConcepts: 3-8 key technical concepts

2. If the file contains MULTIPLE topics (detected by multiple H2/## sections covering
   different sub-topics), SPLIT it into separate files:
   - Each file covers ONE sub-topic
   - CRITICAL: Renumber headings in each split file starting at 1
     (e.g., if original has topics 1-18, each split file starts at "## 1. <Topic Name>")
   - Sub-headings should also be renumbered (1.1, 1.2, etc.)
   - Preserve all content, code blocks, tables, and formatting

3. Call save_uploaded_files with the classified and optionally split content.

## For Problem Files
1. Read the content and determine:
   - classification: primary algorithm/data structure topic
   - subClassification: secondary topic if applicable
   - difficulty: Easy, Medium, or Hard
   - title: The problem title
   - patterns: Algorithm patterns used
   - seniority: junior, mid, senior, staff, or principal

2. Call save_uploaded_files with the classification.

## Rules
- Call tools immediately, don't explain what you're about to do.
- Be accurate in classification — use existing taxonomy IDs.
- For material splitting: look for ## (H2) headings as topic boundaries.
`;
```

### classify-content.tool.ts — Code Sketch

```typescript
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { TAXONOMY_IDS } from '../../indexer/taxonomy.js';

export function createClassifyContentTool() {
  return tool(
    async ({ content, type }) => {
      // This tool is mostly for the LLM to "use" to structure its classification
      // The LLM fills in the structured output via the tool call
      return JSON.stringify({ status: 'classified', type });
    },
    {
      name: 'classify_content',
      description: 'Classify uploaded content by type, subject, topics, and difficulty',
      schema: z.object({
        content: z.string().describe('The markdown content to classify'),
        type: z.enum(['material', 'problem']),
        title: z.string(),
        mainSubject: z.string().optional().describe('For material: broad subject area'),
        subSubject: z.string().optional().describe('For material: specific sub-topic'),
        classification: z.string().optional().describe('For problems: primary topic from taxonomy'),
        subClassification: z.string().optional(),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
        topics: z.array(z.string()).describe('1-3 taxonomy IDs'),
        primaryTopic: z.string().describe('Most relevant taxonomy ID'),
        keyConcepts: z.array(z.string()).optional(),
        patterns: z.array(z.string()).optional(),
        seniority: z.string().optional(),
        shouldSplit: z.boolean().describe('Whether this material file should be split into sub-files'),
      }),
    },
  );
}
```

### split-material.tool.ts — Code Sketch

```typescript
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

export function createSplitMaterialTool() {
  return tool(
    async ({ originalContent, splits }) => {
      // The LLM provides the split points and new content
      // We renumber headings in each split
      const results = splits.map((split, index) => {
        let content = split.content;
        // Renumber: replace heading numbers to start at 1
        content = renumberHeadings(content);
        return {
          fileName: split.fileName,
          subSubject: split.subSubject,
          content,
        };
      });
      return JSON.stringify({ splitCount: results.length, files: results.map(r => r.fileName) });
    },
    {
      name: 'split_material',
      description: 'Split a large material file into per-topic sub-files with renumbered headings',
      schema: z.object({
        originalContent: z.string(),
        mainSubject: z.string(),
        splits: z.array(z.object({
          fileName: z.string().describe('Suggested filename for this split'),
          subSubject: z.string().describe('Sub-subject name for this split'),
          content: z.string().describe('The markdown content for this split, with headings starting at 1'),
        })),
      }),
    },
  );
}

function renumberHeadings(content: string): string {
  // Replace ## N. Title with ## 1. Title (restart numbering)
  let topicNum = 0;
  return content.replace(/^(#{2,3})\s+(\d+)([\.\)])\s*/gm, (match, hashes, num, sep) => {
    if (hashes === '##') {
      topicNum++;
      return `${hashes} ${topicNum}${sep} `;
    }
    // Sub-headings: ### N.M -> ### topicNum.subNum
    // This is handled by tracking the sub-counter per topic
    return match; // simplified — full implementation tracks sub-numbering
  });
}
```

### save-uploaded-files.tool.ts — Code Sketch

```typescript
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { CONTENT_ROOT, MATERIAL_DIR, METADATA_DIR } from '../../../config/paths.js';

const PROBLEMS_DIR = path.join(CONTENT_ROOT, 'Data', 'Problems');

export function createSaveUploadedFilesTool() {
  return tool(
    async (input) => {
      if (input.type === 'material') {
        return saveMaterialFiles(input);
      }
      return saveProblemFiles(input);
    },
    {
      name: 'save_uploaded_files',
      description: 'Save classified files to disk and update metadata JSON files',
      schema: z.object({
        type: z.enum(['material', 'problem']),
        mainSubject: z.string().optional(),
        files: z.array(z.object({
          fileName: z.string(),
          content: z.string(),
          title: z.string(),
          subSubject: z.string().optional(),
          // Classification fields
          primaryTopic: z.string().optional(),
          topics: z.array(z.string()).optional(),
          keyConcepts: z.array(z.string()).optional(),
          difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
          patterns: z.array(z.string()).optional(),
          seniority: z.string().optional(),
        })),
      }),
    },
  );
}
```

### Agentic Upload Flow in upload.service.ts

```typescript
async function handleAgenticUpload(
  files: Express.Multer.File[],
  meta: UploadMeta,
  progress: ProgressCallback,
): Promise<UploadResult> {
  progress('status', { phase: 'starting', message: 'Analyzing uploaded files...' });

  // Create agent
  const { agent, def } = await createContentUploaderAgent(/* modelId */);

  // Build message with file contents
  const fileContents = files.map(f => ({
    name: f.originalname,
    content: f.buffer.toString('utf-8'),
  }));

  const userMessage = `Classify and process these uploaded ${meta.type} file(s):
Type: ${meta.type}
${meta.mainSubject ? `Main Subject Hint: ${meta.mainSubject}` : ''}
${meta.subSubject ? `Sub-Subject Hint: ${meta.subSubject}` : ''}

Files:
${fileContents.map(f => `--- ${f.name} ---\n${f.content}\n`).join('\n')}

Analyze each file, classify it, ${meta.type === 'material' ? 'split if it contains multiple topics, ' : ''}and save using save_uploaded_files.`;

  // Stream agent execution
  const stream = await agent.stream(
    { messages: [new HumanMessage(userMessage)] },
    { recursionLimit: 50 },
  );

  let lastResult: any = null;
  for await (const chunk of stream) {
    // Forward tool call progress to SSE
    for (const nodeName of Object.keys(chunk)) {
      const nodeData = chunk[nodeName];
      if (nodeData?.messages) {
        for (const msg of nodeData.messages) {
          if (msg.tool_calls?.length) {
            for (const tc of msg.tool_calls) {
              progress('tool', { name: tc.name, phase: 'start' });
            }
          }
          if (msg._getType?.() === 'tool') {
            progress('tool', { name: msg.name, phase: 'end', result: msg.content?.slice(0, 200) });
            lastResult = msg.content;
          }
        }
      }
    }
  }

  progress('status', { phase: 'complete', message: 'Upload processing complete' });

  return {
    type: meta.type,
    filesProcessed: files.length,
    items: [], // populated from save tool results
    message: `Agentic upload complete for ${files.length} file(s)`,
  };
}
```

---

## Sub-Plan 3: Frontend — Upload Page UI

### Goal
Create a new "Upload" page in the Angular frontend with:
- File upload drag-and-drop area (accepts .md files)
- Material vs Problem type selector
- Conditional fields based on type
- Agentic toggle
- Progress display during upload
- Info message about file splitting for material

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `frontend/src/app/features/upload/upload-page/upload-page.component.ts` | **Create** | Upload page component |
| `frontend/src/app/features/upload/upload-page/upload-page.component.html` | **Create** | Template |
| `frontend/src/app/features/upload/upload-page/upload-page.component.scss` | **Create** | Styles |
| `frontend/src/app/core/api/upload.api.ts` | **Create** | API service for upload endpoint |
| `frontend/src/app/state/upload.store.ts` | **Create** | NgRx signal store for upload state |
| `frontend/src/app/app.routes.ts` | **Modify** | Add `/upload` route |
| `frontend/src/app/app.component.html` | **Modify** | Add "Upload" nav link |

### Route Addition

```typescript
// app.routes.ts — add before the wildcard route
{
  path: 'upload',
  loadComponent: () =>
    import('./features/upload/upload-page/upload-page.component').then(m => m.UploadPageComponent),
},
```

### Nav Link Addition

```html
<!-- app.component.html — add after Quiz link -->
<a mat-button routerLink="/upload" routerLinkActive="active">Upload</a>
```

### upload.api.ts

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface UploadRequest {
  files: File[];
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject?: string;
  subSubject?: string;
  classification?: string;
  subClassification?: string;
  difficulty?: string;
}

export interface UploadResult {
  type: string;
  filesProcessed: number;
  items: { id: string; title: string; filePath: string }[];
  message: string;
}

export interface UploadProgressEvent {
  event: string;
  data: any;
}

@Injectable({ providedIn: 'root' })
export class UploadApi {
  private http = inject(HttpClient);

  upload(request: UploadRequest): Observable<UploadResult> {
    const formData = new FormData();
    for (const file of request.files) {
      formData.append('files', file);
    }
    formData.append('type', request.type);
    formData.append('title', request.title);
    formData.append('agentic', String(request.agentic));
    if (request.mainSubject) formData.append('mainSubject', request.mainSubject);
    if (request.subSubject) formData.append('subSubject', request.subSubject);
    if (request.classification) formData.append('classification', request.classification);
    if (request.subClassification) formData.append('subClassification', request.subClassification);
    if (request.difficulty) formData.append('difficulty', request.difficulty);

    return this.http.post<{ data: UploadResult }>('/api/upload', formData)
      .pipe(map(r => r.data));
  }

  // For agentic flow — SSE stream
  uploadAgentic(request: UploadRequest): Observable<UploadProgressEvent> {
    return new Observable(observer => {
      const formData = new FormData();
      for (const file of request.files) {
        formData.append('files', file);
      }
      formData.append('type', request.type);
      formData.append('title', request.title);
      formData.append('agentic', 'true');
      if (request.mainSubject) formData.append('mainSubject', request.mainSubject);
      // ... other fields

      // Use fetch + EventSource pattern for SSE with POST
      fetch('/api/upload', { method: 'POST', body: formData })
        .then(response => {
          const reader = response.body!.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          function read() {
            reader.read().then(({ done, value }) => {
              if (done) { observer.complete(); return; }
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop()!;
              for (const line of lines) {
                if (line.startsWith('event: ')) {
                  const eventName = line.slice(7);
                  // next line should be data:
                }
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    observer.next({ event: 'data', data });
                  } catch {}
                }
              }
              read();
            });
          }
          read();
        })
        .catch(err => observer.error(err));
    });
  }
}
```

### upload.store.ts

```typescript
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { UploadApi, UploadResult, UploadProgressEvent } from '../core/api/upload.api';

interface UploadState {
  files: File[];
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject: string;
  subSubject: string;
  classification: string;
  subClassification: string;
  difficulty: string;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: UploadProgressEvent[];
  result: UploadResult | null;
  error: string | null;
}

export const UploadStore = signalStore(
  { providedIn: 'root' },
  withState<UploadState>({
    files: [],
    type: 'material',
    title: '',
    agentic: false,
    mainSubject: '',
    subSubject: '',
    classification: '',
    subClassification: '',
    difficulty: '',
    status: 'idle',
    progress: [],
    result: null,
    error: null,
  }),
  withMethods((store) => {
    const api = inject(UploadApi);
    return {
      setFiles(files: File[]) { patchState(store, { files }); },
      setType(type: 'material' | 'problem') { patchState(store, { type }); },
      setTitle(title: string) { patchState(store, { title }); },
      setAgentic(agentic: boolean) { patchState(store, { agentic }); },
      setMainSubject(v: string) { patchState(store, { mainSubject: v }); },
      setSubSubject(v: string) { patchState(store, { subSubject: v }); },
      setClassification(v: string) { patchState(store, { classification: v }); },
      setSubClassification(v: string) { patchState(store, { subClassification: v }); },
      setDifficulty(v: string) { patchState(store, { difficulty: v }); },

      submit() {
        const state = store;
        patchState(store, { status: 'uploading', progress: [], result: null, error: null });

        const request = {
          files: state.files(),
          type: state.type(),
          title: state.title(),
          agentic: state.agentic(),
          mainSubject: state.mainSubject() || undefined,
          subSubject: state.subSubject() || undefined,
          classification: state.classification() || undefined,
          subClassification: state.subClassification() || undefined,
          difficulty: state.difficulty() || undefined,
        };

        if (request.agentic) {
          api.uploadAgentic(request).subscribe({
            next: (event) => {
              patchState(store, { progress: [...store.progress(), event] });
            },
            complete: () => patchState(store, { status: 'success' }),
            error: (err) => patchState(store, { status: 'error', error: err.message }),
          });
        } else {
          api.upload(request).subscribe({
            next: (result) => patchState(store, { result, status: 'success' }),
            error: (err) => patchState(store, { status: 'error', error: err.message ?? 'Upload failed' }),
          });
        }
      },

      reset() {
        patchState(store, {
          files: [], title: '', agentic: false,
          mainSubject: '', subSubject: '',
          classification: '', subClassification: '',
          difficulty: '', status: 'idle',
          progress: [], result: null, error: null,
        });
      },
    };
  }),
);
```

### upload-page.component.html — Template

```html
<div class="upload-page">
  <h2>Upload Content</h2>
  <p class="subtitle">Upload your own study materials or interview problems as markdown files.</p>

  @if (store.status() === 'idle' || store.status() === 'error') {
    <!-- Type Selection -->
    <div class="type-toggle">
      <mat-button-toggle-group [value]="store.type()" (change)="store.setType($event.value)">
        <mat-button-toggle value="material">
          <mat-icon>menu_book</mat-icon> Study Material
        </mat-button-toggle>
        <mat-button-toggle value="problem">
          <mat-icon>code</mat-icon> Interview Problem
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <!-- File Upload Area -->
    <div class="drop-zone"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()">
      <mat-icon class="upload-icon">cloud_upload</mat-icon>
      <p>Drag & drop .md files here, or click to browse</p>
      <p class="hint">Max 20 files, 5MB each</p>
      <input #fileInput type="file" accept=".md" multiple hidden (change)="onFilesSelected($event)">
    </div>

    <!-- Selected Files List -->
    @if (store.files().length > 0) {
      <div class="file-list">
        @for (file of store.files(); track file.name) {
          <div class="file-item">
            <mat-icon>description</mat-icon>
            <span>{{ file.name }}</span>
            <span class="file-size">{{ (file.size / 1024).toFixed(1) }} KB</span>
            <button mat-icon-button (click)="removeFile(file)">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        }
      </div>
    }

    <!-- Metadata Fields -->
    <mat-card class="metadata-card">
      <mat-card-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput [value]="store.title()" (input)="store.setTitle($any($event.target).value)">
        </mat-form-field>

        <!-- Material-specific fields -->
        @if (store.type() === 'material') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Main Subject</mat-label>
            <input matInput [value]="store.mainSubject()"
              (input)="store.setMainSubject($any($event.target).value)"
              placeholder="e.g., AI, JavaScript, Kubernetes">
            <mat-hint>The broad subject area for this material</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Sub-Subject (optional)</mat-label>
            <input matInput [value]="store.subSubject()"
              (input)="store.setSubSubject($any($event.target).value)"
              placeholder="e.g., AI Agents & Sub-Agents">
          </mat-form-field>

          <!-- Info message about splitting -->
          @if (!store.agentic()) {
            <div class="info-banner">
              <mat-icon>info</mat-icon>
              <span>
                For best results, split large markdown files into separate files by topic
                before uploading. Each file should cover one sub-topic. If you prefer
                automatic splitting, enable the <strong>Agentic Mode</strong> toggle below.
              </span>
            </div>
          }
        }

        <!-- Problem-specific fields -->
        @if (store.type() === 'problem') {
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Classification</mat-label>
            <mat-select [value]="store.classification()"
              (selectionChange)="store.setClassification($event.value)">
              @for (t of taxonomyOptions; track t.id) {
                <mat-option [value]="t.id">{{ t.label }}</mat-option>
              }
            </mat-select>
            <mat-hint>Primary algorithm/data structure category</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Sub-Classification (optional)</mat-label>
            <mat-select [value]="store.subClassification()"
              (selectionChange)="store.setSubClassification($event.value)">
              <mat-option value="">None</mat-option>
              @for (t of taxonomyOptions; track t.id) {
                <mat-option [value]="t.id">{{ t.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Difficulty</mat-label>
            <mat-select [value]="store.difficulty()"
              (selectionChange)="store.setDifficulty($event.value)">
              <mat-option value="Easy">Easy</mat-option>
              <mat-option value="Medium">Medium</mat-option>
              <mat-option value="Hard">Hard</mat-option>
            </mat-select>
          </mat-form-field>
        }

        <!-- Agentic Toggle -->
        <div class="agentic-toggle">
          <mat-slide-toggle [checked]="store.agentic()" (change)="store.setAgentic($event.checked)">
            Agentic Mode (LLM auto-classification)
          </mat-slide-toggle>
          <p class="hint">
            When enabled, an LLM agent will read your files, automatically classify them,
            and {{ store.type() === 'material' ? 'split multi-topic files into separate sub-topic files' : 'determine difficulty and patterns' }}.
          </p>
        </div>
      </mat-card-content>
    </mat-card>

    @if (store.error()) {
      <div class="error-banner">{{ store.error() }}</div>
    }

    <!-- Submit Button -->
    <div class="actions">
      <button mat-raised-button color="primary"
        [disabled]="store.files().length === 0 || !store.title()"
        (click)="store.submit()">
        <mat-icon>upload</mat-icon>
        Upload {{ store.files().length }} file(s)
      </button>
    </div>
  }

  <!-- Uploading State -->
  @if (store.status() === 'uploading') {
    <div class="upload-progress">
      <h3>Processing...</h3>
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      @if (store.agentic()) {
        <div class="progress-log">
          @for (event of store.progress(); track $index) {
            <div class="progress-event">{{ event.data | json }}</div>
          }
        </div>
      }
    </div>
  }

  <!-- Success State -->
  @if (store.status() === 'success') {
    <div class="upload-success">
      <mat-icon class="success-icon">check_circle</mat-icon>
      <h3>Upload Complete</h3>
      @if (store.result(); as result) {
        <p>{{ result.message }}</p>
        <div class="uploaded-items">
          @for (item of result.items; track item.id) {
            <div class="uploaded-item">
              <mat-icon>description</mat-icon>
              <a [routerLink]="store.type() === 'material' ? ['/subjects', item.id] : ['/problems', item.id]">
                {{ item.title }}
              </a>
            </div>
          }
        </div>
      }
      <button mat-raised-button (click)="store.reset()">
        <mat-icon>add</mat-icon> Upload More
      </button>
    </div>
  }
</div>
```

### upload-page.component.ts

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadStore } from '../../../state/upload.store';

// Taxonomy options (mirror backend taxonomy.ts)
const TAXONOMY_OPTIONS = [
  { id: 'arrays-hashing', label: 'Arrays & Hashing' },
  { id: 'two-pointers', label: 'Two Pointers' },
  // ... full list from taxonomy.ts
];

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatSlideToggleModule, MatButtonToggleModule, MatProgressBarModule,
  ],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent {
  readonly store = inject(UploadStore);
  readonly taxonomyOptions = TAXONOMY_OPTIONS;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []).filter(f => f.name.endsWith('.md'));
    this.store.setFiles([...this.store.files(), ...files]);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.store.setFiles([...this.store.files(), ...files]);
    input.value = '';
  }

  removeFile(file: File) {
    this.store.setFiles(this.store.files().filter(f => f !== file));
  }
}
```

### upload-page.component.scss

```scss
:host {
  display: block;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.subtitle {
  color: var(--mat-sys-on-surface-variant, #666);
  margin-bottom: 1.5rem;
}

.type-toggle {
  margin-bottom: 1.5rem;
  text-align: center;
}

.drop-zone {
  border: 2px dashed var(--mat-sys-outline-variant, #ccc);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: var(--mat-sys-primary, #6200ee);
    background: color-mix(in srgb, var(--mat-sys-primary, #6200ee) 5%, transparent);
  }
}

.upload-icon {
  font-size: 48px;
  width: 48px;
  height: 48px;
  opacity: 0.5;
}

.file-list {
  margin-bottom: 1.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--mat-sys-outline-variant, #eee);
}

.file-size {
  margin-left: auto;
  opacity: 0.6;
  font-size: 0.85rem;
}

.metadata-card {
  margin-bottom: 1.5rem;
}

.full-width {
  width: 100%;
  margin-bottom: 0.5rem;
}

.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--mat-sys-primary, #6200ee) 8%, transparent);
  margin-bottom: 1rem;
}

.agentic-toggle {
  margin-top: 1rem;
}

.hint {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.error-banner {
  background: var(--mat-sys-error-container, #fce4e4);
  color: var(--mat-sys-on-error-container, #c00);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.actions {
  text-align: center;
  margin-top: 1rem;
}

// Progress
.upload-progress {
  text-align: center;
  padding: 2rem;
}

.progress-log {
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  text-align: left;
  font-family: monospace;
  font-size: 0.85rem;
}

// Success
.upload-success {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  font-size: 64px;
  width: 64px;
  height: 64px;
  color: #4caf50;
}

.uploaded-items {
  margin: 1rem 0;
  text-align: left;
}

.uploaded-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
}
```

---

## Sub-Plan 4: Frontend — Taxonomy Options Shared Data

### Goal
Expose taxonomy options (classification IDs/labels) to the frontend so the upload form can show them in dropdowns. Currently the taxonomy lives only in backend `taxonomy.ts`.

### Approach
The backend already serves filter options via `GET /api/filters` (from `filters.json`). The `FiltersStore` already loads these. The `topics` field in the filters response contains `{ id, label, kind }` entries which include the taxonomy. We can reuse this existing data.

### Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `frontend/src/app/features/upload/upload-page/upload-page.component.ts` | **Modify** | Inject `FiltersStore`, use `topics` from it |

```typescript
// In UploadPageComponent
private filtersStore = inject(FiltersStore);
readonly taxonomyOptions = computed(() =>
  this.filtersStore.topics().map(t => ({ id: t.id, label: t.label }))
);
```

---

## Sub-Plan 5: Integration Testing & Verification

### Backend Tests

| File | Action | Description |
|------|--------|-------------|
| `backend/src/routes/upload.test.ts` | **Create** | Integration tests for upload endpoint |

### Test Cases
1. Upload single material file (non-agentic) — verify file saved, subjects.json updated, DB entry created
2. Upload multiple material files under same subject — verify all go to same folder
3. Upload problem file (non-agentic) — verify file saved, problems.json updated, DB entry created
4. Reject non-.md files
5. Reject empty upload
6. Verify file path sanitization (no `../` traversal)

### Frontend Manual Verification
1. Navigate to `/upload`
2. Toggle between Material and Problem
3. Upload a .md file with Material type — verify fields shown
4. Upload with Problem type — verify classification dropdown
5. Check info banner appears for non-agentic material
6. Verify uploaded items appear in Subjects or Problems list

---

## Dependency Summary

### Backend (to add)
- `multer` ^1.4.5-lts.1 — multipart form parsing (mature, well-tested)
- `@types/multer` ^1.4.12 — TypeScript types

### Frontend
- No new dependencies — all Angular Material modules already available

---

## File Changes Summary

### New Files (14)
1. `backend/src/routes/upload.routes.ts`
2. `backend/src/services/upload.service.ts`
3. `backend/src/agents/content-uploader/content-uploader.agent.ts`
4. `backend/src/agents/content-uploader/content-uploader.prompt.ts`
5. `backend/src/agents/content-uploader/tools/classify-content.tool.ts`
6. `backend/src/agents/content-uploader/tools/split-material.tool.ts`
7. `backend/src/agents/content-uploader/tools/save-uploaded-files.tool.ts`
8. `frontend/src/app/features/upload/upload-page/upload-page.component.ts`
9. `frontend/src/app/features/upload/upload-page/upload-page.component.html`
10. `frontend/src/app/features/upload/upload-page/upload-page.component.scss`
11. `frontend/src/app/core/api/upload.api.ts`
12. `frontend/src/app/state/upload.store.ts`
13. `backend/src/routes/upload.test.ts`

### Modified Files (4)
1. `backend/src/types/api.types.ts` — add `uploadBodySchema`
2. `backend/src/index.ts` — mount `uploadRouter`
3. `frontend/src/app/app.routes.ts` — add `/upload` route
4. `frontend/src/app/app.component.html` — add nav link

### Package Changes
1. `backend/package.json` — add `multer`, `@types/multer`

---

## Sub-Plan 6: Updating README.md

Update README.md to include the new upload endpoint and usage instructions.

---

## Implementation Order (Recommended)

### Phase 1 — Backend Non-Agentic (can run in one context)
1. Add `multer` dependency
2. Create `upload.service.ts` (non-agentic functions only)
3. Create `upload.routes.ts`
4. Add `uploadBodySchema` to `api.types.ts`
5. Mount router in `index.ts`
6. Test with curl/Postman

### Phase 2 — Frontend UI (can run in parallel with Phase 3)
1. Create `upload.api.ts`
2. Create `upload.store.ts`
3. Create upload page component (ts, html, scss)
4. Add route and nav link
5. Test manually in browser

### Phase 3 — Backend Agentic Flow (can run in parallel with Phase 2)
1. Create `content-uploader.prompt.ts`
2. Create agent tools (classify, split, save)
3. Create `content-uploader.agent.ts`
4. Add `handleAgenticUpload()` to `upload.service.ts`
5. Test with agentic toggle

### Phase 4 — Polish & Tests
1. Write integration tests
2. Error handling edge cases
3. File sanitization
4. UI polish (loading states, validation messages)

---

## Risks & Considerations

1. **Large files in memory**: `multer.memoryStorage()` holds files in RAM. For markdown files (<5MB), this is fine. If users upload very large files, consider streaming to disk.

2. **Concurrent metadata writes**: If two uploads happen simultaneously, writing to `problems.json`/`subjects.json` could cause races. Mitigation: use a write lock (simple mutex) or serialize writes via the DB transaction.

3. **Agentic flow cost**: Each agentic upload invokes an LLM call. The system prompt should be concise to minimize token usage. Consider caching taxonomy in the prompt.

4. **Material splitting accuracy**: The LLM may not perfectly identify topic boundaries. The split tool should validate that all content from the original file is preserved across splits.

5. **Heading renumbering**: The renumbering logic must handle nested headings (##, ###, ####) and content that references heading numbers (e.g., "see section 14.3"). The renumbering only changes the heading prefix numbers, not in-text references.

6. **Incremental DB updates**: Rather than rebuilding the entire DB (which `buildDb()` does), the upload service uses `INSERT OR REPLACE` to add individual entries. This is faster and doesn't disrupt existing data.

7. **Existing subject/problem conflicts**: If a user uploads a file with the same name as an existing one, the system should either overwrite or append a suffix. The plan uses the existing slug deduplication logic.
