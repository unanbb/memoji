'use client';

import MemoList from './MemoList';
import Link from 'next/link';
import Separator from '@/components/common/Separator';
import ToggleButton from '@/components/common/ToggleButton';
import { useState } from 'react';
import type { MemoListProps } from '@/types/memo';

interface MemoEachSectionProps {
  category: string;
  memos: MemoListProps['memos'];
}

export default function MemoEachSection({ category, memos }: MemoEachSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <Link href={`/category/${encodeURIComponent(category)}`} className="font-medium inline-block">
          {category}
        </Link>
        <ToggleButton onClick={toggleOpen} isOpen={isOpen} />
      </div>
      <Separator my={3} />
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-full' : 'max-h-0 opacity-0'
        }`}
      >
        <MemoList memos={memos} />
      </div>
    </div>
  );
}
