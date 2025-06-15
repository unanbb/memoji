'use client';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import DeleteButton from '@/components/common/DeleteButton';
import InputField from '@/components/common/InputField';
import LexicalMarkdownEditor from '@/components/memo-editor/LexicalMarkdownEditor/LexicalMarkdownEditor';
import MemoEditorSkeleton from '@/components/memo-editor/MemoEditorSkeleton';
import { Modal } from '@/components/Modal';
import showToast from '@/components/toast/showToast';
import { showUndoDeleteToast } from '@/components/toast/showUndoDeleteToast';
import useDeleteMemo from '@/hooks/useDeleteMemo';
import useGetMemoById from '@/hooks/useGetMemoById';
import useUpdateMemo from '@/hooks/useUpdateMemo';
import { useMemo, useState } from 'react';

interface MemoUpdateModalProps {
  onClose: () => void;
  id: string;
}

export default function MemoUpdateModal({ onClose, id }: MemoUpdateModalProps) {
  const { data: memo, isLoading, isError, isFetching } = useGetMemoById(id);
  const { updateMemo } = useUpdateMemo();
  const { deleteMemo } = useDeleteMemo();

  const [memoData, setMemoData] = useState<{
    id?: string;
    title?: string;
    content?: string;
    category?: string;
  }>({});

  const displayMemoData = useMemo(
    () => ({
      id: memoData.id ?? memo?.id,
      title: memoData.title ?? memo?.title ?? '',
      content: memoData.content ?? memo?.content ?? '',
      category: memoData.category ?? memo?.category ?? 'others',
    }),
    [memo, memoData],
  );

  const handleDeleteMemo = async () => {
    try {
      await deleteMemo(id);
      onClose();
      showUndoDeleteToast(id);
    } catch (error) {
      console.error('메모 삭제 중 오류가 발생했습니다:', error);
      showToast({
        type: 'error',
        state: '삭제',
        name: '메모',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemoContentChange = (newValue: string | undefined) => {
    setMemoData(prev => ({ ...prev, content: newValue || '' }));
  };

  const handleUpdateMemo = () => {
    updateMemo(
      { id, memo: { ...displayMemoData, id } },
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
    if (isError || isLoading || isFetching) return;
    handleUpdateMemo();
  };

  return (
    <Modal
      onClose={handleClose}
      isOpen={true}
      aria-label="메모 수정"
      aria-labelledby="memo-update-modal"
      size="large"
      className="max-w-4xl relative sm:h-[85%] h-full"
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
          <div className="absolute top-1 right-1">
            <CrossButton onClick={handleClose} label="Close editor" />
          </div>
        </div>
      ) : isLoading || isFetching ? (
        <MemoEditorSkeleton />
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
              value={displayMemoData.title}
              variant="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 relative">
            <InputField
              placeholder="카테고리"
              name="category"
              value={displayMemoData.category}
              onChange={handleChange}
            />
            <AddButton
              onClick={() => {}}
              className="absolute -top-1 right-0"
              label="카테고리 추가"
            />
          </div>
          <LexicalMarkdownEditor
            value={displayMemoData.content}
            onChange={handleMemoContentChange}
            autoFocus={true}
          />
        </>
      )}
    </Modal>
  );
}
