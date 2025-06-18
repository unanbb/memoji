'use client';

import Separator from '@/components/common/Separator';
import ToggleButton from '@/components/common/ToggleButton';
import { ROUTE } from '@/components/constants/path';
import type { MemoListProps } from '@/types/memo';
import Link from 'next/link';
import { useState } from 'react';
import MemoList from './MemoList';

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
        <Link
          href={`${ROUTE.CATEGORIES}/${encodeURIComponent(category)}`}
          className="font-medium inline-block"
        >
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
