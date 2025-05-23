'use client';
import SearchBar from '@/components/common/SearchBar';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="w-full h-16">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link href="/" className="text-xl font-bold justify-start w-1/4">
          Memoji
        </Link>
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>
        <div className={`flex justify-end w-1/4 `}>
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${isSidebarOpen ? 'hidden' : 'block'}`}
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <MdMenu size={32} />
          </button>
        </div>
      </div>
    </header>
  );
}
