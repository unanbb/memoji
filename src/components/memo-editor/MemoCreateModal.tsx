'use client';
import CategoryModal from '@/components/category/CategoryModal';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
import LexicalMarkdownEditor from '@/components/memo-editor/LexicalMarkdownEditor/LexicalMarkdownEditor';
import MemoEditorSkeleton from '@/components/memo-editor/MemoEditorSkeleton';
import { Modal } from '@/components/Modal';
import showToast from '@/components/toast/showToast';
import usePostMemo from '@/hooks/usePostMemo';
import { type MemoProps } from '@/types/memo';
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

  const { postMemo, isLoading } = usePostMemo();

  const submitMemo = useCallback(async () => {
    if (!memoData.content) {
      // console.error('메모 내용은 필수입니다.');
      onClose();
      return;
    }
    postMemo(memoData, {
      onSuccess: () => {
        console.log('메모가 성공적으로 생성되었습니다.');
        router.push('/');
        onClose();
      },
      onError: (error: Error) => {
        showToast({
          type: 'error',
          state: '생성',
          name: '메모',
        });
        console.error('메모 생성 중 오류 발생:', error);
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
      className="max-w-4xl relative sm:h-[85%] h-full"
    >
      {isLoading ? (
        <MemoEditorSkeleton />
      ) : (
        <>
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
          <LexicalMarkdownEditor
            autoFocus
            placeholder="내용을 입력하세요..."
            value={memoData.content}
            onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
          />
        </>
      )}
    </Modal>
  );
}
