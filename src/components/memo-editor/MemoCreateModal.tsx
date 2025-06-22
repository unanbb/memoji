'use client';
import CategoryList from '@/components/category/CategoryList';
import CategoryModal from '@/components/category/CategoryModal';
import AddButton from '@/components/common/AddButton';
import CrossButton from '@/components/common/CrossButton';
import MemoEditorSkeleton from '@/components/common/MemoEditorSkeleton';
import LexicalMarkdownEditor from '@/components/memo-editor/LexicalMarkdownEditor/LexicalMarkdownEditor';
import { Modal } from '@/components/Modal';
import showToast from '@/components/toast/showToast';
import useCategories from '@/hooks/useCategories';
import usePostMemo from '@/hooks/usePostMemo';
import { type MemoProps } from '@/types/memo';
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
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);

  const { categories } = useCategories();
  const { postMemo, isLoading } = usePostMemo();

  const submitMemo = useCallback(async () => {
    if (!memoData.content) {
      onClose();
      return;
    }
    try {
      postMemo(memoData);
      onClose();
    } catch (error) {
      console.error('메모 생성 중 오류 발생:', error);
      showToast({
        type: 'error',
        state: '생성',
        name: '메모',
      });
    }
  }, [memoData, onClose, postMemo]);

  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);

  const handleCloseCategoryModal = useCallback(() => {
    setIsOpenCategoryModal(false);
  }, []);

  const handleOpenCategoryModal = useCallback(() => {
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
      className="max-w-5xl w-full relative flex flex-col rounded-lg bg-white shadow-xl sm:h-[85vh] h-full border border-gray-100"
    >
      {isLoading ? (
        <MemoEditorSkeleton />
      ) : (
        <div className="flex h-full flex-col">
          <div className="modal-header flex flex-shrink-0 items-center justify-end gap-2 border-gray-200 px-4 py-2">
            <CrossButton onClick={submitMemo} label="Close editor" className="p-1.5" />
          </div>
          <div className="modal-main flex flex-grow flex-col overflow-y-hidden pb-4 pl-4 pr-4">
            <div className="flex flex-col gap-2">
              <input
                placeholder="제목을 입력하세요"
                name="title"
                value={memoData.title}
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
                    placeholder="카테고리 추가"
                    name="category"
                    value={memoData.category}
                    onChange={handleChange}
                    onFocus={() => setIsCategoryFocused(true)}
                    onBlur={() => setIsCategoryFocused(false)}
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-6 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <AddButton
                      onClick={handleOpenCategoryModal}
                      label="카테고리 추가"
                      className="p-1"
                    />
                  </div>
                  {isCategoryFocused && (
                    <div className="absolute top-full left-0 mt-1 z-5">
                      <CategoryList
                        categories={categories}
                        onMouseDown={name => {
                          setMemoData(prev => ({ ...prev, category: name }));
                        }}
                      />
                    </div>
                  )}
                  {isOpenCategoryModal && (
                    <div className="absolute top-1 left-44 z-50">
                      <CategoryModal onClose={handleCloseCategoryModal} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="h-full flex-grow pt-4 overflow-y-hidden">
              <LexicalMarkdownEditor
                placeholder="마크다운으로 메모를 작성해보세요..."
                value={memoData.content}
                onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
                autoFocus={false}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
