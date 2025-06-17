import ClientHome from '@/components/ClientHome';
import { fetchMemos } from '@/lib/fetchers';
import { queryKeys } from '@/lib/queryKeys';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.memo.lists(),
    queryFn: () => fetchMemos(cookieStore),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientHome />
    </HydrationBoundary>
  );
}
