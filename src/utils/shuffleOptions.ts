import { Question } from '../questions';

export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

/**
 * Shuffles the options of a question and updates the correct answer index accordingly
 * Uses Fisher-Yates shuffle algorithm for uniform distribution
 */
export function shuffleQuestionOptions(question: Question): ShuffledQuestion {
  // Create array of indices [0, 1, 2, 3, ...]
  const indices = Array.from({ length: question.options.length }, (_, i) => i);
  
  // Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Create shuffled options array using the shuffled indices
  const shuffledOptions = indices.map(i => question.options[i]);
  
  // Find where the original correct answer ended up after shuffling
  const shuffledCorrectIndex = indices.indexOf(question.correct);
  
  return {
    ...question,
    shuffledOptions,
    shuffledCorrectIndex
  };
}