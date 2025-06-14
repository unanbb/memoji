'use client';
import type { ReactNode } from 'react';

interface SignInButtonProps {
  action: (formData: FormData) => void;
  icon: ReactNode;
  children: ReactNode;
}

export default function SignInButton({ action, icon, children }: SignInButtonProps) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {icon}
        {children}
      </button>
    </form>
  );
}
