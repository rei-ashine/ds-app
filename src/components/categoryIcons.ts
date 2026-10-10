import { Brain, Wrench, Briefcase, type LucideIcon } from 'lucide-react';
import { QuestionCategory } from '../types';

export const CATEGORY_ICONS: Record<QuestionCategory, LucideIcon> = {
  'データサイエンス力': Brain,
  'データエンジニアリング力': Wrench,
  'ビジネス力': Briefcase
};
