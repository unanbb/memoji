import getQueryClient from '@/app/getQueryClient';
import MemoSection from '@/components/memo/MemoSection';
import { queryKeys } from '@/lib/queryKeys';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';

const getMemos = async () => {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const res = await fetch(`http://${host}/api/memos`);
    // const res = await fetch('/api/memos', {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.memos;
  } catch (error) {
    console.error('Failed to fetch memos:', error);

    return [];
  }
};

export default async function Home() {
  const memos = await getQueryClient().fetchQuery({
    queryKey: queryKeys.memo.lists(),
    queryFn: getMemos,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(getQueryClient())}>
        <MemoSection memos={memos} />
      </HydrationBoundary>
    </div>
  );
}
