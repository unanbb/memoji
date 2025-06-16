import type { cookies } from 'next/headers';

export async function fetchMemos(cookieStore?: Awaited<ReturnType<typeof cookies>>) {
  const headers: HeadersInit = {};

  if (cookieStore) {
    headers.Cookie = cookieStore.toString();
  }

  const res = await fetch('http://localhost:3000/api/memos', {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch memos');
  }

  return res.json();
}
