'use client';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import DeleteButton from '@/components/common/DeleteButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
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
  const { memo, isError, isLoading } = useGetMemoById(id);
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
  // TODO: useEffect를 지우기, memoData를 memo로부터 직접 가져오도록 변경

  const handleDeleteMemo = () => {
    deleteMemo(id, {
      onSuccess: () => {
        console.log('메모가 성공적으로 삭제되었습니다.');
        router.push('/');
        onClose();
        showUndoDeleteToast(id);
      },
      onError: (error: Error) => {
        console.error('메모 삭제 중 오류가 발생했습니다:', error.message);
        // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요 (ex: toast)
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
          //TODO: 사용자에게 메모 업데이트 오류 메시지를 표시하는 로직 추가 필요 (ex: toast)
        },
      },
    );
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onClose();
    if (isError || isLoading) return;
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
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-full">
          <p>메모를 불러오는 중 오류가 발생했습니다.</p>
          <div className="absolute top-1 right-1">
            <CrossButton onClick={handleClose} label="Close editor" />
          </div>
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
