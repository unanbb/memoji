'use client';

import MemoList from './MemoList';
import Link from 'next/link';
import Separator from '@/components/common/Separator';
import ToggleButton from '@/components/common/ToggleButton';
import { useState } from 'react';
import type { MemoListProps } from '@/types/memo';

export default function MemoSection({ memos }: MemoListProps) {
  const categories = Array.from(new Set(memos.map(memo => memo.category)));
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(category => [category, true])),
  );

  const toggleOpen = (category: string) => {
    setIsOpen(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      {categories.map(category => {
        const filteredMemos = memos.filter(memo => memo.category === category);

        return (
          <div key={category} className="mb-6">
            <div className="flex justify-between">
              <Link href={`/${category}`} className="font-medium inline-block">
                {category}
              </Link>
              <ToggleButton onClick={() => toggleOpen(category)} isOpen={isOpen[category]} />
            </div>
            <Separator my={3} />
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen[category] ? 'max-h-[auto]' : 'max-h-0'
              }`}
            >
              <MemoList memos={filteredMemos} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
