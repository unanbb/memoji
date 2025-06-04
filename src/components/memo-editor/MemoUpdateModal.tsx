'use client';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import useGetMemoById from '@/hooks/useGetMemoById';
import useUpdateMemo from '@/hooks/useUpdateMemo';
import { useEffect, useState } from 'react';

interface MemoUpdateModalProps {
  onClose: () => void;
  id: string;
}
export default function MemoUpdateModal({ onClose, id }: MemoUpdateModalProps) {
  const { memo, isLoading } = useGetMemoById(id);
  const { updateMemo } = useUpdateMemo();

  const [memoData, setMemoData] = useState({
    id,
    title: memo?.title || '',
    content: memo?.content || '',
    category: memo?.category || '',
  });

  useEffect(() => {
    if (!isLoading && memo) {
      setMemoData({
        id: memo.id,
        title: memo.title,
        content: memo.content,
        category: memo.category,
      });
    }
  }, [isLoading, memo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMemoContentChange = (newValue: string | undefined) => {
    setMemoData(prev => ({ ...prev, content: newValue || '' }));
  };

  const handleUpdateMemo = async () => {
    onClose();
    const result = await updateMemo(id, memoData);
    if (result.success) {
      console.log('메모가 성공적으로 업데이트되었습니다.');
    } else {
      console.error('메모 업데이트 중 오류가 발생했습니다:', result.message);
      // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요 (ex: toast)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      onClose={handleUpdateMemo}
      isOpen={true}
      aria-label="메모 생성"
      aria-labelledby="memo-create-modal"
      size="large"
      className="max-w-2xl relative sm:h-[70vh] h-[100vh]"
    >
      <div className="absolute top-1 right-1">
        <CrossButton onClick={handleUpdateMemo} label="Close editor" />
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
        <AddButton onClick={() => {}} className="absolute -top-1 right-0" label="카테고리 추가" />
      </div>
      <MarkDownEditor value={memoData.content} onChange={handleMemoContentChange} />
    </Modal>
  );
}
