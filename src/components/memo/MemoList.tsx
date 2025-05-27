'use client';

import MemoCard from './MemoCard';
import { MemoProps } from '@/types/memo';

export interface MemoListProps {
  memos: Omit<MemoProps, 'createdAt'>[];
}

export default function MemoList({ memos }: MemoListProps) {
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {memos.map(memo => (
        <MemoCard key={memo.id} {...memo} />
      ))}
    </div>
  );
}
