'use client';

import MemoEachSection from './MemoEachSection';
import type { MemoListProps } from '@/types/memo';

export default function MemoSection({ memos }: MemoListProps) {
  const categories = Array.from(new Set(memos.map(memo => memo.category)));
  const memosByCategory = categories.reduce<Record<string, typeof memos>>((acc, category) => {
    acc[category] = memos.filter(memo => memo.category === category);
    return acc;
  }, {});

  return (
    <div>
      {categories.map(category => (
        <MemoEachSection key={category} category={category} memos={memosByCategory[category]} />
      ))}
    </div>
  );
}
