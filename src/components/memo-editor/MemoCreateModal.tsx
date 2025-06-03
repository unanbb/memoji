'use client';
import { fetchCreateMemo } from '@/action';
import CategoryModal from '@/components/category/CategoryModal';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import useCategories from '@/hooks/useCategories';
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

  const submitMemo = useCallback(async () => {
    onClose();
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
    router.push('/');
  }, [memoData, onClose, router]);

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

  const { categories, isLoading } = useCategories();

  const openCategoryModal = useCallback(() => {
    setIsOpenCategoryModal(true);
  }, []);

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
          label="메모 제목"
          value={memoData.title}
          variant="title"
          onChange={e => setMemoData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>
      <div className="mb-4 relative">
        <InputField
          placeholder="카테고리"
          label="메모 카테고리"
          value={memoData.category}
          onChange={e => setMemoData(prev => ({ ...prev, category: e.target.value }))}
        />
        <AddButton
          onClick={openCategoryModal}
          className="absolute -top-1 right-0"
          label="카테고리 추가"
        />
        {isOpenCategoryModal &&
          (isLoading ? (
            <div className="text-gray-500">카테고리 불러오는 중...</div>
          ) : (
            <div className="absolute top-4 right-1 z-51">
              <CategoryModal
                onClose={() => setIsOpenCategoryModal(false)}
                categories={categories}
              />
            </div>
          ))}
      </div>
      <MarkDownEditor
        value={memoData.content}
        onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
      />
    </Modal>
  );
}
