'use client';
import { handleGithubSignIn } from '@/components/actions/handleGithubSignIn';
import { handleGoogleSignIn } from '@/components/actions/handleGoogleSignIn';
import SignInButton from '@/components/auth/SignInButton';
import { Modal } from '@/components/Modal';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium" className="w-full max-w-md p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">로그인</h2>
        <p className="text-gray-600 mb-8">Memoji에 오신 것을 환영합니다!</p>

        <div className="space-y-3">
          <SignInButton
            action={handleGoogleSignIn}
            icon={<FaGoogle className="text-red-500" size={16} />}
          >
            Google로 로그인
          </SignInButton>

          <SignInButton
            action={handleGithubSignIn}
            icon={<FaGithub className="text-gray-700" size={16} />}
          >
            GitHub로 로그인
          </SignInButton>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          로그인하면 <span className="underline">서비스 약관</span>과{' '}
          <span className="underline">개인정보 처리방침</span>에 동의하는 것으로 간주됩니다.
        </div>
      </div>
    </Modal>
  );
}
