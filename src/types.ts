export interface AnsweredQuestion {
  questionId: number;
  correct: boolean;
  timestamp: string;
}

export const CATEGORIES = ['データサイエンス力', 'データエンジニアリング力', 'ビジネス力'] as const;

export type QuestionCategory = typeof CATEGORIES[number];
export type StudyMode = 'all' | 'category' | 'review';
export type Category = 'all' | QuestionCategory;
export type View = 'home' | 'terms' | 'privacy';
export type CategoryStats = Record<QuestionCategory, { correct: number; total: number }>;
