'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import MemoSection from '@/components/memo/MemoSection';
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

  return (
    <ProtectedRoute>
      <MemoSection memos={memos} />
    </ProtectedRoute>
  );
}
