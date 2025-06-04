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
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading');
      try {
        const fetchedMemo = await fetchMemoById(id);
        setMemo(fetchedMemo);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching memo:', error);
        setStatus('error');
      }
    };
    fetchData();
  }, [id]);

  return { memo, status };
}
