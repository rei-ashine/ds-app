import { Question } from '../questions';

/**
 * Shuffles an array of questions using Fisher-Yates algorithm
 * Returns a new array without modifying the original
 */
export function shuffleQuestions<T extends Question>(questions: T[]): T[] {
  if (questions.length <= 1) return [...questions];
  
  const shuffled = [...questions];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Creates a shuffled index array for a given length
 * Useful when you need to track the shuffle mapping
 */
export function createShuffledIndices(length: number): number[] {
  if (length <= 1) return Array.from({ length }, (_, i) => i);
  
  const indices = Array.from({ length }, (_, i) => i);
  
  // Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  return indices;
}