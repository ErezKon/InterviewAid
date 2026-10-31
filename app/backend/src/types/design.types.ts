export type Difficulty = 'Easy' | 'Medium' | 'Hard';

/** A design interview problem parsed from Data/Problems/Design/<Category>/<Title>.md */
export interface DesignProblem {
  slug: string;
  title: string;
  /** Taxonomy id of the category (see DESIGN_CATEGORIES) */
  category: string;
  categoryLabel: string;
  difficulty: Difficulty;
  seniority: string | null;
  companies: string[];
  tags: string[];
  timeMinutes: number | null;
  /** Path relative to CONTENT_ROOT */
  filePath: string;
  /** First sentence(s) of the problem statement, ≤ 220 chars */
  summary: string;
  statementMd: string | null;
  clarifyingMd: string | null;
  requirementsMd: string | null;
  /** All solution sections (everything that is not statement/clarifying/requirements/follow-ups/mistakes/takeaways), as "## Heading" blocks */
  solutionMd: string | null;
  followUpsMd: string | null;
  mistakesMd: string | null;
  takeawaysMd: string | null;
  /** All `##` headings in file order */
  sections: string[];
}

export type DesignProblemListItem = Pick<DesignProblem,
  'slug' | 'title' | 'category' | 'categoryLabel' | 'difficulty' | 'seniority' |
  'companies' | 'tags' | 'timeMinutes' | 'summary'>;

export interface DesignProblemDetail extends DesignProblem {
  rawMarkdown: string;
  related: DesignProblemListItem[];
}

export interface DesignCategorySummary {
  id: string;
  label: string;
  count: number;
  difficulties: Record<Difficulty, number>;
}
