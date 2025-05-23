'use client';

import MemoCard from './MemoCard';
import type { MemoListProps } from '@/types/memo';

export default function MemoList({ memos }: MemoListProps) {
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {memos.map(memo => (
        <MemoCard key={memo.id} {...memo} />
      ))}
    </div>
  );
}
