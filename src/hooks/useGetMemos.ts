import { useAuth } from '@/hooks/useAuth';
import { queryKeys } from '@/lib/queryKeys';
import { type MemoProps } from '@/types/memo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchMemos = async (): Promise<MemoProps[]> => {
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
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.memo.lists(),
    queryFn: fetchMemos,
    staleTime: 1000 * 60 * 5,
    retry: 0,
    enabled: isAuthenticated && !authLoading,
  });

  useEffect(() => {
    if (isAuthenticated && !authLoading && !isLoading && data) {
      data.forEach(memo => {
        queryClient.setQueryData(queryKeys.memo.detail(memo.id), memo);
      });
    }
  }, [isLoading, isAuthenticated, authLoading, queryClient, data]);

  return { data, isLoading, isError, isFetching };
}
