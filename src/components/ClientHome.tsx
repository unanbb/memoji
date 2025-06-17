'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import MemoSection from '@/components/memo/MemoSection';
import { NotFondMemos } from '@/components/NotFoundMemos';
import useSearchMemos from '@/hooks/useSearchMemos';
import { useSearchStore } from '@/store/SearchStore';

export default function ClientHome() {
  const searchQuery = useSearchStore(state => state.searchQuery);

  const { isLoading, data: memos = [] } = useSearchMemos({
    search: searchQuery,
    category: '',
  });

  if (isLoading) {
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
