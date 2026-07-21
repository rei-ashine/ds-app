import { useState, useEffect, useCallback } from 'react';
import { AnsweredQuestion } from '../types';
import { 
  loadAnsweredQuestions, 
  saveAnsweredQuestions, 
  loadTheme, 
  saveTheme,
  cleanupAnsweredQuestions 
} from '../utils/localStorage';

export function useAnsweredQuestions() {
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const savedQuestions = loadAnsweredQuestions();
    setAnsweredQuestions(savedQuestions);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (answeredQuestions.length > 0) {
      const timer = setTimeout(() => {
        const cleanedQuestions = cleanupAnsweredQuestions(answeredQuestions);
        saveAnsweredQuestions(cleanedQuestions);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [answeredQuestions]);

  const addAnsweredQuestion = useCallback((answer: AnsweredQuestion) => {
    setAnsweredQuestions(prev => [...prev, answer]);
  }, []);

  return { answeredQuestions, addAnsweredQuestion, isLoading };
}

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => loadTheme() === 'dark');

  useEffect(() => {
    saveTheme(isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);
  return { isDarkMode, toggleDarkMode };
}