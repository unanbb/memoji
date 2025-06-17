import { cookies } from 'next/headers';

export async function fetchMemos(cookieStore?: Awaited<ReturnType<typeof cookies>>) {
  const headers: HeadersInit = {};

  if (cookieStore) {
    headers['cookie'] = cookieStore.toString();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/memos`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch memos');
  }

  return res.json();
}
