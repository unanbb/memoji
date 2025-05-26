'use client';
import SearchBar from '@/components/common/SearchBar';
import ToggleSidebarButton from '@/components/layout/ToggleSidebarButton';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-white z-10">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <div className="text-xl font-bold justify-start w-1/4">
          <Link href="/">Memoji</Link>
        </div>
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>
        <div className={`flex justify-end w-1/4 `}>
          <ToggleSidebarButton onToggle={onToggleSidebar} isOpen={!isSidebarOpen} />
        </div>
      </div>
    </header>
  );
}
