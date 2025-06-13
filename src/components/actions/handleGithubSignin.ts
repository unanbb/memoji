'use server';

import { signIn } from '@/auth';

export async function handleGithubSignin() {
  try {
    await signIn('github', { redirectTo: '/' });
  } catch (error) {
    throw error;
  }
}
