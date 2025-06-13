import { useAuth } from '@/hooks/useAuth';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

const fetchMemos = async () => {
  try {
    const response = await fetch('/api/memos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch memos:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unknown error fetching memos');
    }
  }
};

export default function useGetMemos() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.memo.lists(),
    queryFn: fetchMemos,
    staleTime: 1000 * 60 * 5,
    retry: 0,
    enabled: isAuthenticated && !authLoading,
  });

  return { data, isLoading, isError, isFetching };
}
