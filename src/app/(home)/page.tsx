import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import ClientHome from '@/components/ClientHome';
import { fetchMemos } from '@/lib/fetchers';
import { queryKeys } from '@/lib/queryKeys';

export default async function Home() {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.memo.all,
    queryFn: () => fetchMemos(cookieStore),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientHome />
    </HydrationBoundary>
  );
}

