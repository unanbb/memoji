import MemoSection from '@/components/memo/MemoSection';// 서버에서 memos를 가져오는 함수
import type { MemoProps } from '@/types/memo';
import { cookies } from 'next/headers';

interface PageProps {
  params: { category: string };
}

async function getMemos(): Promise<MemoProps[]> {
  const cookieStore = cookies();
  const res = await fetch(`http://localhost:3000/api/memos`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });
  return res.json();
}

export default async function EachCategoryPage({ params }: PageProps) {
  const memos = await getMemos();

  const decodedCategory = decodeURIComponent(params.category);
  const filteredMemo = memos.filter(memo => memo.category === decodedCategory);

  return <MemoSection memos={filteredMemo} />;
}