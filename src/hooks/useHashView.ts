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

export function viewFromHash(hash: string): View {
  const lower = hash.toLowerCase();
  if (lower === VIEW_META.terms.hash) return 'terms';
  if (lower === VIEW_META.privacy.hash) return 'privacy';
  return 'home';
}

/** URLハッシュと表示中の画面を同期し、ドキュメントタイトルの更新と GTM 仮想ページビュー計測を行う */
export function useHashView() {
  // 初回レンダーから URL の画面を使い、直リンク時にホームのページビューが送られないようにする
  const [activeView, setActiveView] = useState<View>(() => viewFromHash(window.location.hash));

  useEffect(() => {
    const syncWithLocation = () => setActiveView(viewFromHash(window.location.hash));

    // ホームへの遷移は pushState で行うため、履歴移動は popstate でも拾う
    window.addEventListener('hashchange', syncWithLocation);
    window.addEventListener('popstate', syncWithLocation);
    return () => {
      window.removeEventListener('hashchange', syncWithLocation);
      window.removeEventListener('popstate', syncWithLocation);
    };
  }, []);

  useEffect(() => {
    const { hash, title } = VIEW_META[activeView];
    document.title = title;

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: title,
        page_path: `${window.location.pathname}${hash}`
      });
    }
  }, [activeView]);

  const navigate = useCallback((view: View) => {
    if (view === 'home') {
      // location.hash = '' では URL 末尾に '#' が残るため、ハッシュを除いた URL を履歴に積む
      if (window.location.hash) {
        window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
      }
      setActiveView('home');
    } else {
      window.location.hash = VIEW_META[view].hash;
    }
  }, []);

  return { activeView, navigate };
}
