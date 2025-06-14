'use server';

import { signIn } from '@/auth';

export async function handleGithubSignIn() {
  await signIn('github', { redirectTo: '/' });
}
