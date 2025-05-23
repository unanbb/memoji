import GlobalPlusButton from '@/app/components/layout/GlobalPlusButton';
import Header from '@/app/components/layout/Header';
import { Sidebar } from '@/app/components/layout/sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-3">{children}</main>
      </div>
      <Sidebar isOpen={true} />
      <GlobalPlusButton />
    </div>
  );
}
