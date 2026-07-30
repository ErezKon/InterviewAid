export interface SubjectListItem {
  id: string;
  title: string;
  sourceFile: string;
  mainSubject: string;
  subSubject: string | null;
  primaryTopic: string | null;
  topics: string[];
  keyConcepts: string[];
  wordCount: number;
}

export interface SubjectDetail extends SubjectListItem {
  bodyMd: string;
}
