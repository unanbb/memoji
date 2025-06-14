'use client';

import { useMemo } from 'react';
import MemoEachSection from './MemoEachSection';
import type { MemoListProps } from '@/types/memo';

export default function MemoSection({ memos }: MemoListProps) {
  const { categories, memosByCategory } = useMemo(() => {
    const categories = Array.from(new Set(memos.map(memo => memo.category)));
    const memosByCategory = categories.reduce<Record<string, typeof memos>>((acc, cur) => {
      acc[cur] = memos.filter(m => m.category === cur);
      return acc;
    }, {});
    return { categories, memosByCategory };
  }, [memos]);

  return (
    <div>
      {categories.map(category => (
        <MemoEachSection key={category} category={category} memos={memosByCategory[category]} />
      ))}
    </div>
  );
}
