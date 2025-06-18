import QueryProvider from '@/app/QueryProvider';
import MainLayout from '@/components/layout/MainLayout';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from '@/app/AuthProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Memo',
  description: 'Simple Memo App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>
        <AuthProvider>
          <QueryProvider>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <MainLayout>{children}</MainLayout>
            {process.env.NEXT_PUBLIC_REACT_SCAN === 'true' && (
              <script
                crossOrigin="anonymous"
                src="//unpkg.com/react-scan/dist/auto.global.js"
                defer
              />
            )}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
