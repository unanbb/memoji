'use client';
import GlobalPlusButton from '@/components/layout/GlobalPlusButton';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  return (
    <div className="flex flex-row min-h-screen relative">
      <div className="flex-1 flex flex-col min-h-screen w-full md:w-auto">
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 container mx-auto px-4 py-3 mt-16">{children}</main>
      </div>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} className="md:static absolute" />
      <GlobalPlusButton />
    </div>
  );
}
