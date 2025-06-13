'use server';

import { signIn } from '@/auth';

export async function handleGithubSignIn() {
  try {
    await signIn('github', { redirectTo: '/' });
  } catch (error) {
    throw error;
  }
}
