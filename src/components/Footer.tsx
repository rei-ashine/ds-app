import { memo } from 'react';

export interface FooterProps {
  onNavigate: (view: 'home' | 'terms' | 'privacy') => void;
}

export const Footer = memo(({ onNavigate }: FooterProps) => {
  return (
    <footer className="mt-12 pb-6 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors relative z-10">
      <div className="mb-2 font-medium">
        &copy; 2025-2026, Rei Ashine.
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          aria-label="Navigate to Home"
        >
          Home
        </button>
        <span>|</span>
        <button
          onClick={() => onNavigate('terms')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          aria-label="Navigate to Terms of Service"
        >
          Terms
        </button>
        <span>|</span>
        <button
          onClick={() => onNavigate('privacy')}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
          aria-label="Navigate to Privacy Policy"
        >
          Privacy
        </button>
      </div>
    </footer>
  );
});
