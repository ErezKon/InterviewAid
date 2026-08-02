export interface QuizQuestion {
  id: string;
  subjectId: string;
  subjectTitle: string;
  mainSubject: string;
  type: 'open' | 'multiple-choice';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  expectedAnswer: string;
  referenceQuote: string;
  followUp?: string;
}

export interface QuizSubjectInfo {
  id: string;
  title: string;
  questionCount: number;
}

export interface QuizStatsGroup {
  mainSubject: string;
  subjects: QuizSubjectInfo[];
  totalQuestions: number;
}
