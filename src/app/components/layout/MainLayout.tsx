import Header from '@/app/components/layout/Header';
import GlobalPlusButton from '@/app/components/layout/GlobalPlustButton';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-3">{children}</main>
      <GlobalPlusButton />
    </div>
  );
}
