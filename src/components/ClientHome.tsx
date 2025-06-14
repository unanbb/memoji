'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import MemoSection from '@/components/memo/MemoSection';
import useGetMemos from '@/hooks/useGetMemos';

export default function ClientHome() {
  const { isLoading, data: memos = [] } = useGetMemos();

  if (isLoading) {
    return <MemoListSkeleton />;
  }

  return (
    <ProtectedRoute>
      <MemoSection memos={memos} />
    </ProtectedRoute>
  );
}
