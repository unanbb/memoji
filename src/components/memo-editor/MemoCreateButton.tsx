'use client';

import PlusButton from '@/components/common/PlusButton';
import MemoCreateModal from '@/components/memo-editor/MemoCreateModal';
import { useAuth } from '@/hooks/useAuth';
import { useCallback, useState } from 'react';

export default function MemoCreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4">
          {isModalOpen && <MemoCreateModal onClose={onClose} />}
          <PlusButton onClick={openModal} label="메모 추가" />
        </div>
      )}
    </>
  );
}
