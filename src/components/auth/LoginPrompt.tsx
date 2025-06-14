'use client';
import SignInModal from '@/components/auth/SignInModal';
import { useState } from 'react';

export default function LoginPrompt() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-6">메모 기능을 사용하려면 로그인해주세요.</p>
          <button
            onClick={() => setIsSignInOpen(true)}
            className="bg-gray-700 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            로그인하기
          </button>
        </div>
      </div>
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </>
  );
}
