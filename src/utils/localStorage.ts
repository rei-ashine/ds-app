import { AnsweredQuestion } from '../types';

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }
};

export const loadAnsweredQuestions = (): AnsweredQuestion[] => {
  try {
    const savedHistory = safeLocalStorage.getItem('dsExamHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse answered questions from localStorage', error);
  }
  return [];
};

export const saveAnsweredQuestions = (questions: AnsweredQuestion[]): boolean => {
  try {
    return safeLocalStorage.setItem('dsExamHistory', JSON.stringify(questions));
  } catch (error) {
    console.error('Failed to save answered questions to localStorage', error);
    return false;
  }
};

export const loadTheme = (): 'light' | 'dark' => {
  const savedTheme = safeLocalStorage.getItem('dsExamTheme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const saveTheme = (theme: 'light' | 'dark'): boolean => {
  return safeLocalStorage.setItem('dsExamTheme', theme);
};

// Cleanup old data (keep only last 1000 answers)
export const cleanupAnsweredQuestions = (questions: AnsweredQuestion[]): AnsweredQuestion[] => {
  if (questions.length > 1000) {
    return questions.slice(-1000);
  }
  return questions;
};