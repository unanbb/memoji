'use client';
import LoginPrompt from '@/components/auth/LoginPrompt';
import ErrorFallback from '@/components/common/ErrorFallback';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import { NotFoundMemos } from '@/components/common/NotFoundMemos';
import MemoSection from '@/components/memo/MemoSection';
import { useAuth } from '@/hooks/useAuth';
import useDebounce from '@/hooks/useDebounce';
import useSearchMemos from '@/hooks/useSearchMemos';
import { useSearchStore } from '@/store/SearchStore';
import { useRouter } from 'next/navigation';

export default function ClientHome() {
  const searchQuery = useSearchStore(state => state.searchQuery);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { debouncedValue, isDebouncing } = useDebounce(searchQuery, 300);
  const {
    isLoading,
    data: memos = [],
    isError,
  } = useSearchMemos({
    search: debouncedValue,
    category: '',
  });
  const router = useRouter();

  if (isError) {
    return (
      <ErrorFallback
        reset={() => router.refresh()}
        error={new Error('메모를 가져오는 중 오류가 발생했습니다')}
      />
    );
  }

  if (isLoading || isDebouncing || isAuthLoading) {
    return <MemoListSkeleton />;
  }

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  if (memos.length === 0) {
    return <NotFoundMemos />;
  }

  return <MemoSection memos={memos} />;
}
