'use client';
import { FaUser } from 'react-icons/fa';

interface LoginButtonProps {
  onClick: () => void;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors duration-200 cursor-pointer"
    >
      <FaUser size={16} />
      <span className="hidden sm:inline">로그인</span>
    </button>
  );
}
