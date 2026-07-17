import { StudyMode, Category } from '../types';

export interface NoQuestionsScreenProps {
  resetQuiz: () => void;
  setStudyMode: (m: StudyMode) => void;
  setSelectedCategory: (c: Category) => void;
}

export function NoQuestionsScreen({ resetQuiz, setStudyMode, setSelectedCategory }: NoQuestionsScreenProps) {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full transition-colors">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">問題が見つかりません</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors">
          選択された条件（カテゴリー、または復習モード）に一致する問題がありません。
        </p>
        <button
          onClick={() => {
            setStudyMode('all');
            setSelectedCategory('all');
            resetQuiz();
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          総合テストに戻る
        </button>
      </div>
    </div>
  );
}
