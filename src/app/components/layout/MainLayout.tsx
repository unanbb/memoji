import GlobalPlusButton from '@/app/components/layout/GlobalPlustButton';
import Header from '@/app/components/layout/Header';
import { Sidebar } from '@/app/components/sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-3">{children}</main>
      <GlobalPlusButton />
      <Sidebar />
    </div>
  );
}
