import { CheckCircle, XCircle, BookOpen, ChevronRight } from 'lucide-react';
import { ShuffledQuestion } from '../utils/shuffleOptions';

export interface QuestionCardProps {
  currentQuestionData: ShuffledQuestion;
  showResult: boolean;
  selectedAnswer: number | null;
  isLastQuestion: boolean;
  handleAnswer: (index: number) => void;
  handleSubmit: () => void;
  handleNext: () => void;
}

export function QuestionCard({
  currentQuestionData,
  showResult,
  selectedAnswer,
  isLastQuestion,
  handleAnswer,
  handleSubmit,
  handleNext
}: QuestionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-40 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold mb-3 transition-colors">
          {currentQuestionData.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
          {currentQuestionData.question}
        </h3>
      </div>

      <div className="space-y-3">
        {currentQuestionData.shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              showResult
                ? index === currentQuestionData.shuffledCorrectIndex
                  ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:bg-opacity-30 dark:border-green-500'
                  : index === selectedAnswer
                  ? 'border-red-500 bg-red-50 dark:bg-red-900 dark:bg-opacity-30 dark:border-red-500'
                  : 'border-gray-200 dark:border-gray-700'
                : selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 dark:border-blue-500'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-gray-800 dark:text-gray-200 ${
                showResult && index === currentQuestionData.shuffledCorrectIndex ? 'font-bold' : ''
              }`}>
                {option}
              </span>
              {showResult && index === currentQuestionData.shuffledCorrectIndex && (
                <CheckCircle className="text-green-500" />
              )}
              {showResult && index === selectedAnswer && index !== currentQuestionData.shuffledCorrectIndex && (
                <XCircle className="text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors ${
              selectedAnswer !== null
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            }`}
          >
            解答する <CheckCircle size={20} />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg flex items-center gap-2 transition-colors"
          >
            {isLastQuestion ? '結果を見る' : '次の問題へ'} <ChevronRight size={20} />
          </button>
        )}
      </div>

      {showResult && (
        <div className={`mt-6 p-4 rounded-lg border transition-colors ${
          selectedAnswer === currentQuestionData.shuffledCorrectIndex 
            ? 'bg-green-50 border-green-200 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-900 dark:bg-opacity-20 dark:border-red-800'
        }`}>
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <BookOpen size={20} className={
              selectedAnswer === currentQuestionData.shuffledCorrectIndex 
                ? "text-green-600 dark:text-green-400" 
                : "text-red-600 dark:text-red-400"
            } />
            <span className={
              selectedAnswer === currentQuestionData.shuffledCorrectIndex 
                ? "text-green-800 dark:text-green-300" 
                : "text-red-800 dark:text-red-300"
            }>解説</span>
          </h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentQuestionData.explanation}</p>
        </div>
      )}
    </div>
  );
}
