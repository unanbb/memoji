'use client';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import DeleteButton from '@/components/common/DeleteButton';
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
      className="max-w-5xl w-full relative flex flex-col rounded-lg bg-white shadow-xl sm:h-[85vh] h-full border border-gray-100"
    >
      {isError ? (
        <div className="flex h-full flex-col items-center justify-center space-y-4 p-6">
          <div className="text-center text-red-600 font-medium">
            메모를 불러오는 중 오류가 발생했습니다.
          </div>
          <button
            onClick={() => handleUpdateMemo()}
            className="rounded-md bg-gray-800 px-4 py-2 text-white text-sm transition-colors hover:bg-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            다시 시도
          </button>
          <div className="absolute top-2 right-2">
            <CrossButton onClick={handleClose} label="Close editor" className="p-1.5" />
          </div>
        </div>
      ) : isLoading || isFetching ? (
        <MemoEditorSkeleton />
      ) : (
        <div className="flex h-full flex-col">
          <div className="modal-header flex flex-shrink-0 items-center justify-end gap-2 px-4 py-2">
            <DeleteButton onClick={handleDeleteMemo} label="Delete memo" className="p-1.5" />
            <CrossButton onClick={handleClose} label="Close editor" className="p-1.5" />
          </div>
          <div className="modal-main flex flex-grow flex-col overflow-y-hidden pb-4 pl-4 pr-4">
            <div className="flex flex-col gap-2">
              <input
                placeholder="제목을 입력하세요"
                name="title"
                value={displayMemoData.title}
                onChange={handleChange}
                className="w-full bg-transparent px-2 py-1 text-3xl font-bold tracking-tight text-gray-900 focus:outline-none border-b-2 border-transparent focus:border-blue-500 placeholder:text-gray-400 transition-colors"
                autoFocus
              />
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="text-xs font-medium text-gray-500">Category:</span>
                <div className="relative flex-1 max-w-[200px]">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    #
                  </div>
                  <input
                    placeholder="카테고리 추가 or 변경"
                    name="category"
                    value={displayMemoData.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-6 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <AddButton
                      onClick={() => {
                        /* TODO: Implement category selection */
                      }}
                      label="카테고리 추가 or 변경"
                      className="p-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full flex-grow pt-4">
              <LexicalMarkdownEditor
                value={displayMemoData.content}
                onChange={handleMemoContentChange}
                autoFocus={false}
                placeholder="마크다운으로 메모를 작성해보세요..."
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
