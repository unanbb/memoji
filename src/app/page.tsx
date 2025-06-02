import MemoSection from '@/components/memo/MemoSection';
import { headers } from 'next/headers';

const getMemos = async () => {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const res = await fetch(`http://${host}/api/memos`);
    // const res = await fetch('/api/memos', {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data.memos;
  } catch (error) {
    console.error('Failed to fetch memos:', error);

    return [];
  }
};

export default async function Home() {
  const memos = await getMemos();

  return (
    <div>
      <MemoSection memos={memos} />
    </div>
  );
}
