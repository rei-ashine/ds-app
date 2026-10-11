import { useState, useEffect, useCallback } from 'react';
import { View } from '../types';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const VIEW_META: Record<View, { hash: string; title: string }> = {
  home: { hash: '', title: 'DS検定 対策アプリ' },
  terms: { hash: '#terms', title: 'Terms of Service | DS Exam Study App' },
  privacy: { hash: '#privacy', title: 'Privacy Policy | DS Exam Study App' },
};

function viewFromHash(hash: string): View {
  const lower = hash.toLowerCase();
  if (lower === VIEW_META.terms.hash) return 'terms';
  if (lower === VIEW_META.privacy.hash) return 'privacy';
  return 'home';
}

/** URLハッシュと表示中の画面を同期し、ドキュメントタイトルの更新と GTM 仮想ページビュー計測を行う */
export function useHashView() {
  const [activeView, setActiveView] = useState<View>('home');

  useEffect(() => {
    const handleHashChange = () => setActiveView(viewFromHash(window.location.hash));

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const { hash, title } = VIEW_META[activeView];
    document.title = title;

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title,
        page_path: `/${hash}`
      });
    }
  }, [activeView]);

  const navigate = useCallback((view: View) => {
    window.location.hash = VIEW_META[view].hash;
    // ハッシュが既に空の場合は hashchange が発火しないため、ホームへの遷移は直接反映する
    if (view === 'home' && window.location.hash === '') setActiveView('home');
  }, []);

  return { activeView, navigate };
}
