'use client';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import DeleteButton from '@/components/common/DeleteButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import showToast from '@/components/toast/showToast';
import { showUndoDeleteToast } from '@/components/toast/showUndoDeleteToast';
import useDeleteMemo from '@/hooks/useDeleteMemo';
import useGetMemoById from '@/hooks/useGetMemoById';
import useUpdateMemo from '@/hooks/useUpdateMemo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MemoUpdateModalProps {
  onClose: () => void;
  id: string;
}

export default function MemoUpdateModal({ onClose, id }: MemoUpdateModalProps) {
  const { data: memo, isLoading, isError } = useGetMemoById(id);
  const { updateMemo } = useUpdateMemo();
  const { deleteMemo } = useDeleteMemo();

  const [memoData, setMemoData] = useState({
    id,
    title: memo?.title || '',
    content: memo?.content || '',
    category: memo?.category || '',
  });

  const router = useRouter();

  useEffect(() => {
    if (memo) {
      setMemoData({
        id: memo.id,
        title: memo.title,
        content: memo.content,
        category: memo.category || '',
      });
    }
  }, [memo]);

  const handleDeleteMemo = () => {
    deleteMemo(id, {
      onSuccess: () => {
        console.log('메모가 성공적으로 삭제되었습니다.');
        onClose();
        router.push('/');
        showUndoDeleteToast(id);
      },
      onError: (error: Error) => {
        console.error('메모 삭제 중 오류가 발생했습니다:', error.message);
        showToast({
          type: 'error',
          state: '삭제',
          name: '메모',
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemoContentChange = (newValue: string | undefined) => {
    setMemoData(prev => ({ ...prev, content: newValue || '' }));
  };

  const handleUpdateMemo = () => {
    updateMemo(
      { id, memo: memoData },
      {
        onError: (error: Error) => {
          console.error('메모 업데이트 중 오류가 발생했습니다:', error.message);
          showToast({
            type: 'error',
            state: '수정',
            name: '메모',
          });
        },
      },
    );
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onClose();
    handleUpdateMemo();
    router.push('/');
  };

  // TODO: 로딩 스켈레톤 구현 필요
  return (
    <Modal
      onClose={handleClose}
      isOpen={true}
      aria-label="메모 수정"
      aria-labelledby="memo-update-modal"
      size="large"
      className="max-w-2xl relative sm:h-[70vh] h-[100vh]"
    >
      {isError ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-red-500 text-center">메모를 불러오는 중 오류가 발생했습니다.</div>
          <button
            onClick={() => handleUpdateMemo()}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            다시 시도
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-gray-500">메모를 불러오는 중...</span>
        </div>
      ) : (
        <>
          <DeleteButton
            onClick={handleDeleteMemo}
            label="Delete memo"
            className="absolute top-1 right-12"
          />
          <div className="absolute top-1 right-1">
            <CrossButton onClick={handleClose} label="Close editor" />
          </div>
          <div className="mb-2 mt-2">
            <InputField
              placeholder="제목"
              name="title"
              value={memoData.title}
              variant="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 relative">
            <InputField
              placeholder="카테고리"
              name="category"
              value={memoData.category}
              onChange={handleChange}
            />
            <AddButton
              onClick={() => {}}
              className="absolute -top-1 right-0"
              label="카테고리 추가"
            />
          </div>
          <MarkDownEditor value={memoData.content} onChange={handleMemoContentChange} />
        </>
      )}
    </Modal>
  );
}
