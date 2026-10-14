import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useHashView, viewFromHash } from '../useHashView';

describe('viewFromHash', () => {
  it('maps known hashes case-insensitively', () => {
    expect(viewFromHash('#terms')).toBe('terms');
    expect(viewFromHash('#PRIVACY')).toBe('privacy');
  });

  it('maps empty and unknown hashes to home', () => {
    expect(viewFromHash('')).toBe('home');
    expect(viewFromHash('#unknown')).toBe('home');
  });
});

describe('useHashView', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/ds-app/');
    window.dataLayer = [];
  });

  afterEach(() => {
    delete window.dataLayer;
  });

  it('uses the view from the URL on the first render without a home page_view', () => {
    window.history.replaceState(null, '', '/ds-app/#terms');

    const { result } = renderHook(() => useHashView());

    expect(result.current.activeView).toBe('terms');
    expect(document.title).toBe('Terms of Service | DS Exam Study App');
    expect(window.dataLayer).toEqual([
      { event: 'page_view', page_title: 'Terms of Service | DS Exam Study App', page_path: '/ds-app/#terms' }
    ]);
  });

  it('navigates to a sub page through the hash', async () => {
    const { result } = renderHook(() => useHashView());

    act(() => result.current.navigate('privacy'));

    await waitFor(() => expect(result.current.activeView).toBe('privacy'));
    expect(window.location.hash).toBe('#privacy');
    expect(document.title).toBe('Privacy Policy | DS Exam Study App');
  });

  it('navigates home by removing the hash without leaving a trailing #', () => {
    window.history.replaceState(null, '', '/ds-app/#terms');
    const { result } = renderHook(() => useHashView());

    act(() => result.current.navigate('home'));

    expect(result.current.activeView).toBe('home');
    expect(window.location.href).toBe(`${window.location.origin}/ds-app/`);
    expect(document.title).toBe('DS検定 対策アプリ');
  });

  it('stays home when navigating home with an empty hash', () => {
    const { result } = renderHook(() => useHashView());
    const historyLength = window.history.length;

    act(() => result.current.navigate('home'));

    expect(result.current.activeView).toBe('home');
    expect(window.history.length).toBe(historyLength);
  });

  it('follows hash changes made outside the app', async () => {
    const { result } = renderHook(() => useHashView());

    act(() => {
      window.location.hash = '#terms';
    });

    await waitFor(() => expect(result.current.activeView).toBe('terms'));
  });
});
