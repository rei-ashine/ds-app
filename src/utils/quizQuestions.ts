import { Question } from '../questions';
import { AnsweredQuestion, Category, StudyMode } from '../types';
import { shuffleQuestions } from './shuffleQuestions';
import { shuffleQuestionOptions, ShuffledQuestion } from './shuffleOptions';

/** 問題ごとの最新の正誤（同じ問題に複数回答えた場合は最後の解答を採用） */
export function getLatestAnswers(answeredQuestions: AnsweredQuestion[]): Map<number, boolean> {
  const latestAnswers = new Map<number, boolean>();
  answeredQuestions.forEach(q => {
    latestAnswers.set(q.questionId, q.correct);
  });
  return latestAnswers;
}

export function filterQuestions(
  allQuestions: Question[],
  studyMode: StudyMode,
  selectedCategory: Category,
  answeredQuestions: AnsweredQuestion[]
): Question[] {
  if (studyMode === 'review') {
    const incorrectIds = new Set<number>();
    getLatestAnswers(answeredQuestions).forEach((isCorrect, id) => {
      if (!isCorrect) incorrectIds.add(id);
    });
    return allQuestions.filter(q => incorrectIds.has(q.id));
  }
  if (selectedCategory === 'all') {
    return allQuestions;
  }
  return allQuestions.filter(q => q.category === selectedCategory);
}

/** 出題順と選択肢の並びをシャッフルした問題セットを作る */
export function buildQuizQuestions(
  allQuestions: Question[],
  studyMode: StudyMode,
  selectedCategory: Category,
  answeredQuestions: AnsweredQuestion[]
): ShuffledQuestion[] {
  const filtered = filterQuestions(allQuestions, studyMode, selectedCategory, answeredQuestions);
  return shuffleQuestions(filtered).map(shuffleQuestionOptions);
}
