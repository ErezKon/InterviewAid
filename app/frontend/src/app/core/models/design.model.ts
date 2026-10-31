export type DesignDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface DesignListItem {
  slug: string;
  title: string;
  /** Taxonomy id: system-design | oop-design | frontend-system-design | ai-ml-system-design */
  category: string;
  categoryLabel: string;
  difficulty: DesignDifficulty;
  seniority: string | null;
  companies: string[];
  tags: string[];
  timeMinutes: number | null;
  summary: string;
}

export interface DesignDetail extends DesignListItem {
  filePath: string;
  statementMd: string | null;
  clarifyingMd: string | null;
  requirementsMd: string | null;
  solutionMd: string | null;
  followUpsMd: string | null;
  mistakesMd: string | null;
  takeawaysMd: string | null;
  sections: string[];
  rawMarkdown: string;
  related: DesignListItem[];
}

export interface DesignCategory {
  id: string;
  label: string;
  count: number;
  difficulties: Record<DesignDifficulty, number>;
}

export interface DesignFilters {
  q: string;
  categories: string[];
  difficulties: string[];
  seniority: string | null;
}

/** Material icon per design category (taxonomy id). */
export const DESIGN_CATEGORY_ICONS: Record<string, string> = {
  'system-design': 'hub',
  'oop-design': 'account_tree',
  'frontend-system-design': 'web',
  'ai-ml-system-design': 'psychology',
};

export const DESIGN_CATEGORY_LABELS: Record<string, string> = {
  'system-design': 'System Design',
  'oop-design': 'Low-Level Design',
  'frontend-system-design': 'Frontend System Design',
  'ai-ml-system-design': 'AI/ML System Design',
};
