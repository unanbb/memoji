'use client';

import MemoSection from '@/components/memo/MemoSection';
import type { MemoProps } from '@/types/memo';
import useGetMemos from '@/hooks/useGetMemos';

interface ClientMemoSectionProps {
  initialMemos: MemoProps[];
  category?: string;
}

export default function ClientMemoSection({ initialMemos, category }: ClientMemoSectionProps) {
  const { data: memos = initialMemos } = useGetMemos();

  const filteredMemos = category ? memos.filter(memo => memo.category === category) : memos;

  return <MemoSection memos={filteredMemos} />;
}
