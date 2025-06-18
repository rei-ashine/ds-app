import { useMemo } from 'react';
import { questions } from '../questions';
import { StudyMode, Category, AnsweredQuestion } from '../types';

export function useFilteredQuestions(
  studyMode: StudyMode,
  selectedCategory: Category,
  answeredQuestions: AnsweredQuestion[]
) {
  return useMemo(() => {
    if (studyMode === 'review') {
      const incorrectIds = answeredQuestions
        .filter(q => !q.correct)
        .map(q => q.questionId);
      return questions.filter(q => incorrectIds.includes(q.id));
    }
    
    if (selectedCategory === 'all') {
      return questions;
    }
    
    return questions.filter(q => q.category === selectedCategory);
  }, [studyMode, selectedCategory, answeredQuestions]);
}