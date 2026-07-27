---
name: leetcode-enricher
description: Enrich LeetCode problem markdown files with comprehensive problem descriptions, examples, solution approaches, pseudocode, walkthroughs, complexity analysis, and follow-up questions. Use this skill whenever the user wants to add detailed explanations to LeetCode problem files, batch process multiple problem files, or fill in missing problem descriptions and solution explanations. Always use when the user mentions "enrich", "add description", "fill in", "explain the solution", or wants to process multiple LeetCode problem files at once.
---

# LeetCode Problem Enricher

This skill enriches LeetCode problem markdown files with comprehensive documentation.

---

## CRITICAL: Allowed Tools for File Editing

**You MUST only use these tools to modify files. Do NOT invent or hallucinate tool names.**

| Tool | Purpose | When to use |
|------|---------|-------------|
| `read_file` | Read a file's contents | Before every edit, to see current content |
| `edit` | Single find-and-replace on a file | When replacing one contiguous block of text |
| `multi_edit` | Multiple find-and-replace on one file | When making several changes to the same file |

**NEVER call any of these — they DO NOT EXIST:**
- ~~`replace_file_content`~~ — DOES NOT EXIST
- ~~`write_file`~~ — DOES NOT EXIST for modifying existing files
- ~~`overwrite_file`~~ — DOES NOT EXIST

### How to edit a problem file

1. **Read** the file with `read_file` to see its current content.
2. **Identify** the old text block to replace (copy it exactly, including whitespace).
3. **Call `edit`** with `old_string` set to the existing text and `new_string` set to the enriched text.
4. If the file only has a placeholder like `*Solution approach and pseudocode to be added.*`, replace that single line.
5. If the file has existing pseudocode after the `---` separator, replace from `---` onward (keeping the header intact).

**Example edit pattern:**
```
edit(
  file_path = "/home/sio/Code/Interview/LeetCode/Problems/Some Problem.md",
  old_string = "---\n\n*Solution approach and pseudocode to be added.*\n",
  new_string = "---\n\n## Problem Description\n\n..."
)
```

---

## Context Efficiency Rules (IMPORTANT for batch processing)

These rules maximize how many files you can process per session:

### 1. Use the pre-sorted file list — never list the directory

The file `/home/sio/Code/Interview/LeetCode/file_list.txt` contains all problem filenames, **one per line, sorted alphabetically, 1-indexed**.

- To get files 2941–3100, call: `read_file(path="/.../file_list.txt", offset=2941, limit=160)`
- **NEVER** use `list_dir` or `find_by_name` on the Problems directory — it wastes context.

### 2. Forget file content after editing

After you finish editing a file, **do not retain its content in your working memory**. Only remember:
- The file's **index number** and **filename** (for progress tracking)
- Whether it was **processed** or **skipped**

### 3. Read files just before editing, in small batches

- Read 3–5 files at a time (parallel `read_file` calls).
- Edit each one immediately after reading.
- Then move to the next batch. Do NOT read all files upfront.

### 4. Keep enrichment concise

- Problem Description: 2–4 sentences max.
- Examples: 2–3 examples, brief explanations.
- Walkthrough: One compact table or bullet list.
- Follow-up: 1–3 sentences.
- Do NOT generate overly verbose content — it wastes context tokens.

### 5. Skip already-enriched files

If a file already has a `## Problem Description` section, **skip it** and report as "already enriched". Do not re-read or re-process it.

---

## Progress Reporting (MANDATORY)

### Before each file edit, ALWAYS print:

```
Now processing file {current_index}/{upper_bound}: {Filename}
```

Example: `Now processing file 2941/3100: Shortest Subarray With OR at Least K I.md`

- `current_index` = the file's line number in `file_list.txt`
- `upper_bound` = the last file number in the requested range
- `Filename` = the exact filename

### After completing a batch, print a brief summary:

```
Batch complete: processed {N}, skipped {M}. Continuing...
```

### At session end, print final summary:

```
Session complete: {N} files processed, {M} skipped, last file: {index} {filename}
To continue next session: "enrich files {next_index}-{upper_bound}"
```

---

## When to Use

- User wants to add problem descriptions to LeetCode files that lack them
- User wants to batch process multiple problem files (e.g., "first 100", "files 101-1000")
- User wants to enrich files that have pseudocode but no surrounding explanation
- User mentions "enrich", "add description", "fill in", or "explain the solution"

## File Structure

Files are in `/home/sio/Code/Interview/LeetCode/Problems/` with this header:

```markdown
# [ID]. [Problem Title]

**Difficulty:** [🟢 Easy / 🟡 Medium / 🔴 Hard]
**Acceptance:** [percentage]  (optional)
**LeetCode:** [URL]
**Companies:** [company list]
```

## Enrichment Format

### Required Sections (add after the `---` separator)

1. **Problem Description** — What the problem asks, with constraints
2. **Examples** — 2–3 input/output examples with brief explanations
3. **Approach** — Algorithm name, complexity badge, key insight, pseudocode
4. **Walkthrough** — Step-by-step trace through one example (table preferred)
5. **Complexity** — Time/Space table
6. **Follow-up** — 1–3 related problems or extensions (optional)

### Pseudocode Style

- `FUNCTION Name`, `CLASS Name`
- `FOR i ← 0 TO n-1:`, `WHILE cond:`
- `IF ... ELSE IF ... ELSE`
- `RETURN`
- Comments: `// comment`

## Processing Modes

### Single File

1. Read the file.
2. Identify missing sections.
3. Use `edit` to add them, preserving the header and existing pseudocode.

### Batch Processing

1. Read the relevant lines from `file_list.txt` using `offset`/`limit`.
2. Process files in batches of 3–5 (read in parallel, then edit sequentially).
3. Print progress before each file.
4. Print batch summary after each batch.
5. Print session summary at the end.

### Range Syntax

- `"first N"` → files 1 through N
- `"files X-Y"` → files X through Y (inclusive)
- `"files X-"` → files X through end
- `"files -Y"` → files 1 through Y

## Preservation Rules

**NEVER modify:**
- The `# [ID]. [Title]` header line
- The `**Difficulty:**` line
- The `**Acceptance:**` line (if present)
- The `**LeetCode:**` URL
- The `**Companies:**` list

**DO preserve:**
- Existing well-written sections and pseudocode — wrap explanation around them

## Error Handling

- No problem ID in title → skip and report
- Already has `## Problem Description` → skip ("already enriched")
- Edit tool error → report the error, continue to next file
