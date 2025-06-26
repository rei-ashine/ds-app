import { Question } from '../questions';

export interface ValidationError {
  questionId: number;
  error: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  summary: {
    totalQuestions: number;
    validQuestions: number;
    invalidQuestions: number;
    categoryDistribution: Record<string, number>;
    difficultyDistribution: Record<string, number>;
  };
}

export function validateQuestions(questions: Question[]): ValidationResult {
  const errors: ValidationError[] = [];
  const categoryDistribution: Record<string, number> = {};
  const difficultyDistribution: Record<string, number> = {};
  const usedIds = new Set<number>();

  const validCategories = ['データサイエンス力', 'データエンジニアリング力', 'ビジネス力'];
  const validDifficulties = ['基礎', '応用'];

  questions.forEach((question, index) => {
    const actualId = question.id;
    const questionContext = `Question ${actualId} (index ${index})`;

    // Validate ID
    if (typeof actualId !== 'number' || actualId <= 0) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Invalid ID - must be a positive number`
      });
    }

    // Check for duplicate IDs
    if (usedIds.has(actualId)) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Duplicate ID found`
      });
    } else {
      usedIds.add(actualId);
    }

    // Validate category
    if (!validCategories.includes(question.category)) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Invalid category "${question.category}". Must be one of: ${validCategories.join(', ')}`
      });
    } else {
      categoryDistribution[question.category] = (categoryDistribution[question.category] || 0) + 1;
    }

    // Validate difficulty
    if (!validDifficulties.includes(question.difficulty)) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Invalid difficulty "${question.difficulty}". Must be one of: ${validDifficulties.join(', ')}`
      });
    } else {
      difficultyDistribution[question.difficulty] = (difficultyDistribution[question.difficulty] || 0) + 1;
    }

    // Validate question text
    if (!question.question || typeof question.question !== 'string' || question.question.trim().length === 0) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Question text is required and must be a non-empty string`
      });
    }

    // Validate options
    if (!Array.isArray(question.options)) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Options must be an array`
      });
    } else {
      if (question.options.length !== 4) {
        errors.push({
          questionId: actualId,
          error: `${questionContext}: Must have exactly 4 options, found ${question.options.length}`
        });
      }

      question.options.forEach((option: string, optionIndex: number) => {
        if (!option || typeof option !== 'string' || option.trim().length === 0) {
          errors.push({
            questionId: actualId,
            error: `${questionContext}: Option ${optionIndex + 1} is required and must be a non-empty string`
          });
        }
      });
    }

    // Validate correct answer index
    if (typeof question.correct !== 'number') {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Correct answer index must be a number`
      });
    } else if (question.correct < 0 || question.correct >= question.options.length) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Correct answer index ${question.correct} is out of range (0-${question.options.length - 1})`
      });
    }

    // Validate explanation
    if (!question.explanation || typeof question.explanation !== 'string' || question.explanation.trim().length === 0) {
      errors.push({
        questionId: actualId,
        error: `${questionContext}: Explanation is required and must be a non-empty string`
      });
    }
  });

  // Check for sequential IDs (optional warning)
  const sortedIds = Array.from(usedIds).sort((a, b) => a - b);
  for (let i = 0; i < sortedIds.length; i++) {
    if (sortedIds[i] !== i + 1) {
      errors.push({
        questionId: sortedIds[i],
        error: `Warning: Non-sequential ID found. Expected ${i + 1}, found ${sortedIds[i]}`
      });
      break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    summary: {
      totalQuestions: questions.length,
      validQuestions: questions.length - errors.filter(e => !e.error.startsWith('Warning:')).length,
      invalidQuestions: errors.filter(e => !e.error.startsWith('Warning:')).length,
      categoryDistribution,
      difficultyDistribution
    }
  };
}

export function printValidationReport(result: ValidationResult): void {
  console.log('\n📊 Question Validation Report');
  console.log('================================');
  
  if (result.isValid) {
    console.log('✅ All questions are valid!');
  } else {
    console.log('❌ Validation failed with errors:');
    result.errors.forEach(error => {
      const icon = error.error.startsWith('Warning:') ? '⚠️' : '❌';
      console.log(`${icon} ${error.error}`);
    });
  }

  console.log('\n📈 Summary:');
  console.log(`Total Questions: ${result.summary.totalQuestions}`);
  console.log(`Valid Questions: ${result.summary.validQuestions}`);
  console.log(`Invalid Questions: ${result.summary.invalidQuestions}`);

  console.log('\n📚 Category Distribution:');
  Object.entries(result.summary.categoryDistribution).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} questions`);
  });

  console.log('\n⚡ Difficulty Distribution:');
  Object.entries(result.summary.difficultyDistribution).forEach(([difficulty, count]) => {
    console.log(`  ${difficulty}: ${count} questions`);
  });
}