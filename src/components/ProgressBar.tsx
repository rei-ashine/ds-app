export interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function ProgressBar({ currentQuestionIndex, totalQuestions }: ProgressBarProps) {
  return (
    <>
      <div className="w-full rounded-full h-2.5 bg-gray-200 dark:bg-gray-700 transition-colors">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400 transition-colors">
        問題 {currentQuestionIndex + 1} / {totalQuestions}
      </div>
    </>
  );
}
