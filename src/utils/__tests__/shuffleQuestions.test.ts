import { describe, it, expect, vi } from 'vitest';
import { shuffleQuestions, createShuffledIndices } from '../shuffleQuestions';
import { Question } from '../../questions';

describe('shuffleQuestions', () => {
  const mockQuestions: Question[] = [
    {
      id: 1,
      category: 'データサイエンス力',
      difficulty: '基礎',
      question: 'Test question 1',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,
      explanation: 'Test explanation 1'
    },
    {
      id: 2,
      category: 'データエンジニアリング力',
      difficulty: '応用',
      question: 'Test question 2',
      options: ['A', 'B', 'C', 'D'],
      correct: 1,
      explanation: 'Test explanation 2'
    },
    {
      id: 3,
      category: 'ビジネス力',
      difficulty: '基礎',
      question: 'Test question 3',
      options: ['A', 'B', 'C', 'D'],
      correct: 2,
      explanation: 'Test explanation 3'
    }
  ];

  it('should return a new array without modifying the original', () => {
    const original = [...mockQuestions];
    const shuffled = shuffleQuestions(mockQuestions);
    
    expect(mockQuestions).toEqual(original);
    expect(shuffled).not.toBe(mockQuestions);
  });

  it('should return all questions in the shuffled array', () => {
    const shuffled = shuffleQuestions(mockQuestions);
    
    expect(shuffled).toHaveLength(mockQuestions.length);
    
    // Check that all original questions are present
    mockQuestions.forEach(question => {
      expect(shuffled.find(q => q.id === question.id)).toBeDefined();
    });
  });

  it('should handle empty array', () => {
    const shuffled = shuffleQuestions([]);
    expect(shuffled).toEqual([]);
  });

  it('should handle single item array', () => {
    const singleItem = [mockQuestions[0]];
    const shuffled = shuffleQuestions(singleItem);
    
    expect(shuffled).toEqual(singleItem);
    expect(shuffled).not.toBe(singleItem);
  });

  it('should produce different orders with different random seeds', () => {
    // Mock Math.random to return predictable values
    const originalRandom = Math.random;
    
    // First shuffle with one seed
    Math.random = vi.fn()
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.5);
    
    const shuffled1 = shuffleQuestions(mockQuestions);
    
    // Second shuffle with different seed
    Math.random = vi.fn()
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.5);
    
    const shuffled2 = shuffleQuestions(mockQuestions);
    
    // Restore original Math.random
    Math.random = originalRandom;
    
    // The two shuffles should be different
    expect(shuffled1.map(q => q.id)).not.toEqual(shuffled2.map(q => q.id));
  });

  it('should preserve question properties', () => {
    const shuffled = shuffleQuestions(mockQuestions);
    
    shuffled.forEach(question => {
      const original = mockQuestions.find(q => q.id === question.id);
      expect(question).toEqual(original);
    });
  });
});

describe('createShuffledIndices', () => {
  it('should return array of correct length', () => {
    const indices = createShuffledIndices(5);
    expect(indices).toHaveLength(5);
  });

  it('should contain all indices from 0 to length-1', () => {
    const length = 4;
    const indices = createShuffledIndices(length);
    
    for (let i = 0; i < length; i++) {
      expect(indices).toContain(i);
    }
  });

  it('should handle length 0', () => {
    const indices = createShuffledIndices(0);
    expect(indices).toEqual([]);
  });

  it('should handle length 1', () => {
    const indices = createShuffledIndices(1);
    expect(indices).toEqual([0]);
  });

  it('should produce different orders', () => {
    const originalRandom = Math.random;
    
    // First shuffle
    Math.random = vi.fn()
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.5);
    
    const indices1 = createShuffledIndices(4);
    
    // Second shuffle
    Math.random = vi.fn()
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.5);
    
    const indices2 = createShuffledIndices(4);
    
    Math.random = originalRandom;
    
    expect(indices1).not.toEqual(indices2);
  });
});