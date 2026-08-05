import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionCard } from '../QuestionCard';
import { ShuffledQuestion } from '../../utils/shuffleOptions';

describe('QuestionCard Component', () => {
  const mockQuestion: ShuffledQuestion = {
    id: 1,
    category: 'データサイエンス力',
    difficulty: '基礎',
    question: '生成モデルと識別モデルの違いについて正しい説明はどれか。',
    options: ['生成モデルはデータの分類のみを行う', '識別モデルは新しいデータを生成できる', '生成モデルはデータの分布を学習し新しいデータを生成できる', '両者に違いはない'],
    correct: 2,
    explanation: '生成モデルはデータの分布を学習し、その分布から新しいデータを生成できます。',
    shuffledOptions: ['生成モデルはデータの分類のみを行う', '識別モデルは新しいデータを生成できる', '生成モデルはデータの分布を学習し新しいデータを生成できる', '両者に違いはない'],
    shuffledCorrectIndex: 2,
  };

  const defaultProps = {
    currentQuestionData: mockQuestion,
    showResult: false,
    selectedAnswer: null,
    isLastQuestion: false,
    handleAnswer: vi.fn(),
    handleSubmit: vi.fn(),
    handleNext: vi.fn(),
  };

  it('renders category, question text, and all options correctly', () => {
    render(<QuestionCard {...defaultProps} />);

    expect(screen.getByText('データサイエンス力')).toBeInTheDocument();
    expect(screen.getByText('生成モデルと識別モデルの違いについて正しい説明はどれか。')).toBeInTheDocument();
    expect(screen.getByText('生成モデルはデータの分類のみを行う')).toBeInTheDocument();
    expect(screen.getByText('両者に違いはない')).toBeInTheDocument();
  });

  it('disables submit button when no option is selected', () => {
    render(<QuestionCard {...defaultProps} selectedAnswer={null} />);
    const submitBtn = screen.getByRole('button', { name: /解答する/i });
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button and calls handleAnswer when option is clicked', () => {
    const handleAnswer = vi.fn();
    render(<QuestionCard {...defaultProps} handleAnswer={handleAnswer} />);

    const optionBtn = screen.getByText('生成モデルはデータの分類のみを行う');
    fireEvent.click(optionBtn);

    expect(handleAnswer).toHaveBeenCalledWith(0);
  });

  it('calls handleSubmit when submit button is clicked', () => {
    const handleSubmit = vi.fn();
    render(<QuestionCard {...defaultProps} selectedAnswer={1} handleSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /解答する/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('shows explanation with scroll container and next button when showResult is true', () => {
    const handleNext = vi.fn();
    const { container } = render(
      <QuestionCard
        {...defaultProps}
        showResult={true}
        selectedAnswer={2}
        handleNext={handleNext}
      />
    );

    expect(screen.getByText('解説')).toBeInTheDocument();
    expect(
      screen.getByText('生成モデルはデータの分布を学習し、その分布から新しいデータを生成できます。')
    ).toBeInTheDocument();

    const explanationContainer = container.querySelector('.max-h-\\[160px\\]');
    expect(explanationContainer).not.toBeNull();
    expect(explanationContainer?.className).toContain('overflow-y-auto');

    const nextBtn = screen.getByRole('button', { name: /次の問題へ/i });
    fireEvent.click(nextBtn);
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it('shows "結果を見る" text on the last question when showResult is true', () => {
    render(
      <QuestionCard
        {...defaultProps}
        showResult={true}
        selectedAnswer={2}
        isLastQuestion={true}
      />
    );

    expect(screen.getByRole('button', { name: /結果を見る/i })).toBeInTheDocument();
  });

  it('applies fixed height layout classes (md:h-[480px] overflow-hidden) to prevent layout shift', () => {
    const { container } = render(<QuestionCard {...defaultProps} />);
    const cardDiv = container.firstChild as HTMLElement;

    expect(cardDiv.className).toContain('md:h-[480px]');
    expect(cardDiv.className).toContain('overflow-hidden');
    expect(cardDiv.className).toContain('flex flex-col justify-between');
  });
});
