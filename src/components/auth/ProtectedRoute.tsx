'use client';
import MemoListSkeleton from '@/components/common/MemoListSkeleton';
import { useAuth } from '@/hooks/useAuth';
import { type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <MemoListSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600">메모 기능을 사용하려면 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
