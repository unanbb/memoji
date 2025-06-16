import ClientMemoSection from '@/components/ClientMemoSection';
import type { MemoProps } from '@/types/memo';
import { cookies } from 'next/headers';

interface PageProps {
  category: string;
}

async function getMemos(): Promise<MemoProps[]> {
  const cookieStore = await cookies();
  const res = await fetch(`http://localhost:3000/api/memos`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });
  return res.json();
}

export default async function EachCategoryPage({ params }: { params: Promise<PageProps>}) {
  const { category } = await params;
  const memos = await getMemos();

  const decodedCategory = decodeURIComponent(category);
  const filteredMemo = memos.filter(memo => memo.category === decodedCategory);

  return <ClientMemoSection initialMemos={filteredMemo} category={decodedCategory} />;
}