import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeSelector } from '../ModeSelector';

describe('ModeSelector Component', () => {
  const defaultProps = {
    studyMode: 'all' as const,
    selectedCategory: 'all' as const,
    handleModeSwitch: vi.fn(),
  };

  it('renders mode switch buttons correctly', () => {
    render(<ModeSelector {...defaultProps} />);

    expect(screen.getByRole('button', { name: '総合テスト' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '分野別テスト' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '間違えた問題' })).toBeInTheDocument();
  });

  it('maintains fixed min-h-[52px] container class across all study modes', () => {
    const { container: containerAll } = render(<ModeSelector {...defaultProps} studyMode="all" />);
    const subContainerAll = containerAll.querySelector('.min-h-\\[52px\\]');
    expect(subContainerAll).not.toBeNull();

    const { container: containerCategory } = render(<ModeSelector {...defaultProps} studyMode="category" />);
    const subContainerCategory = containerCategory.querySelector('.min-h-\\[52px\\]');
    expect(subContainerCategory).not.toBeNull();

    const { container: containerReview } = render(<ModeSelector {...defaultProps} studyMode="review" />);
    const subContainerReview = containerReview.querySelector('.min-h-\\[52px\\]');
    expect(subContainerReview).not.toBeNull();
  });

  it('calls handleModeSwitch when mode buttons are clicked', () => {
    const handleModeSwitch = vi.fn();
    render(<ModeSelector {...defaultProps} handleModeSwitch={handleModeSwitch} />);

    const categoryBtn = screen.getByRole('button', { name: '分野別テスト' });
    fireEvent.click(categoryBtn);

    expect(handleModeSwitch).toHaveBeenCalledWith('category', 'データサイエンス力');
  });

  it('renders category pills when studyMode is category', () => {
    render(<ModeSelector {...defaultProps} studyMode="category" selectedCategory="データサイエンス力" />);

    expect(screen.getByRole('button', { name: /データサイエンス力/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /データエンジニアリング力/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ビジネス力/i })).toBeInTheDocument();
  });
});
