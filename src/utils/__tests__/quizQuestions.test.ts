import { describe, it, expect } from 'vitest';
import { Question } from '../../questions';
import { AnsweredQuestion } from '../../types';
import { getLatestAnswers, filterQuestions, buildQuizQuestions } from '../quizQuestions';

const makeQuestion = (id: number, category: Question['category']): Question => ({
  id,
  category,
  difficulty: '基礎',
  question: `Question ${id}`,
  options: ['A', 'B', 'C', 'D'],
  correct: 0,
  explanation: `Explanation ${id}`
});

const mockQuestions: Question[] = [
  makeQuestion(1, 'データサイエンス力'),
  makeQuestion(2, 'データエンジニアリング力'),
  makeQuestion(3, 'ビジネス力'),
  makeQuestion(4, 'データサイエンス力')
];

const answer = (questionId: number, correct: boolean): AnsweredQuestion => ({
  questionId,
  correct,
  timestamp: '2026-01-01T00:00:00.000Z'
});

describe('getLatestAnswers', () => {
  it('keeps only the last answer for each question', () => {
    const latest = getLatestAnswers([answer(1, false), answer(2, true), answer(1, true)]);

    expect(latest.get(1)).toBe(true);
    expect(latest.get(2)).toBe(true);
    expect(latest.size).toBe(2);
  });
});

describe('filterQuestions', () => {
  it('returns all questions for the overall test', () => {
    expect(filterQuestions(mockQuestions, 'all', 'all', [])).toEqual(mockQuestions);
  });

  it('returns only the selected category', () => {
    const result = filterQuestions(mockQuestions, 'category', 'データサイエンス力', []);

    expect(result.map(q => q.id)).toEqual([1, 4]);
  });

  it('returns questions whose latest answer was incorrect in review mode', () => {
    const history = [answer(1, false), answer(2, false), answer(2, true), answer(3, false)];
    const result = filterQuestions(mockQuestions, 'review', 'all', history);

    expect(result.map(q => q.id)).toEqual([1, 3]);
  });

  it('returns no questions in review mode without history', () => {
    expect(filterQuestions(mockQuestions, 'review', 'all', [])).toEqual([]);
  });
});

describe('buildQuizQuestions', () => {
  it('returns the filtered questions with shuffled options', () => {
    const result = buildQuizQuestions(mockQuestions, 'category', 'データサイエンス力', []);

    expect(result.map(q => q.id).sort()).toEqual([1, 4]);
    result.forEach(q => {
      expect(q.shuffledOptions.sort()).toEqual(['A', 'B', 'C', 'D']);
    });
  });
});
