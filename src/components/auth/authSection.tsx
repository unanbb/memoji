'use client';
import LoginButton from '@/components/auth/LoginButton';
import LogoutButton from '@/components/auth/LogoutButton';
import UserProfile from '@/components/auth/UserProfile';
import { useAuth } from '@/hooks/useAuth';

export default function AuthSection({ openSignIn }: { openSignIn: () => void }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <UserProfile />
        <LogoutButton />
      </div>
    );
  }

  return <LoginButton onClick={openSignIn} />;
}
