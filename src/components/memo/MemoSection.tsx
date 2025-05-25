import { MemoListProps } from '@/types/memo';
import MemoList from './MemoList';
import Link from 'next/link';
import { Separator } from '../common/Separator';

export default function MemoSection({ memos }: MemoListProps) {
  const categories = Array.from(new Set(memos.map(memo => memo.category)));

  return (
    <div>
      {categories.map(category => {
        const filteredMemos = memos.filter(memo => memo.category === category);

        return (
          <div key={category} className="mb-6">
            <Link href={`/${category}`} className="font-medium block">
              {category}
            </Link>
            <Separator my={3} />
            <MemoList memos={filteredMemos} />
          </div>
        );
      })}
    </div>
  );
}
