import MemoSection from '@/components/memo/MemoSection';

const getMemos = async () => {
  const res = await fetch('http://localhost:3000/api/memos');
  const data = await res.json();
  return data.memos;
};
export default async function Home() {
  const memos = await getMemos();

  return (
    <div>
      <MemoSection memos={memos} />
    </div>
  );
}
