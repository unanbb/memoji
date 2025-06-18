import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider refetchInterval={5 * 30} refetchOnWindowFocus={true} session={session}>
      {children}
    </SessionProvider>
  );
}
