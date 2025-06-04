import type { MemoProps } from '@/types/memo';
import { useEffect, useState } from 'react';

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
  const [memo, setMemo] = useState<MemoProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedMemo = await fetchMemoById(id);
      setMemo(fetchedMemo);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return { memo, isLoading };
}
