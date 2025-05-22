import MemoList from './components/common/MemoList';
import { MEMOS } from '@/data/mocks';

export default function Home() {
  return (
    <div>
      <MemoList memos={MEMOS} />
    </div>
  );
}
