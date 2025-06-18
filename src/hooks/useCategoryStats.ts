import { useMemo } from 'react';
import { questions } from '../questions';
import { AnsweredQuestion } from '../types';

export function useCategoryStats(answeredQuestions: AnsweredQuestion[]) {
  return useMemo(() => {
    const stats = {
      'データサイエンス力': { correct: 0, total: 0 },
      'データエンジニアリング力': { correct: 0, total: 0 },
      'ビジネス力': { correct: 0, total: 0 }
    };

    answeredQuestions.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        stats[question.category].total++;
        if (answer.correct) {
          stats[question.category].correct++;
        }
      }
    });

    return stats;
  }, [answeredQuestions]);
}