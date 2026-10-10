import { useMemo } from 'react';
import { questions } from '../questions';
import { AnsweredQuestion, CATEGORIES, CategoryStats } from '../types';
import { getLatestAnswers } from '../utils/quizQuestions';

const questionsById = new Map(questions.map(q => [q.id, q]));

export function useCategoryStats(answeredQuestions: AnsweredQuestion[], isVisible: boolean) {
  return useMemo(() => {
    const stats = Object.fromEntries(
      CATEGORIES.map(category => [category, { correct: 0, total: 0 }])
    ) as CategoryStats;

    if (!isVisible) return stats;

    getLatestAnswers(answeredQuestions).forEach((isCorrect, questionId) => {
      const question = questionsById.get(questionId);
      if (question) {
        stats[question.category].total++;
        if (isCorrect) {
          stats[question.category].correct++;
        }
      }
    });

    return stats;
  }, [answeredQuestions, isVisible]);
}
