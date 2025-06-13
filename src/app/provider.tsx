// In Next.js, this file would be called: app/providers.tsx
'use client';
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import getQueryClient from './getQueryClient';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // getQueryClient에서 통합된 로직 사용
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
