# 📊 DS検定 対策アプリ (DS Exam Study App)

[![Deploy to GitHub Pages](https://github.com/rei-ashine/ds-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/rei-ashine/ds-app/actions/workflows/deploy.yml)

**DS検定（データサイエンティスト検定 リテラシーレベル）** に対応した無料のクイズ・模擬演習用 Web アプリケーションです。  
データサイエンス力、データエンジニアリング力、ビジネス力の3分野を網羅した全100問の問題演習と復習が行えます。

🌐 **本番Webサイト**: [https://rei-ashine.github.io/ds-app/](https://rei-ashine.github.io/ds-app/)

---

## ✨ 主な機能

- 📚 **全100問の高品質問題データベース**: 分野別（DS / DE / Business）および全問演習
- 🔄 **ランダムシャッフル機能**: 問題順および4択選択肢の配列を毎回自動シャッフル
- 🔁 **間違えた問題の復習モード**: 直近の誤答問題のみをピックアップして効率的に再挑戦
- 📊 **分野別統計グラフ**: 演習結果を分野ごとにパーセンテージ表示
- 🌙 **ダーク/ライトモード対応**: 目の疲労を軽減する快適なデザインテーマ
- 💾 **ローカル保存**: 学習履歴や設定はブラウザ内に自動保存（安全な例外処理付き）

---

## 🛠️ 技術スタック

- **フロントエンド**: React 19, TypeScript, Vite, Tailwind CSS v4
- **アイコン & デザイン**: `lucide-react`, `@theme-toggles/react`, HTML5 Canvas (`DotField`)
- **テスト**: Vitest, React Testing Library, JSDOM
- **CI/CD**: GitHub Actions (GitHub Pages 自動デプロイ)

---

## 🚀 開発・ビルドコマンド

### リポジトリのクローンとセットアップ

```bash
git clone https://github.com/rei-ashine/ds-app.git
cd ds-app
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### テスト実行 (Vitest)

```bash
npm test -- --run
```

### ビルド & 型チェック

```bash
npm run build
```

---

## 📄 ライセンス

MIT License
