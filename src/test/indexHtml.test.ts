import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { questions } from '../questions';

// クローラー向けに index.html へ手書きしている静的コンテンツが、アプリの実装とずれていないことを検証する
const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf-8');
const root = html.slice(html.indexOf('<div id="root">'), html.indexOf('<script type="module"'));

describe('index.html の静的コンテンツ', () => {
  it('問題データに存在する全カテゴリを記載している', () => {
    const categories = [...new Set(questions.map(q => q.category))];
    expect(categories.length).toBeGreaterThan(0);
    for (const category of categories) {
      expect(root).toContain(category);
    }
  });

  it('「読み込み中」などの未完成を示す文言を含まない', () => {
    expect(root).not.toContain('読み込み中');
  });

  it('見出し（h1）がアプリのタイトルと一致する', () => {
    expect(root).toContain('<h1>DS検定 対策アプリ</h1>');
  });
});
