import { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = memo(({ isOpen, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">確認</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 ml-2">
          {message}
        </p>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel} 
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            キャンセル
          </button>
          <button 
            onClick={onConfirm} 
            className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors font-medium shadow-sm"
          >
            移動する
          </button>
        </div>
      </div>
    </div>
  );
});
