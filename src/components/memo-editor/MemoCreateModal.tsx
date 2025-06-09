'use client';
import CategoryModal from '@/components/category/CategoryModal';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import usePostMemo from '@/hooks/usePostMemo';
import type { MemoProps } from '@/types/memo';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface MemoCreateModalProps {
  onClose: () => void;
}

export default function MemoCreateModal({ onClose }: MemoCreateModalProps) {
  const [memoData, setMemoData] = useState<Omit<MemoProps, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    category: '',
  });

  const router = useRouter();

  const { postMemo } = usePostMemo();

  const submitMemo = useCallback(async () => {
    onClose();
    postMemo(memoData, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error: Error) => {
        console.error('메모 생성 중 오류가 발생했습니다:', error.message);
        // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요 (ex: toast)
      },
    });
  }, [memoData, onClose, postMemo, router]);

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

  const openCategoryModal = useCallback(() => {
    setIsOpenCategoryModal(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal
      onClose={submitMemo}
      isOpen={true}
      aria-label="메모 생성"
      aria-labelledby="memo-create-modal"
      size="large"
      className="max-w-2xl relative sm:h-[70vh] h-[100vh]"
    >
      <div className="absolute top-1 right-1">
        <CrossButton onClick={submitMemo} label="Close editor" />
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
          onClick={openCategoryModal}
          className="absolute -top-1 right-0"
          label="카테고리 추가"
        />
        {isOpenCategoryModal && (
          <div className="absolute top-4 right-1 z-51">
            <CategoryModal onClose={() => setIsOpenCategoryModal(false)} />
          </div>
        )}
      </div>
      <MarkDownEditor
        value={memoData.content}
        onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
      />
    </Modal>
  );
}
