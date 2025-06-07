'use client';

import { fetchCreateCategory } from '@/action';
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
    { name: string; isEditing: boolean; isHovered: boolean; editValue: string }[]
  >([]);

  useEffect(() => {
    setCategoryStates(() =>
      fetchedCategories.map((categoryName: string) => ({
        name: categoryName,
        isEditing: false,
        isHovered: false,
        editValue: '',
      })),
    );
  }, [fetchedCategories]);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
  };

  const handleCreateClick = async () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory === '') {
      alert('카테고리 이름을 입력해주세요.');
      //TODO: 토스트 or 모달로 개선 필요
      return;
    } else if (
      categoryStates.some(category => category.name.toLowerCase() === trimmedCategory.toLowerCase())
    ) {
      alert('이미 존재하는 카테고리입니다.');
      //TODO: 토스트 or 모달로 개선 필요
      return;
    } else {
      console.log('새 카테고리 생성:', trimmedCategory);

      try {
        // 로컬 상태 업데이트
        setCategoryStates(prev => [
          { name: trimmedCategory, isEditing: false, isHovered: false, editValue: trimmedCategory },
          ...prev,
        ]);
        // Create 상태 off & input창 비움
        setIsCreating(false);
        setNewCategory('');

        const res = await fetchCreateCategory({ category: trimmedCategory });
        console.log('카테고리 생성 성공!', res);
        showToast({
          name: '카테고리',
          type: '생성',
          ariaLabel: '카테고리 생성 알림',
        });
      } catch (error) {
        console.error('카테고리 생성 실패', error);
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

  const handleDeleteClick = (category: string, index: number) => {
    if (!confirm(`"${category}" 카테고리를 삭제하시겠습니까?`)) {
      setCategoryStates(prev =>
        prev.map((state, i) => (i === index ? { ...state, isHovered: false } : state)),
      );
      return;
    }
    console.log(`${index}. ${category} 삭제`);

    // TODO: 서버에 삭제 요청
    // 성공 시 로컬 상태에서 제거
    setCategoryStates(prev => prev.filter((_, i) => i !== index));
  };

  const handleModifyClick = (categoryName: string, index: number) => {
    const target = categoryStates[index];
    if (target.isEditing) {
      const trimmedValue = target.editValue.trim();
      if (trimmedValue === '') {
        alert('카테고리 이름을 입력해주세요.');
        //TODO: 토스트 or 모달로 개선 필요
        return;
      } else if (
        trimmedValue.toLowerCase() !== categoryName.toLowerCase() &&
        categoryStates.some(cat => cat.name.toLowerCase() === trimmedValue.toLowerCase())
      ) {
        alert('이미 존재하는 카테고리입니다.');
        //TODO: 토스트 or 모달로 개선 필요
        return;
      }

      // 로컬 상태 업데이트: 이름 변경 & isEditing 종료
      setCategoryStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, name: target.editValue, isEditing: false } : state,
        ),
      );

      console.log(`${categoryName} -> ${target.editValue} 수정 완료`);

      // TODO: 서버에 수정 요청
    } else {
      console.log(`${categoryName} 수정 시작`);
      setCategoryStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, isEditing: true, editValue: categoryName } : state,
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
                    <input
                      type="text"
                      value={category.editValue}
                      onChange={e => handleEditInputChange(idx, e.target.value)}
                      onKeyDown={e => handleCategoryModifyKeyDown(e, category.name, idx)}
                      className="w-[180px] border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                    />
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
