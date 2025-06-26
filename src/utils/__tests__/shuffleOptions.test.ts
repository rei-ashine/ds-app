import { describe, it, expect } from 'vitest';
import { shuffleQuestionOptions } from '../shuffleOptions';
import { Question } from '../../questions';

describe('shuffleQuestionOptions', () => {
  const mockQuestion: Question = {
    id: 1,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: 'Test question?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 2, // Option C
    explanation: 'Test explanation'
  };

  it('should preserve all original options after shuffling', () => {
    const shuffled = shuffleQuestionOptions(mockQuestion);
    
    // Check that all original options are present
    expect(shuffled.shuffledOptions).toHaveLength(4);
    expect(shuffled.shuffledOptions).toContain('Option A');
    expect(shuffled.shuffledOptions).toContain('Option B');
    expect(shuffled.shuffledOptions).toContain('Option C');
    expect(shuffled.shuffledOptions).toContain('Option D');
  });

  it('should maintain correct answer mapping after shuffle', () => {
    const shuffled = shuffleQuestionOptions(mockQuestion);
    
    // The correct answer should be 'Option C' at the shuffled correct index
    expect(shuffled.shuffledOptions[shuffled.shuffledCorrectIndex]).toBe('Option C');
  });

  it('should preserve original question data', () => {
    const shuffled = shuffleQuestionOptions(mockQuestion);
    
    expect(shuffled.id).toBe(mockQuestion.id);
    expect(shuffled.category).toBe(mockQuestion.category);
    expect(shuffled.difficulty).toBe(mockQuestion.difficulty);
    expect(shuffled.question).toBe(mockQuestion.question);
    expect(shuffled.correct).toBe(mockQuestion.correct);
    expect(shuffled.explanation).toBe(mockQuestion.explanation);
    expect(shuffled.options).toEqual(mockQuestion.options);
  });

  it('should have valid shuffled correct index', () => {
    const shuffled = shuffleQuestionOptions(mockQuestion);
    
    expect(shuffled.shuffledCorrectIndex).toBeGreaterThanOrEqual(0);
    expect(shuffled.shuffledCorrectIndex).toBeLessThan(shuffled.shuffledOptions.length);
  });

  it('should produce different shuffles on multiple calls (probabilistic)', () => {
    // Run multiple shuffles to check they produce different orders
    const shuffles = Array.from({ length: 10 }, () => shuffleQuestionOptions(mockQuestion));
    const orders = shuffles.map(s => s.shuffledOptions.join(','));
    
    // With 10 shuffles of 4 items, we should get at least some different orders
    const uniqueOrders = new Set(orders);
    expect(uniqueOrders.size).toBeGreaterThan(1);
  });

  it('should handle edge case with single option', () => {
    const singleOptionQuestion: Question = {
      ...mockQuestion,
      options: ['Only Option'],
      correct: 0
    };
    
    const shuffled = shuffleQuestionOptions(singleOptionQuestion);
    
    expect(shuffled.shuffledOptions).toEqual(['Only Option']);
    expect(shuffled.shuffledCorrectIndex).toBe(0);
  });

  it('should handle different correct answer positions', () => {
    // Test with correct answer at different positions
    for (let correctIndex = 0; correctIndex < 4; correctIndex++) {
      const testQuestion: Question = {
        ...mockQuestion,
        correct: correctIndex
      };
      
      const shuffled = shuffleQuestionOptions(testQuestion);
      const originalCorrectOption = mockQuestion.options[correctIndex];
      
      expect(shuffled.shuffledOptions[shuffled.shuffledCorrectIndex]).toBe(originalCorrectOption);
    }
  });
});