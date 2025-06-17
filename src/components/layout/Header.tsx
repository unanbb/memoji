'use client';
import AuthSection from '@/components/auth/authSection';
import SearchBar from '@/components/common/SearchBar';
import ToggleSidebarButton from '@/components/layout/ToggleSidebarButton';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Link from 'next/link';
import { Suspense, useState } from 'react';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      <header className="w-full h-16 fixed top-0 left-0 bg-white z-10 border-b border-gray-200 shadow">
        <div className="container mx-auto flex items-center h-full px-4 gap-4">
          <div className="text-xl font-bold flex-shrink-0">
            <Link href="/">Memoji</Link>
          </div>
          <div className="flex-1 max-w-2xl mx-auto">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 mr-10">
            <AuthSection />
          </div>
        </div>
      </header>
      <ToggleSidebarButton onToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
}
