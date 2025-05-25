import MemoSection from '@/components/memo/MemoSection';
import { MEMOS } from '@/data/mocks';

export default function Home() {
  return (
    <div>
      <MemoSection memos={MEMOS} />
    </div>
  );
}
