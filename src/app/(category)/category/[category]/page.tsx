'use client';

import MemoSection from '@/components/memo/MemoSection';
import useGetMemos from '@/hooks/useGetMemos';
import { useParams } from 'next/navigation';
import React from 'react';

export default function EachCategoryPage() {
  const { data: memos = [] } = useGetMemos();
  const { category } = useParams();

  if (typeof category !== 'string') {
    return <div>잘못된 경로입니다.</div>;
  }

  const decodedCategory = decodeURIComponent(category);

  const filteredMemo = memos.filter(memo => memo.category === decodedCategory);
  return <MemoSection memos={filteredMemo} />;
}
