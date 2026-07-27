export interface TaxonomyEntry {
  id: string;
  label: string;
}

export const TAXONOMY: TaxonomyEntry[] = [
  { id: 'arrays-hashing', label: 'Arrays & Hashing' },
  { id: 'two-pointers', label: 'Two Pointers' },
  { id: 'sliding-window', label: 'Sliding Window' },
  { id: 'string-manipulation', label: 'String Manipulation' },
  { id: 'stack-queue', label: 'Stack & Queue' },
  { id: 'linked-list', label: 'Linked List' },
  { id: 'binary-search', label: 'Binary Search' },
  { id: 'trees', label: 'Trees & BST' },
  { id: 'tries', label: 'Tries' },
  { id: 'heap-priority-queue', label: 'Heap / Priority Queue' },
  { id: 'graphs', label: 'Graphs' },
  { id: 'backtracking', label: 'Backtracking' },
  { id: 'dynamic-programming', label: 'Dynamic Programming' },
  { id: 'greedy', label: 'Greedy' },
  { id: 'intervals', label: 'Intervals' },
  { id: 'math-geometry', label: 'Math & Geometry' },
  { id: 'bit-manipulation', label: 'Bit Manipulation' },
  { id: 'data-structures-design', label: 'Data Structure Design' },
  { id: 'concurrency', label: 'Concurrency & Multithreading' },
  { id: 'sql-database', label: 'SQL / Database' },
  { id: 'shell-scripting', label: 'Shell Scripting' },
  { id: 'system-design', label: 'System Design' },
  { id: 'oop-design', label: 'OOP / Low-Level Design' },
  { id: 'theory-ai', label: 'AI / LLM / Agents Theory' },
  { id: 'theory-architecture', label: 'Architecture & Practices Theory' },
];

export const TAXONOMY_IDS = TAXONOMY.map(t => t.id);

export const TAXONOMY_MAP = new Map(TAXONOMY.map(t => [t.id, t]));

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

export const SENIORITY = ['junior', 'mid', 'senior', 'staff', 'principal'] as const;
