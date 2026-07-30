export interface Problem {
  slug: string;
  leetcodeId: number | null;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: number | null;
  url: string | null;
  filePath: string;
  companies: { slug: string; name: string; frequency: number | null }[];
  descriptionMd: string | null;
  examplesMd: string | null;
  solutionMd: string | null;
  complexityMd: string | null;
  followUpsMd: string | null;
  takeawayMd: string | null;
  hasSolution: boolean;
  primaryTopic: string | null;
  topics: string[];
  patterns: string[];
  seniority: string | null;
  interviewValue: number | null;
  oneLiner: string | null;
}

export interface Subject {
  id: string;
  sourceFile: string;
  title: string;
  level: number;
  bodyMd: string;
  wordCount: number;
  mainSubject: string;
  subSubject: string | null;
  primaryTopic: string | null;
  topics: string[];
  keyConcepts: string[];
}

/** @deprecated Use Problem instead */
export type RawProblem = Problem;
/** @deprecated Use Problem instead */
export type ClassifiedProblem = Problem;
/** @deprecated Use Subject instead */
export type RawSubject = Subject;
/** @deprecated Use Subject instead */
export type ClassifiedSubject = Subject;

export interface ParseReport {
  totalFiles: number;
  parsed: number;
  failed: number;
  failures: { file: string; error: string }[];
  timestamp: string;
}
