import { Brain, Wrench, Briefcase } from 'lucide-react';
import { StudyMode, Category } from '../types';

export interface ModeSelectorProps {
  studyMode: StudyMode;
  selectedCategory: Category;
  setStudyMode: (m: StudyMode) => void;
  setSelectedCategory: (c: Category) => void;
  resetQuiz: () => void;
}

export function ModeSelector({ 
  studyMode, 
  selectedCategory, 
  setStudyMode, 
  setSelectedCategory, 
  resetQuiz 
}: ModeSelectorProps) {
  return (
    <>
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <button
          onClick={() => { setStudyMode('all'); setSelectedCategory('all'); resetQuiz(); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            studyMode === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          総合テスト
        </button>
        <button
          onClick={() => { setStudyMode('category'); resetQuiz(); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            studyMode === 'category' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          分野別テスト
        </button>
        <button
          onClick={() => { setStudyMode('review'); resetQuiz(); }}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            studyMode === 'review' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          間違えた問題
        </button>
      </div>

      {studyMode === 'category' && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(['データサイエンス力', 'データエンジニアリング力', 'ビジネス力'] as Category[]).map(category => (
            <button
              key={category}
              onClick={() => { setSelectedCategory(category); resetQuiz(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
                selectedCategory === category
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-700'
              }`}
            >
              {category === 'データサイエンス力' && <Brain size={18} />}
              {category === 'データエンジニアリング力' && <Wrench size={18} />}
              {category === 'ビジネス力' && <Briefcase size={18} />}
              {category}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
