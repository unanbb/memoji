'use server';

import { signIn } from '@/auth';

export async function handleGoogleSignIn() {
  try {
    await signIn('google', { redirectTo: '/' });
  } catch (error) {
    throw error;
  }
}
