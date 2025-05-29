import MemoSection from '@/components/memo/MemoSection';

const getMemos = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/memos');

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
