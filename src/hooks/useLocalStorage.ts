import { useState, useEffect } from 'react';
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
      const cleanedQuestions = cleanupAnsweredQuestions(answeredQuestions);
      saveAnsweredQuestions(cleanedQuestions);
    }
  }, [answeredQuestions]);

  const addAnsweredQuestion = (answer: AnsweredQuestion) => {
    setAnsweredQuestions(prev => [...prev, answer]);
  };

  return { answeredQuestions, addAnsweredQuestion, isLoading };
}

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = loadTheme();
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    saveTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
}