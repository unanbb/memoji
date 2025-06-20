import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useQuery } from '@tanstack/react-query';

const fetchMemoById = async (id: string): Promise<MemoProps> => {
  try {
    const response = await fetch(`/api/memos/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch memos: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error(`Memo with id ${id} not found`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching memos:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Unknown error fetching memo ${id}`);
    }
  }
};

export default function useGetMemoById(id: string) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.memo.detail(id),
    queryFn: () => fetchMemoById(id),
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  return { data, isLoading, isError, isFetching };
}
