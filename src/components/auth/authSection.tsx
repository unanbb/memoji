'use client';
import LoginButton from '@/components/auth/LoginButton';
import LogoutButton from '@/components/auth/LogoutButton';
import SignInModal from '@/components/auth/SignInModal';
import UserProfile from '@/components/auth/UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

// TODO: AuthSection 컴포넌트는 로그인 상태에 따라 다른 UI를 보여줌
// TODO: AuthSection이라는 명칭보다 더 적절한 이름이 있으면 변경
export default function AuthSection() {
  const { isAuthenticated } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <UserProfile />
          <LogoutButton />
        </div>
      ) : (
        <LoginButton onClick={openSignIn} />
      )}
      <SignInModal isOpen={isSignInOpen} onClose={closeSignIn} />
    </>
  );
}
