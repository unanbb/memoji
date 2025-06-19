import ClientMemoSection from '@/components/ClientMemoSection';
import { fetchMemos } from '@/lib/fetchers';
import type { MemoProps } from '@/types/memo';
import { cookies } from 'next/headers';

interface CategoryParams {
  category: string;
}

export async function generateMetadata({params}: {params : Promise<CategoryParams>}){
  const { category } = await params;
  return {
    title: category,
  }
}

async function getMemos(): Promise<MemoProps[]> {
  const cookieStore = await cookies();
  return fetchMemos(cookieStore);
}

export default async function EachCategoryPage({ params }: { params: Promise<CategoryParams> }) {
  const { category } = await params;
  const memos = await getMemos();

  const decodedCategory = decodeURIComponent(category);
  const filteredMemo = memos.filter(memo => memo.category === decodedCategory);

  return <ClientMemoSection initialMemos={filteredMemo} category={decodedCategory} />;
}
