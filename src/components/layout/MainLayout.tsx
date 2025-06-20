import Header from '@/components/layout/Header';
import MemoCreateButton from '@/components/common/MemoCreateButton';
import { ToastContainer } from 'react-toastify';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-row min-h-screen relative">
      <div className="flex-1 flex flex-col min-h-screen w-full md:w-auto">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-3 mt-16">
          {children}
          <ToastContainer />
        </main>
      </div>
      <MemoCreateButton />
    </div>
  );
}
