import { memo } from 'react';

export const StudyTips = memo(() => {
  return (
    <div className="mt-6 border rounded-lg p-4 bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:bg-opacity-30 dark:border-yellow-700 transition-colors">
      <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-300">💡 学習のポイント</h4>
      <ul className="text-sm space-y-1 text-yellow-800 dark:text-yellow-200">
        <li>• 本番は100問を100分で解く必要があります（1問1分ペース）</li>
        <li>• 各カテゴリーをバランスよく学習しましょう</li>
        <li>• 間違えた問題は必ず復習して理解を深めましょう</li>
        <li>• 公式リファレンスブックも併用すると効果的です</li>
      </ul>
    </div>
  );
});
