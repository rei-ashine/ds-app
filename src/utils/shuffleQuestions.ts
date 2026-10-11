import { Question } from '../questions';

/**
 * Shuffles an array using Fisher-Yates algorithm
 * Returns a new array without modifying the original
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function shuffleQuestions<T extends Question>(questions: T[]): T[] {
  return shuffleArray(questions);
}

/**
 * Creates a shuffled index array for a given length
 * Useful when you need to track the shuffle mapping
 */
export function createShuffledIndices(length: number): number[] {
  return shuffleArray(Array.from({ length }, (_, i) => i));
}
