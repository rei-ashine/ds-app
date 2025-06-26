import { useMemo } from 'react';
import { questions } from '../questions';
import { StudyMode, Category, AnsweredQuestion } from '../types';
import { shuffleQuestions } from '../utils/shuffleQuestions';

export function useFilteredQuestions(
  studyMode: StudyMode,
  selectedCategory: Category,
  answeredQuestions: AnsweredQuestion[]
) {
  return useMemo(() => {
    let filtered;
    
    if (studyMode === 'review') {
      const incorrectIds = answeredQuestions
        .filter(q => !q.correct)
        .map(q => q.questionId);
      filtered = questions.filter(q => incorrectIds.includes(q.id));
    } else if (selectedCategory === 'all') {
      filtered = questions;
    } else {
      filtered = questions.filter(q => q.category === selectedCategory);
    }
    
    // Shuffle the filtered questions
    return shuffleQuestions(filtered);
  }, [studyMode, selectedCategory, answeredQuestions]);
}