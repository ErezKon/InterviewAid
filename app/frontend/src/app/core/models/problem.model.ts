export interface ProblemListItem {
  slug: string;
  leetcodeId: number | null;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: number | null;
  url: string | null;
  primaryTopic: string;
  topics: string[];
  patterns: string[];
  seniority: string | null;
  interviewValue: number | null;
  oneLiner: string | null;
  hasSolution: boolean;
  companies: { slug: string; name: string; frequency: number | null }[];
}

export interface ProblemDetail extends ProblemListItem {
  filePath: string;
  descriptionMd: string | null;
  examplesMd: string | null;
  solutionMd: string | null;
  complexityMd: string | null;
  followUpsMd: string | null;
  takeawayMd: string | null;
  rawMarkdown: string | null;
  relatedSlugs: string[];
}

export interface ProblemSolution {
  solutionMd: string | null;
  complexityMd: string | null;
  followUpsMd: string | null;
  takeawayMd: string | null;
}
