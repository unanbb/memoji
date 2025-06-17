import { useAuth } from '@/hooks/useAuth';
import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface SearchOptions {
  search?: string;
  category?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

const fetchSearchMemos = async (options: SearchOptions): Promise<MemoProps[]> => {
  const { search, category, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (category) params.append('category', category);
  params.append('sortBy', sortBy);
  params.append('sortOrder', sortOrder);

  try {
    const response = await fetch(`/api/memos?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch memos:', error);
    throw error instanceof Error ? error : new Error('Unknown error fetching memos');
  }
};

export default function useSearchMemos(options: SearchOptions) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const queryKey = useMemo(
    () =>
      queryKeys.memo.search({
        search: options.search,
        category: options.category,
        sortBy: options.sortBy,
        sortOrder: options.sortOrder,
      }),
    [options.search, options.category, options.sortBy, options.sortOrder],
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchSearchMemos(options),
    staleTime: options.search ? 30 * 1000 : 5 * 60 * 1000,
    enabled: isAuthenticated && !authLoading,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, isError, isFetching };
}
