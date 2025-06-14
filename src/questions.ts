// DS検定問題データベース

export interface Question {
  id: number;
  category: 'データサイエンス力' | 'データエンジニアリング力' | 'ビジネス力';
  difficulty: '基礎' | '応用';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const questions: Question[] = [
  // データサイエンス力
  {
    id: 1,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '以下のデータセットの中央値（メディアン）はどれか。\nデータ: 2, 4, 6, 8, 10, 12, 14',
    options: ['6', '8', '7', '10'],
    correct: 1,
    explanation: '中央値は、データを小さい順に並べたときの真ん中の値です。7個のデータなので、4番目の値である8が中央値となります。'
  },
  {
    id: 2,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '正規分布において、平均値±1標準偏差の範囲に含まれるデータの割合は約何%か。',
    options: ['50%', '68%', '95%', '99%'],
    correct: 1,
    explanation: '正規分布では、平均値±1標準偏差の範囲に約68%のデータが含まれます。±2標準偏差では約95%、±3標準偏差では約99.7%となります。'
  },
  {
    id: 3,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '相関係数が-0.8の場合、どのような関係性を示しているか。',
    options: ['強い正の相関', '弱い正の相関', '強い負の相関', '相関なし'],
    correct: 2,
    explanation: '相関係数が-0.8は強い負の相関を示します。-1に近いほど強い負の相関、1に近いほど強い正の相関、0に近いほど相関が弱いことを表します。'
  },
  {
    id: 4,
    category: 'データサイエンス力',
    difficulty: '応用',
    question: '帰無仮説を棄却する際の有意水準として、一般的に使用される値はどれか。',
    options: ['0.01', '0.05', '0.10', '0.50'],
    correct: 1,
    explanation: '統計的仮説検定では、一般的に有意水準α=0.05（5%）が使用されます。これは、帰無仮説が正しいときに誤って棄却する確率を5%以下に抑えることを意味します。'
  },
  {
    id: 5,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '標準偏差と分散の関係について正しいものはどれか。',
    options: ['標準偏差 = 分散の2乗', '標準偏差 = 分散の平方根', '標準偏差 = 分散 × 2', '標準偏差 = 分散 ÷ 2'],
    correct: 1,
    explanation: '標準偏差は分散の平方根です。分散は各データと平均値の差の2乗の平均で、標準偏差はその平方根を取ることで元のデータと同じ単位になります。'
  },

  // データエンジニアリング力
  {
    id: 6,
    category: 'データエンジニアリング力',
    difficulty: '基礎',
    question: 'SQLで重複を除いて値を取得するために使用するキーワードはどれか。',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'],
    correct: 1,
    explanation: 'SQLでは、SELECT文でDISTINCTキーワードを使用することで、重複する値を除いて一意の値のみを取得できます。例：SELECT DISTINCT column_name FROM table_name'
  },
  {
    id: 7,
    category: 'データエンジニアリング力',
    difficulty: '基礎',
    question: 'データベースの正規化の目的として適切でないものはどれか。',
    options: ['データの冗長性を排除する', 'データの整合性を保つ', 'クエリの実行速度を必ず向上させる', '更新時の異常を防ぐ'],
    correct: 2,
    explanation: '正規化は冗長性の排除や整合性の維持には役立ちますが、必ずしもクエリ速度を向上させるわけではありません。むしろ、過度な正規化はJOINが増えて速度が低下する場合があります。'
  },
  {
    id: 8,
    category: 'データエンジニアリング力',
    difficulty: '応用',
    question: 'Pythonでデータ分析によく使用されるライブラリの組み合わせとして適切なものはどれか。',
    options: ['NumPy, Pandas, Matplotlib', 'React, Vue, Angular', 'Spring, Hibernate, JPA', 'Express, MongoDB, Node.js'],
    correct: 0,
    explanation: 'Pythonのデータ分析では、NumPy（数値計算）、Pandas（データ操作）、Matplotlib（可視化）が標準的なライブラリとして使用されます。'
  },
  {
    id: 9,
    category: 'データエンジニアリング力',
    difficulty: '基礎',
    question: 'CSVファイルの特徴として正しいものはどれか。',
    options: ['バイナリ形式である', 'カンマで区切られたテキスト形式である', '画像データの保存に適している', 'XMLベースの形式である'],
    correct: 1,
    explanation: 'CSV（Comma-Separated Values）は、カンマで区切られたテキスト形式のファイルです。シンプルで汎用性が高く、多くのアプリケーションで読み書きが可能です。'
  },
  {
    id: 10,
    category: 'データエンジニアリング力',
    difficulty: '応用',
    question: 'ビッグデータの3つのV（Volume, Velocity, Variety）のうち、Varietyが示すものは何か。',
    options: ['データの量', 'データの速度', 'データの多様性', 'データの価値'],
    correct: 2,
    explanation: 'Varietyはデータの多様性を示します。構造化データ、非構造化データ、半構造化データなど、様々な形式のデータを扱うことを意味します。'
  },

  // ビジネス力
  {
    id: 11,
    category: 'ビジネス力',
    difficulty: '基礎',
    question: 'データ分析プロジェクトのPDCAサイクルで、最初に行うべきフェーズはどれか。',
    options: ['Do（実行）', 'Check（評価）', 'Act（改善）', 'Plan（計画）'],
    correct: 3,
    explanation: 'PDCAサイクルは、Plan（計画）→Do（実行）→Check（評価）→Act（改善）の順で進めます。まず計画を立てることから始めます。'
  },
  {
    id: 12,
    category: 'ビジネス力',
    difficulty: '基礎',
    question: 'データ分析の結果を経営層に報告する際、最も重要なことは何か。',
    options: ['技術的な詳細を全て説明する', 'ビジネスインパクトを明確に示す', '使用したアルゴリズムを詳しく説明する', 'プログラムコードを見せる'],
    correct: 1,
    explanation: '経営層への報告では、技術的な詳細よりも、分析結果がビジネスにどのような影響を与えるか（売上向上、コスト削減など）を明確に示すことが重要です。'
  },
  {
    id: 13,
    category: 'ビジネス力',
    difficulty: '応用',
    question: 'A/Bテストを実施する際の注意点として適切でないものはどれか。',
    options: ['サンプルサイズを十分に確保する', '同時期に複数の要素を変更する', '統計的有意性を確認する', 'ランダムに振り分ける'],
    correct: 1,
    explanation: 'A/Bテストでは、一度に一つの要素のみを変更すべきです。複数の要素を同時に変更すると、どの要素が結果に影響したかが分からなくなります。'
  },
  {
    id: 14,
    category: 'ビジネス力',
    difficulty: '基礎',
    question: 'KPI（Key Performance Indicator）の特徴として適切なものはどれか。',
    options: ['定性的であるべき', '測定可能である', '曖昧である方が良い', '長期的な目標のみを示す'],
    correct: 1,
    explanation: 'KPIは測定可能（Measurable）であることが重要です。具体的な数値で表現でき、定期的に測定・評価できる指標である必要があります。'
  },
  {
    id: 15,
    category: 'ビジネス力',
    difficulty: '応用',
    question: 'レコメンドシステムの導入効果として期待できないものはどれか。',
    options: ['顧客満足度の向上', 'クロスセル・アップセルの促進', '在庫の完全な削減', '購買率の向上'],
    correct: 2,
    explanation: 'レコメンドシステムは顧客満足度向上や売上増加には貢献しますが、在庫を完全になくすことはできません。むしろ、人気商品の在庫切れリスクが高まる可能性があります。'
  },

  // 追加問題
  {
    id: 16,
    category: 'データサイエンス力',
    difficulty: '応用',
    question: '機械学習における過学習（オーバーフィッティング）を防ぐ方法として適切でないものはどれか。',
    options: ['訓練データを増やす', '正則化を行う', '特徴量を増やし続ける', '交差検証を行う'],
    correct: 2,
    explanation: '特徴量を増やし続けると、モデルが複雑になりすぎて過学習のリスクが高まります。過学習を防ぐには、データ量を増やす、正則化、交差検証などが有効です。'
  },
  {
    id: 17,
    category: 'データエンジニアリング力',
    difficulty: '応用',
    question: 'NoSQLデータベースの特徴として正しいものはどれか。',
    options: ['必ずACID特性を保証する', 'スキーマが柔軟である', 'SQLのみでアクセス可能', '結合処理が得意である'],
    correct: 1,
    explanation: 'NoSQLデータベースはスキーマが柔軟で、非構造化データや半構造化データの扱いに適しています。必ずしもACID特性を保証せず、結合処理は苦手な場合が多いです。'
  },
  {
    id: 18,
    category: 'ビジネス力',
    difficulty: '応用',
    question: 'データドリブンな意思決定を組織に定着させるために最も重要なことは何か。',
    options: ['最新のツールを導入する', 'データサイエンティストを大量採用する', '経営層の理解とコミットメント', 'すべての業務をデジタル化する'],
    correct: 2,
    explanation: 'データドリブンな文化を定着させるには、経営層の理解とコミットメントが不可欠です。トップダウンでの推進がなければ、組織全体の変革は困難です。'
  },
  {
    id: 19,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '箱ひげ図（ボックスプロット）で表示される情報として含まれないものはどれか。',
    options: ['中央値', '平均値', '四分位数', '外れ値'],
    correct: 1,
    explanation: '箱ひげ図は、中央値、四分位数（第1四分位数、第3四分位数）、外れ値を表示しますが、平均値は表示されません。'
  },
  {
    id: 20,
    category: 'データエンジニアリング力',
    difficulty: '基礎',
    question: 'ETLプロセスの順序として正しいものはどれか。',
    options: ['Transform → Extract → Load', 'Extract → Transform → Load', 'Load → Extract → Transform', 'Extract → Load → Transform'],
    correct: 1,
    explanation: 'ETLは Extract（抽出）→ Transform（変換）→ Load（格納）の順で実行されます。まずデータを抽出し、必要な形式に変換してから、目的のデータベースに格納します。'
  }
];