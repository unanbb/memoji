'use client';
import LoginPrompt from '@/components/auth/LoginPrompt';
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
    return <LoginPrompt />;
  }

  return <>{children}</>;
}
