'use client';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';
import { FaUserCircle } from 'react-icons/fa';

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <ErrorBoundary fallback={<div className="text-red-500">Error loading user profile</div>}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-400" />
          )}
          <span className="hidden md:inline text-sm font-medium text-gray-700">{user.name}</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}
