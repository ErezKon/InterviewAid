export interface CompanyOption {
  slug: string;
  name: string;
  problemCount: number;
}

export interface TopicOption {
  id: string;
  label: string;
  kind: string;
  problemCount: number;
}

export interface FiltersData {
  companies: CompanyOption[];
  difficulties: string[];
  topics: TopicOption[];
  seniority: string[];
}

export interface SelectedFilters {
  companies: string[];
  difficulties: string[];
  topics: string[];
  seniority: string | null;
  q: string;
  matchMode: 'any' | 'all';
  minInterviewValue: number | null;
}
