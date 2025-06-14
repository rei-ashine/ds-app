import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, BookOpen, Brain, Wrench, Briefcase, RotateCcw, ChevronRight } from 'lucide-react';
import "@theme-toggles/react/css/Expand.css";
import { Expand } from "@theme-toggles/react";

// 問題データベース
const questions = [
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

export default function DSExamStudyApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [studyMode, setStudyMode] = useState('all'); // all, category, review
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showStats, setShowStats] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ローカルストレージから学習履歴とテーマを読み込み
  useEffect(() => {
    const savedHistory = localStorage.getItem('dsExamHistory');
    if (savedHistory) {
      setAnsweredQuestions(JSON.parse(savedHistory));
    }
    
    const savedTheme = localStorage.getItem('dsExamTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // システムの設定に従う
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // 学習履歴を保存
  useEffect(() => {
    if (answeredQuestions.length > 0) {
      localStorage.setItem('dsExamHistory', JSON.stringify(answeredQuestions));
    }
  }, [answeredQuestions]);

  // テーマを保存
  useEffect(() => {
    localStorage.setItem('dsExamTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredQuestions = () => {
    if (studyMode === 'review') {
      const incorrectIds = answeredQuestions
        .filter(q => !q.correct)
        .map(q => q.questionId);
      return questions.filter(q => incorrectIds.includes(q.id));
    }
    
    if (selectedCategory === 'all') {
      return questions;
    }
    
    return questions.filter(q => q.category === selectedCategory);
  };

  const currentQuestionData = filteredQuestions()[currentQuestion];

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestionData.correct;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // 回答履歴を記録
    const answer = {
      questionId: currentQuestionData.id,
      correct: isCorrect,
      timestamp: new Date().toISOString()
    };
    
    setAnsweredQuestions([...answeredQuestions, answer]);
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions().length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowStats(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowStats(false);
  };

  const getCategoryStats = () => {
    const stats = {
      'データサイエンス力': { correct: 0, total: 0 },
      'データエンジニアリング力': { correct: 0, total: 0 },
      'ビジネス力': { correct: 0, total: 0 }
    };

    answeredQuestions.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        stats[question.category].total++;
        if (answer.correct) {
          stats[question.category].correct++;
        }
      }
    });

    return stats;
  };

  if (showStats) {
    const categoryStats = getCategoryStats();
    const totalQuestions = filteredQuestions().length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-lg shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>学習結果</h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <div className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{score} / {totalQuestions} 問正解</div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>カテゴリ別成績</h3>
              {Object.entries(categoryStats).map(([category, stats]) => {
                const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                const Icon = category === 'データサイエンス力' ? Brain : 
                            category === 'データエンジニアリング力' ? Wrench : Briefcase;
                
                return (
                  <div key={category} className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{category}</span>
                      </div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stats.correct} / {stats.total} 問
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                もう一度挑戦
              </button>
              <button
                onClick={() => {
                  setStudyMode('review');
                  resetQuiz();
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                間違えた問題を復習
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestionData) {
    return (
      <div className={`min-h-screen p-4 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`rounded-lg shadow-md p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>問題がありません</h2>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>選択した条件に該当する問題が見つかりませんでした。</p>
          <button
            onClick={() => {
              setStudyMode('all');
              setSelectedCategory('all');
              resetQuiz();
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            すべての問題に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className={`rounded-lg shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} relative`}>
          {/* ダークモードトグルとGitHubロゴ */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <a 
              href="https://github.com/rei-ashine" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-md hover:bg-opacity-80 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              title="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <Expand 
              duration={750} 
              toggled={isDarkMode} 
              toggle={toggleDarkMode}
              className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            />
          </div>
          
          <h1 className={`text-2xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            DS検定 試験勉強アプリ
          </h1>
          
          {/* 学習モード選択 */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => {
                setStudyMode('all');
                setSelectedCategory('all');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md ${
                studyMode === 'all' && selectedCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              すべての問題
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('データサイエンス力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'データサイエンス力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Brain className="w-4 h-4 mr-1" />
              データサイエンス力
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('データエンジニアリング力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'データエンジニアリング力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Wrench className="w-4 h-4 mr-1" />
              データエンジニアリング力
            </button>
            <button
              onClick={() => {
                setStudyMode('category');
                setSelectedCategory('ビジネス力');
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-md flex items-center ${
                selectedCategory === 'ビジネス力' 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-1" />
              ビジネス力
            </button>
          </div>

          {/* 進捗表示 */}
          <div className={`w-full rounded-full h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / filteredQuestions().length) * 100}%` }}
            ></div>
          </div>
          <div className={`text-center mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            問題 {currentQuestion + 1} / {filteredQuestions().length}
          </div>
        </div>

        {/* 問題カード */}
        <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* カテゴリと難易度 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                {currentQuestionData.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                currentQuestionData.difficulty === '基礎' 
                  ? isDarkMode 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-green-100 text-green-800'
                  : isDarkMode 
                    ? 'bg-orange-900 text-orange-300' 
                    : 'bg-orange-100 text-orange-800'
              }`}>
                {currentQuestionData.difficulty}
              </span>
            </div>
          </div>

          {/* 問題文 */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-4 whitespace-pre-line ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestionData.question}
            </h3>
          </div>

          {/* 選択肢 */}
          <div className="space-y-3 mb-6">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? index === currentQuestionData.correct
                      ? isDarkMode 
                        ? 'border-green-500 bg-green-900 bg-opacity-30'
                        : 'border-green-500 bg-green-50'
                      : index === selectedAnswer
                      ? isDarkMode 
                        ? 'border-red-500 bg-red-900 bg-opacity-30'
                        : 'border-red-500 bg-red-50'
                      : isDarkMode 
                        ? 'border-gray-600'
                        : 'border-gray-200'
                    : selectedAnswer === index
                    ? isDarkMode 
                      ? 'border-blue-500 bg-blue-900 bg-opacity-30'
                      : 'border-blue-500 bg-blue-50'
                    : isDarkMode 
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{option}</span>
                  {showResult && (
                    index === currentQuestionData.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : index === selectedAnswer ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* 解説 */}
          {showResult && (
            <div className={`border rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-blue-900 bg-opacity-30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start">
                <BookOpen className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>解説</h4>
                  <p className={isDarkMode ? 'text-blue-200' : 'text-blue-800'}>{currentQuestionData.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex justify-center">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-md font-medium ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                回答する
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center"
              >
                {currentQuestion < filteredQuestions().length - 1 ? (
                  <>
                    次の問題へ
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  '結果を見る'
                )}
              </button>
            )}
          </div>
        </div>

        {/* 学習のヒント */}
        <div className={`mt-6 border rounded-lg p-4 ${isDarkMode ? 'bg-yellow-900 bg-opacity-30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
          <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-900'}`}>💡 学習のポイント</h4>
          <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
            <li>• 本番は100問を100分で解く必要があります（1問1分ペース）</li>
            <li>• 各カテゴリーをバランスよく学習しましょう</li>
            <li>• 間違えた問題は必ず復習して理解を深めましょう</li>
            <li>• 公式リファレンスブックも併用すると効果的です</li>
          </ul>
        </div>
      </div>
    </div>
  );
}