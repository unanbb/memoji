'use client';

import { fetchCreateCategory, fetchDeleteCategory, fetchModifyCategory } from '@/action';
import useCategories from '@/hooks/useCategories';
import { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { HiPencil } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { PiTagChevronFill } from 'react-icons/pi';
import showToast from '@/components/toast/showToast';

export default function CategoryModal({ onClose }: { onClose: () => void }) {
  const { categories: fetchedCategories, isLoading } = useCategories();
  const [isCreating, setIsCreating] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryStates, setCategoryStates] = useState<
    { name: string; isEditing: boolean; isHovered: boolean; editValue: string; error?: string }[]
  >([]);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    setCategoryStates(() =>
      fetchedCategories.map((categoryName: string) => ({
        name: categoryName,
        isEditing: false,
        isHovered: false,
        editValue: '',
        error: '',
      })),
    );
  }, [fetchedCategories]);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
  };

  const handleCreateClick = async () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory === '') {
      setIsError('카테고리 명을 입력해주세요.');
      return;
    } else if (
      categoryStates.some(category => category.name.toLowerCase() === trimmedCategory.toLowerCase())
    ) {
      setIsError('이미 존재하는 카테고리입니다.');
      return;
    } else {
      setIsError('');

      try {
        // 로컬 상태 업데이트
        setCategoryStates(prev => [
          { name: trimmedCategory, isEditing: false, isHovered: false, editValue: trimmedCategory },
          ...prev,
        ]);
        // Create 상태 off & input창 비움
        setIsCreating(false);
        setNewCategory('');

        await fetchCreateCategory({ category: trimmedCategory });

        showToast({
          name: '카테고리',
          state: '생성',
        });
      } catch (error) {
        console.error('카테고리 생성 실패', error);
        showToast({
          name: '카테고리',
          state: '생성',
          type: 'error',
        });
        throw new Error('카테고리 생성 실패');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleMouseEnter = (index: number) => {
    setCategoryStates(prev =>
      prev.map((state, i) => (i === index ? { ...state, isHovered: true } : state)),
    );
  };

  const handleMouseLeave = (index: number) => {
    setCategoryStates(prev =>
      prev.map((state, i) => (i === index ? { ...state, isHovered: false } : state)),
    );
  };

  const handleDeleteClick = async (category: string, index: number) => {
    // 서버에 삭제 요청
    try {
      await fetchDeleteCategory(category);

      showToast({
        name: '카테고리',
        state: '삭제',
      });

      // 성공 시 로컬 상태에서 제거
      setCategoryStates(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('카테고리 삭제 실패', error);
      showToast({
        name: '카테고리',
        state: '삭제',
        type: 'error',
      });
    }
  };

  const handleModifyClick = async (categoryName: string, index: number) => {
    const target = categoryStates[index];

    if (target.isEditing) {
      // isEditing이 true -> 데이터를 수정하는 로직
      const newCategoryName = target.editValue.trim();
      if (newCategoryName === '') {
        setCategoryStates(prev =>
          prev.map((state, i) =>
            i === index ? { ...state, error: '카테고리 명을 입력해주세요.' } : state,
          ),
        );
        return;
      } else if (
        newCategoryName.toLowerCase() !== categoryName.toLowerCase() &&
        categoryStates.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase())
      ) {
        setCategoryStates(prev =>
          prev.map((state, i) =>
            i === index ? { ...state, error: '이미 존재하는 카테고리입니다.' } : state,
          ),
        );
        return;
      }

      try {
        // 서버에 삭제 요청
        await fetchModifyCategory(categoryName, newCategoryName);

        // 로컬 상태 업데이트: 이름 변경 & isEditing 종료
        setCategoryStates(prev =>
          prev.map((state, i) =>
            i === index ? { ...state, name: target.editValue, isEditing: false, error: '' } : state,
          ),
        );

        showToast({
          name: '카테고리',
          state: '수정',
        });
      } catch (error) {
        console.error('카테고리 수정 실패.', error);

        showToast({
          name: '카테고리',
          state: '수정',
          type: 'error',
        });
      }
    } else {
      // isEditing이 false -> true로 바꾸고 수정 모드로 진입
      setCategoryStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, editValue: state.name, isEditing: true } : state,
        ),
      );
    }
  };

  const handleEditInputChange = (index: number, value: string) => {
    setCategoryStates(prev =>
      prev.map((state, i) => (i === index ? { ...state, editValue: value } : state)),
    );
  };

  const handleCategoryCreateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateClick();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewCategory('');
    }
  };

  const handleCategoryModifyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    category: string,
    index: number,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModifyClick(category, index);
    } else if (e.key === 'Escape') {
      setCategoryStates(prev =>
        prev.map((state, i) => (i === index ? { ...state, isEditing: false } : state)),
      );
    }
  };

  return (
    <div className="bg-white flex flex-col w-[300px] h-auto min-h-[200px] max-h-[400px] p-4 pr-0 border border-gray-300 rounded-xs overflow-y-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-between mb-2  pr-4">
            <h1 className="text-lg font-semibold">Category List</h1>
            <div
              className="flex w-[28px] aspect-square items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
              onClick={onClose}
            >
              <FaTimes />
            </div>
          </div>
          <div className="flex h-[24px] gap-2 my-2 pr-4">
            <div
              className="flex w-[24px] aspect-square items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
              onClick={handlePlusClick}
            >
              {isCreating ? <FaTimes /> : <FaPlus />}
            </div>
            {isCreating ? (
              <input
                type="text"
                value={newCategory}
                onChange={handleChange}
                placeholder="새 카테고리 입력"
                className="w-[180px] border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                onKeyDown={handleCategoryCreateKeyDown}
              />
            ) : (
              <div>Create New Category</div>
            )}
            {isCreating && (
              <div
                className="ml-auto flex w-[24px] aspect-square items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
                onClick={handleCreateClick}
              >
                <FaPlus />
              </div>
            )}
          </div>
          {isError && <span className="pl-8 text-red-600 text-sm">{isError}</span>}
          <div className="overflow-y-auto pr-4">
            <ul>
              {categoryStates.map((category, idx) => (
                <li key={`${category}-${idx}`} className="flex h-[48px] -mx-4 px-4 py-3">
                  <div
                    className={`flex items-center justify-center w-[24px] h-[24px] mr-2 rounded-2xl ${'hover:bg-gray-200 cursor-pointer'}`}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    onClick={() => {
                      if (category.isHovered || window.innerWidth <= 768) {
                        handleDeleteClick(category.name, idx);
                      }
                    }}
                  >
                    {category.isHovered ? (
                      <IoMdTrash className="p-0.25 w-[20px] h-[20px]" />
                    ) : (
                      <PiTagChevronFill />
                    )}
                  </div>

                  {category.isEditing ? (
                    <div className="flex flex-col">
                      <input
                        type="text"
                        value={category.editValue}
                        onChange={e => handleEditInputChange(idx, e.target.value)}
                        onKeyDown={e => handleCategoryModifyKeyDown(e, category.name, idx)}
                        className="w-[180px] border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                      />
                      {category.error && (
                        <span className="text-xs text-red-600 pt-1 pb-1">{category.error}</span>
                      )}
                    </div>
                  ) : (
                    <span>{category.name}</span>
                  )}

                  <div
                    className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-2xl hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleModifyClick(category.name, idx)}
                  >
                    {category.isEditing ? (
                      <FaCheck className="w-[20px] h-[20px]" />
                    ) : (
                      <HiPencil className="w-[20px] h-[20px]" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
