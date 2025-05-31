'use client';

import PlusButton from '@/components/common/PlusButton';
import MemoCreateModal from '@/components/MemoCreateModal';
import type { MemoProps } from '@/types/memo';
import { useCallback, useState } from 'react';

interface GlobalPlusButtonProps {
  onClick?: () => void;
}

const fetchCreateMemo = async (memoData: Omit<MemoProps, 'id' | 'createdAt'>) => {
  try {
    const response = await fetch(`/api/memos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoData),
    });

    if (!response.ok) {
      throw new Error('메모 생성에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('메모 생성 중 오류 발생:', error);
    throw new Error('메모 생성 중 오류가 발생했습니다.');
  }
};

export default function GlobalPlusButton({ onClick }: GlobalPlusButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memoData, setMemoData] = useState<Omit<MemoProps, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    category: '',
  });

  const saveMemo = useCallback(async () => {
    if (!memoData.title || !memoData.content) {
      console.error('메모 제목과 내용은 필수입니다.');
      return;
    }
    try {
      const response = await fetchCreateMemo(memoData);
      console.log('메모가 성공적으로 생성되었습니다:', response);
    } catch (error) {
      console.error('메모 생성 중 오류 발생:', error);
      //TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요
    }
    setMemoData({
      title: '',
      content: '',
      category: '',
    });
  }, [memoData]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setMemoData({
      title: '',
      content: '',
      category: '',
    });
  }, []);

  const hideModal = useCallback(() => {
    setIsModalOpen(false);
    saveMemo();
  }, [saveMemo]);

  const handlePlusButtonClick = () => {
    onClick?.();
    openModal();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <MemoCreateModal
        isOpen={isModalOpen}
        onClose={hideModal}
        memoData={memoData}
        setMemoData={setMemoData}
      />
      <div className="absolute top-2 right-2"></div>
      <PlusButton onClick={handlePlusButtonClick} />
    </div>
  );
}
