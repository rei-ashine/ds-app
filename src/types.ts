export interface AnsweredQuestion {
  questionId: number;
  correct: boolean;
  timestamp: string;
}

export interface StudyHistory {
  date: string;
  correct: number;
  total: number;
  category: string;
}

export type StudyMode = 'all' | 'category' | 'review';
export type Category = 'all' | 'データサイエンス力' | 'データエンジニアリング力' | 'ビジネス力';