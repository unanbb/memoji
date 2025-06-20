'use client';
import SignInModal from '@/components/auth/SignInModal';
import { useState } from 'react';
import { IoLogInOutline } from 'react-icons/io5';

export default function LoginPrompt() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-8xl font-black text-gray-900 tracking-tight">🔐</h1>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">로그인이 필요합니다</h2>
            <p className="text-gray leading-relaxed">
              메모 기능을 사용하려면
              <br />
              로그인해주세요.
            </p>
          </div>

          <button
            onClick={() => setIsSignInOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <IoLogInOutline className="w-4 h-4 mr-2" />
            로그인하기
          </button>
        </div>
      </div>
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </>
  );
}
