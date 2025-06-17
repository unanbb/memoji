'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import MemoSection from '@/components/memo/MemoSection';
import { NotFondMemos } from '@/components/NotFoundMemos';
import useDebounce from '@/hooks/useDebounce';
import useSearchMemos from '@/hooks/useSearchMemos';
import { useSearchStore } from '@/store/SearchStore';

export default function ClientHome() {
  const searchQuery = useSearchStore(state => state.searchQuery);

  const { debouncedValue, isDebouncing } = useDebounce(searchQuery, 300);

  const { isLoading, data: memos = [] } = useSearchMemos({
    search: debouncedValue,
    category: '',
  });

  if (isLoading || isDebouncing) {
    return <MemoListSkeleton />;
  }

  if (!memos || memos.length === 0) {
    return <NotFondMemos />;
  }

  return (
    <ProtectedRoute>
      <MemoSection memos={memos} />
    </ProtectedRoute>
  );
}
