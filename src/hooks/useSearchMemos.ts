import useGetMemos from '@/hooks/useGetMemos';
import type { MemoProps } from '@/types/memo';
import { useMemo } from 'react';

export interface SearchOptions {
  search?: string;
  category?: string;
}

export default function useSearchMemos(options: SearchOptions) {
  const { data, isLoading, isError, isFetching } = useGetMemos();

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((memo: MemoProps) => {
      const matchesSearch = options.search
        ? memo.title.toLowerCase().includes(options.search.toLowerCase()) ||
          memo.content.toLowerCase().includes(options.search.toLowerCase())
        : true;

      const matchesCategory = options.category ? memo.category === options.category : true;

      return matchesSearch && matchesCategory;
    });
  }, [data, options.search, options.category]);

  return { data: filteredData, isLoading, isError, isFetching };
}
