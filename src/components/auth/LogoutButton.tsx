'use client';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

interface LogoutButtonProps {
  variant?: 'button' | 'menu';
}

export default function LogoutButton({ variant = 'button' }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (variant === 'menu') {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <FaSignOutAlt size={14} />
        <span>로그아웃</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors duration-200 cursor-pointer"
    >
      <FaSignOutAlt size={16} />
      <span className="hidden sm:inline">로그아웃</span>
    </button>
  );
}
