import { useState, useEffect } from 'react';
import "@theme-toggles/react/css/Expand.css";
import { StudyMode, Category } from './types';
import { useAnsweredQuestions, useTheme } from './hooks/useLocalStorage';
import { useCategoryStats } from './hooks/useCategoryStats';
import { LoadingSpinner } from './components/LoadingSpinner';
import { shuffleQuestionOptions, ShuffledQuestion } from './utils/shuffleOptions';
import { shuffleQuestions } from './utils/shuffleQuestions';
import { questions } from './questions';

import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import { NoQuestionsScreen } from './components/NoQuestionsScreen';
import { StudyTips } from './components/StudyTips';

export default function DSExamStudyApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [studyMode, setStudyMode] = useState<StudyMode>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showStats, setShowStats] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [quizSessionId, setQuizSessionId] = useState(0);

  const { answeredQuestions, addAnsweredQuestion, isLoading } = useAnsweredQuestions();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const categoryStats = useCategoryStats(answeredQuestions);

  useEffect(() => {
    if (isLoading) return;

    let newFiltered;
    if (studyMode === 'review') {
      // Find the latest answer for each question
      const latestAnswers = new Map<number, boolean>();
      answeredQuestions.forEach(q => {
        latestAnswers.set(q.questionId, q.correct);
      });
      
      const incorrectIds = Array.from(latestAnswers.entries())
        .filter(([_, isCorrect]) => !isCorrect)
        .map(([id, _]) => id);
        
      newFiltered = questions.filter(q => incorrectIds.includes(q.id));
    } else if (selectedCategory === 'all') {
      newFiltered = questions;
    } else {
      newFiltered = questions.filter(q => q.category === selectedCategory);
    }

    if (newFiltered.length > 0) {
      const questionsWithShuffledOptions = shuffleQuestions(newFiltered).map(q => shuffleQuestionOptions(q));
      setShuffledQuestions(questionsWithShuffledOptions);
    } else {
      setShuffledQuestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, studyMode, selectedCategory, quizSessionId]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestionData) return;
    
    const isCorrect = selectedAnswer === currentQuestionData.shuffledCorrectIndex;
    if (isCorrect) setScore(score + 1);
    
    addAnsweredQuestion({
      questionId: currentQuestionData.id,
      correct: isCorrect,
      timestamp: new Date().toISOString()
    });
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowStats(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowStats(false);
    setQuizSessionId(prev => prev + 1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showStats) {
    return (
      <ResultScreen 
        score={score} 
        totalQuestions={shuffledQuestions.length} 
        categoryStats={categoryStats}
        resetQuiz={resetQuiz} 
        startReview={() => { setStudyMode('review'); resetQuiz(); }} 
      />
    );
  }

  const currentQuestionData = shuffledQuestions[currentQuestion];

  if (!currentQuestionData || shuffledQuestions.length === 0) {
    return <NoQuestionsScreen resetQuiz={resetQuiz} setStudyMode={setStudyMode} setSelectedCategory={setSelectedCategory} />;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-md p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <ModeSelector 
            studyMode={studyMode} 
            selectedCategory={selectedCategory} 
            setStudyMode={setStudyMode} 
            setSelectedCategory={setSelectedCategory} 
            resetQuiz={resetQuiz} 
          />
          <ProgressBar 
            currentQuestionIndex={currentQuestion} 
            totalQuestions={shuffledQuestions.length} 
          />
        </div>

        <QuestionCard 
          currentQuestionData={currentQuestionData} 
          showResult={showResult} 
          selectedAnswer={selectedAnswer}
          isLastQuestion={currentQuestion >= shuffledQuestions.length - 1}
          handleAnswer={handleAnswer} 
          handleSubmit={handleSubmit} 
          handleNext={handleNext} 
        />
        
        <StudyTips />
      </div>
    </div>
  );
}
