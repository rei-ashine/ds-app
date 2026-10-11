import { Question } from '../questions';
import { createShuffledIndices } from './shuffleQuestions';

export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

/**
 * Shuffles the options of a question and updates the correct answer index accordingly
 */
export function shuffleQuestionOptions(question: Question): ShuffledQuestion {
  const indices = createShuffledIndices(question.options.length);

  return {
    ...question,
    shuffledOptions: indices.map(i => question.options[i]),
    // Find where the original correct answer ended up after shuffling
    shuffledCorrectIndex: indices.indexOf(question.correct)
  };
}
