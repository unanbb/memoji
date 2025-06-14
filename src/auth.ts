import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { createOrUpdateUser } from '@/lib/services/user.service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user.email && user.name && account?.provider) {
        try {
          await createOrUpdateUser({
            id: user.email,
            email: user.email,
            name: user.name,
            image: user.image || undefined,
            provider: account.provider as 'google' | 'github',
          });
          return true;
        } catch (error) {
          console.error('Failed to create/update user:', error);
          return false;
        }
      }
      return false;
    },
    async session({ session }) {
      if (session.user && session.user.email) {
        session.user.id = session.user.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        token.sub = user.email;
      }
      return token;
    },
  },
});
