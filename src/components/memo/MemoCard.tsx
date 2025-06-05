'use client';
import MemoUpdateModal from '@/components/memo-editor/MemoUpdateModal';
import type { MemoCardProps } from '@/types/memo';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function MemoCard({ id, title, content }: MemoCardProps) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="aspect-square border border-gray-300 rounded-lg p-4 overflow-hidden cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log(id);
          }
        }}
      >
        <div className="flex flex-col gap-1 overflow-hidden h-full">
          <h1 className="font-semibold text-lg overflow-hidden whitespace-nowrap text-ellipsis flex-shrink-0 w-full">
            {title}
          </h1>
          <div className="prose prose-sm">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
      {open && <MemoUpdateModal id={id} onClose={handleCloseModal} />}
    </>
  );
}
