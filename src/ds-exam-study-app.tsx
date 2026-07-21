import { useState, useCallback, useRef, useEffect } from 'react';
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
import { ConfirmDialog } from './components/ConfirmDialog';
import { DotField } from './components/DotField';

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
  const [prevSessionKey, setPrevSessionKey] = useState("");
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean, action: (() => void) | null}>({isOpen: false, action: null});

  const { answeredQuestions, addAnsweredQuestion, isLoading } = useAnsweredQuestions();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const categoryStats = useCategoryStats(answeredQuestions, showStats);

  // レンダーフェーズでの同期的State更新（Double Renderの防止）
  const currentSessionKey = isLoading ? "loading" : `${quizSessionId}-${studyMode}-${selectedCategory}`;
  if (prevSessionKey !== currentSessionKey && !isLoading) {
    setPrevSessionKey(currentSessionKey);
    let newFiltered;
    if (studyMode === 'review') {
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
      setShuffledQuestions(shuffleQuestions(newFiltered).map(q => shuffleQuestionOptions(q)));
    } else {
      setShuffledQuestions([]);
    }
  }

  const handleAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const currentQuestionData = shuffledQuestions[currentQuestion];

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null || !currentQuestionData) return;
    
    const isCorrect = selectedAnswer === currentQuestionData.shuffledCorrectIndex;
    if (isCorrect) setScore(prev => prev + 1);
    
    addAnsweredQuestion({
      questionId: currentQuestionData.id,
      correct: isCorrect,
      timestamp: new Date().toISOString()
    });
    
    setShowResult(true);
  }, [selectedAnswer, currentQuestionData, addAnsweredQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowStats(true);
    }
  }, [currentQuestion, shuffledQuestions.length]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowStats(false);
    setQuizSessionId(prev => prev + 1);
  }, []);

  const quizProgressRef = useRef({ currentQuestion, selectedAnswer });
  useEffect(() => {
    quizProgressRef.current = { currentQuestion, selectedAnswer };
  }, [currentQuestion, selectedAnswer]);

  const handleModeSwitch = useCallback((mode: StudyMode, category?: Category) => {
    const action = () => {
      setStudyMode(mode);
      if (category) {
        setSelectedCategory(category);
      }
      resetQuiz();
    };

    const { currentQuestion: cq, selectedAnswer: sa } = quizProgressRef.current;
    if (cq > 0 || sa !== null) {
      setConfirmDialog({ isOpen: true, action });
    } else {
      action();
    }
  }, [resetQuiz]);

  const handleStartReview = useCallback(() => {
    setStudyMode('review');
    resetQuiz();
  }, [resetQuiz]);

  const handleConfirmAction = useCallback(() => {
    setConfirmDialog(prev => {
      if (prev.action) prev.action();
      return { isOpen: false, action: null };
    });
  }, []);

  const handleCancelAction = useCallback(() => {
    setConfirmDialog({ isOpen: false, action: null });
  }, []);

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
        startReview={handleStartReview} 
      />
    );
  }

  // currentQuestionData is already declared above for use in handleSubmit
  if (!currentQuestionData || shuffledQuestions.length === 0) {
    return <NoQuestionsScreen resetQuiz={resetQuiz} setStudyMode={setStudyMode} setSelectedCategory={setSelectedCategory} />;
  }

  return (
    <div className="min-h-screen relative p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotField 
          dotSpacing={24}
          sparkle={true}
          waveAmplitude={1.2}
          glowRadius={280}
          cursorRadius={450}
          gradientFrom={isDarkMode ? 'rgba(56, 189, 248, 0.6)' : 'rgba(30, 58, 138, 0.75)'} 
          gradientTo={isDarkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.75)'}   
          glowColor={isDarkMode ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.4)'}
          glowBlendMode={isDarkMode ? 'screen' : 'normal'}
        />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="rounded-2xl shadow-2xl p-6 mb-6 bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 transition-all duration-300">
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <ModeSelector 
            studyMode={studyMode} 
            selectedCategory={selectedCategory} 
            handleModeSwitch={handleModeSwitch} 
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

      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        message="現在のテストの進捗はリセットされます。別のテストに移動してもよろしいですか？"
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
}
