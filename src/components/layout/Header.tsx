'use client';
import AuthSection from '@/components/auth/authSection';
import SearchBar from '@/components/common/SearchBar';
import ToggleSidebarButton from '@/components/layout/ToggleSidebarButton';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <header className="w-full h-16 fixed top-0 left-0 bg-white z-10 border-b border-gray-200 shadow">
        <div className="container mx-auto flex items-center justify-between h-full px-4">
          <div className="text-xl font-bold justify-start w-1/4">
            <Link href="/">Memoji</Link>
          </div>
          <div className="flex flex-1 justify-center">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end w-1/4 gap-3">
            <AuthSection />
            <div className="w-10"></div>
          </div>
        </div>
      </header>
      <ToggleSidebarButton onToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
}
