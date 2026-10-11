import { memo } from 'react';
import { StudyMode, Category, CATEGORIES } from '../types';
import { CATEGORY_ICONS } from './categoryIcons';

export interface ModeSelectorProps {
  studyMode: StudyMode;
  selectedCategory: Category;
  handleModeSwitch: (mode: StudyMode, category?: Category) => void;
}

const INACTIVE_MODE_CLASS = 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600';

const MODE_BUTTONS: { mode: StudyMode; label: string; activeClass: string }[] = [
  { mode: 'all', label: '総合テスト', activeClass: 'bg-blue-600 text-white' },
  { mode: 'category', label: '分野別テスト', activeClass: 'bg-blue-600 text-white' },
  { mode: 'review', label: '間違えた問題', activeClass: 'bg-yellow-500 text-white' },
];

export const ModeSelector = memo(({ 
  studyMode, 
  selectedCategory, 
  handleModeSwitch 
}: ModeSelectorProps) => {
  const switchMode = (mode: StudyMode) => {
    if (studyMode === mode) return;
    if (mode === 'all') handleModeSwitch('all', 'all');
    else if (mode === 'category') handleModeSwitch('category', selectedCategory === 'all' ? CATEGORIES[0] : selectedCategory);
    else handleModeSwitch('review');
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        {MODE_BUTTONS.map(({ mode, label, activeClass }) => (
          <button
            key={mode}
            onClick={() => switchMode(mode)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              studyMode === mode ? activeClass : INACTIVE_MODE_CLASS
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[52px] mb-4 flex items-center justify-center">
        {studyMode === 'category' ? (
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(category => {
              const Icon = CATEGORY_ICONS[category];
              return (
                <button
                  key={category}
                  onClick={() => { 
                    if (selectedCategory !== category) handleModeSwitch('category', category);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-colors ${
                    selectedCategory === category
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-300'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {category}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 py-2 px-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-full border border-gray-200/50 dark:border-gray-600/50">
            {studyMode === 'all' ? '全問題からランダムに出題中' : '過去に間違えた問題から再挑戦'}
          </div>
        )}
      </div>
    </>
  );
});
