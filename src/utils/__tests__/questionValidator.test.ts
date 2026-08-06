import { describe, it, expect } from 'vitest';
import { questions } from '../../questions';
import { validateQuestions } from '../questionValidator';

describe('Question Database Integrity Test', () => {
  it('should pass validation for all questions in questions.ts', () => {
    const result = validateQuestions(questions);
    
    // Warning以外のエラーが存在しないことを確認
    const nonWarningErrors = result.errors.filter(e => !e.error.startsWith('Warning:'));
    expect(nonWarningErrors).toEqual([]);
    expect(result.isValid).toBe(true);
    expect(result.summary.totalQuestions).toBe(100);
  });

  it('should have correct category distribution', () => {
    const result = validateQuestions(questions);
    expect(result.summary.categoryDistribution['データサイエンス力']).toBe(33);
    expect(result.summary.categoryDistribution['データエンジニアリング力']).toBe(34);
    expect(result.summary.categoryDistribution['ビジネス力']).toBe(33);
  });

  it('should have correct difficulty distribution', () => {
    const result = validateQuestions(questions);
    expect(result.summary.difficultyDistribution['基礎']).toBeGreaterThan(0);
    expect(result.summary.difficultyDistribution['応用']).toBeGreaterThan(0);
  });
});
