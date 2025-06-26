import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, BookOpen, Brain, Wrench, Briefcase, RotateCcw, ChevronRight } from 'lucide-react';
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";
import { StudyMode, Category } from './types';
import { useAnsweredQuestions, useTheme } from './hooks/useLocalStorage';
import { useFilteredQuestions } from './hooks/useFilteredQuestions';
import { useCategoryStats } from './hooks/useCategoryStats';
import { LoadingSpinner } from './components/LoadingSpinner';
import { shuffleQuestionOptions, ShuffledQuestion } from './utils/shuffleOptions';


export default function DSExamStudyApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [studyMode, setStudyMode] = useState<StudyMode>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showStats, setShowStats] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  
  const { answeredQuestions, addAnsweredQuestion, isLoading } = useAnsweredQuestions();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const filteredQuestions = useFilteredQuestions(studyMode, selectedCategory, answeredQuestions);
  const categoryStats = useCategoryStats(answeredQuestions);

  // Shuffle questions when filtered questions change
  useEffect(() => {
    const shuffled = filteredQuestions.map(shuffleQuestionOptions);
    setShuffledQuestions(shuffled);
    // Reset current question when questions change
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  }, [filteredQuestions]);

  const currentQuestionData = shuffledQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestionData) return;
    
    const isCorrect = selectedAnswer === currentQuestionData.shuffledCorrectIndex;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    // 回答履歴を記録
    if (selectedAnswer !== null && currentQuestionData) {
      const isCorrect = selectedAnswer === currentQuestionData.shuffledCorrectIndex;
      const answer = {
        questionId: currentQuestionData.id,
        correct: isCorrect,
        timestamp: new Date().toISOString()
      };
      addAnsweredQuestion(answer);
    }

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
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (showStats) {
    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-lg shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>学習結果</h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{score} / {totalQuestions} 問正解</div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>カテゴリ別成績</h3>
              {Object.entries(categoryStats).map(([category, stats]) => {
                const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                const Icon = category === 'データサイエンス力' ? Brain : 
                            category === 'データエンジニアリング力' ? Wrench : Briefcase;
                
                return (
                  <div key={category} className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category}</span>
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stats.correct} / {stats.total} 問
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                もう一度挑戦
              </button>
              <button
                onClick={() => {
                  setStudyMode('review');
                  resetQuiz();
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                間違えた問題を復習
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestionData || shuffledQuestions.length === 0) {
    return (
      <div className={`min-h-screen p-4 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`rounded-lg shadow-md p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>問題がありません</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>選択した条件に該当する問題が見つかりませんでした。</p>
          <button
            onClick={() => {
              setStudyMode('all');
              setSelectedCategory('all');
              resetQuiz();
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            すべての問題に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* ヘッダー上部 - ダークモードトグルとGitHubロゴ */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
            <a 
              href="https://github.com/rei-ashine" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-md hover:bg-opacity-80 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title="GitHub"
              aria-label="View source code on GitHub"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <Expand 
              duration={750} 
              toggled={isDarkMode} 
              toggle={toggleDarkMode}
              className={`p-2 rounded-md hover:bg-opacity-80 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontSize: '1.9rem' }}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              placeholder=""
            />
            </div>
          </div>
          
          <h1 className={`text-2xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            DS検定 試験勉強アプリ
          </h1>
          
          {/* 学習モード選択 */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => {
                setStudyMode('all');
                setSelectedCategory('all');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md ${
                studyMode === 'all' && selectedCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              すべての問題
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('データサイエンス力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'データサイエンス力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Brain className="w-4 h-4 mr-1" />
              データサイエンス力
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('データエンジニアリング力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'データエンジニアリング力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Wrench className="w-4 h-4 mr-1" />
              データエンジニアリング力
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('ビジネス力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'ビジネス力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-1" />
              ビジネス力
            </button>
          </div>

          {/* 進捗表示 */}
          <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className={`text-center mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            問題 {currentQuestion + 1} / {shuffledQuestions.length}
          </div>
        </div>

        {/* 問題カード */}
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* カテゴリと難易度 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                {currentQuestionData.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                currentQuestionData.difficulty === '基礎' 
                  ? isDarkMode 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-green-100 text-green-800'
                  : isDarkMode 
                    ? 'bg-orange-900 text-orange-300' 
                    : 'bg-orange-100 text-orange-800'
              }`}>
                {currentQuestionData.difficulty}
              </span>
            </div>
          </div>

          {/* 問題文 */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-4 whitespace-pre-line ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestionData.question}
            </h3>
          </div>

          {/* 選択肢 */}
          <div className="space-y-3 mb-6">
            {currentQuestionData?.shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? index === currentQuestionData.shuffledCorrectIndex
                      ? isDarkMode 
                        ? 'border-green-500 bg-green-900 bg-opacity-30'
                        : 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? isDarkMode 
                        ? 'border-red-500 bg-red-900 bg-opacity-30'
                        : 'border-red-500 bg-red-50'
                      : isDarkMode 
                        ? 'border-gray-600'
                        : 'border-gray-200'
                    : selectedAnswer === index
                    ? isDarkMode 
                      ? 'border-blue-500 bg-blue-900 bg-opacity-30'
                      : 'border-blue-500 bg-blue-50'
                    : isDarkMode 
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{option}</span>
                  {showResult && (
                    index === currentQuestionData.shuffledCorrectIndex ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : index === selectedAnswer ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* 解説 */}
          {showResult && (
            <div className={`border rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start">
                <BookOpen className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>解説</h4>
                  <p className={isDarkMode ? 'text-blue-200' : 'text-blue-800'}>{currentQuestionData.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex justify-center">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-md font-medium ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                回答する
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center"
              >
                {currentQuestion < filteredQuestions.length - 1 ? (
                  <>
                    次の問題へ
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  '結果を見る'
                )}
              </button>
            )}
          </div>
        </div>

        {/* 学習のヒント */}
        <div className={`mt-6 border rounded-lg p-4 ${isDarkMode ? 'bg-yellow-900 bg-opacity-30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>💡 学習のポイント</h4>
          <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
            <li>• 本番は100問を100分で解く必要があります（1問1分ペース）</li>
            <li>• 各カテゴリーをバランスよく学習しましょう</li>
            <li>• 間違えた問題は必ず復習して理解を深めましょう</li>
            <li>• 公式リファレンスブックも併用すると効果的です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
