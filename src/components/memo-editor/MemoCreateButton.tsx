'use client';

import PlusButton from '@/components/common/PlusButton';
import MemoCreateModal from '@/components/memo-editor/MemoCreateModal';
import { useCallback, useState } from 'react';

export default function MemoCreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isModalOpen && <MemoCreateModal onClose={onClose} />}
      <div className="absolute top-2 right-2"></div>
      <PlusButton onClick={openModal} label="메모 추가" />
    </div>
  );
}
