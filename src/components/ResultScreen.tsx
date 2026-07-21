import { memo } from 'react';
import { Brain, Wrench, Briefcase, RotateCcw } from 'lucide-react';

export interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  categoryStats: Record<string, { total: number; correct: number }>;
  resetQuiz: () => void;
  startReview: () => void;
}

export const ResultScreen = memo(({
  score,
  totalQuestions,
  categoryStats,
  resetQuiz,
  startReview
}: ResultScreenProps) => {
  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-md p-8 bg-white dark:bg-gray-800 transition-colors">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white transition-colors">学習結果</h2>
          
          <div className="text-center mb-12">
            <div className="text-6xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              {Math.round((score / totalQuestions) * 100)}点
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
              {totalQuestions}問中 {score}問 正解
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 transition-colors">分野別正答率</h3>
            {Object.entries(categoryStats).map(([category, stats]) => {
              const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              const Icon = category === 'データサイエンス力' ? Brain : 
                          category === 'データエンジニアリング力' ? Wrench : Briefcase;
              
              return (
                <div key={category} className="bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 p-4 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                      <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                      {category}
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
                  </div>
                  <div className="w-full rounded-full h-2.5 bg-gray-200 dark:bg-gray-600 transition-colors">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {stats.correct} / {stats.total}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={20} /> もう一度学習する
            </button>
            <button
              onClick={startReview}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              間違えた問題を復習
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
