'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { PiTagChevronFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa6';

export default function CategoryModal({
  categories: initialCategories,
  onClose,
}: {
  categories: string[];
  onClose: () => void;
}) {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isCreating, setIsCreating] = useState(false);

  const [newCategory, setNewCategory] = useState('');

  const [categoryStates, setCategoryStates] = useState(() =>
    initialCategories.map(() => ({
      isEditing: false,
      isHovered: false,
      editValue: '',
    })),
  );

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
  };

  const handleCreateClick = () => {
    if (newCategory.trim() === '') {
      alert('카테고리 이름을 입력해주세요.');
      // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요
      return;
    } else if (categories.includes(newCategory.trim())) {
      alert('이미 존재하는 카테고리입니다.');
      return;
    } else {
      console.log('새 카테고리 생성:', newCategory);

      // TODO: 서버에 카테고리 생성 요청
      // 성공 시 로컬 상태 업데이트:
      setCategories(prev => [...prev, newCategory]);
      setCategoryStates(prev => [
        ...prev,
        { isEditing: false, isHovered: false, editValue: newCategory },
      ]);

      setIsCreating(false);
      setNewCategory('');
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
      return;
    }
    console.log(`${index}. ${category} 삭제`);

    // TODO: 서버에 삭제 요청
    // 성공 시 로컬 상태에서 제거
    setCategories(prev => prev.filter((_, i) => i !== index));
    setCategoryStates(prev => prev.filter((_, i) => i !== index));
  };

  const handleModifyClick = (category: string, index: number) => {
    const target = categoryStates[index];
    if (target.isEditing) {
      if (target.editValue.trim() === '') {
        alert('카테고리 이름을 입력해주세요.');
        return;
      } else if (categories.includes(target.editValue.trim())) {
        alert('이미 존재하는 카테고리입니다.');
        return;
      }

      console.log(`${category} -> ${target.editValue} 수정 완료`);

      // TODO: 서버에 수정 요청

      // 로컬 상태 업데이트: 이름 변경 & isEditing 종료
      setCategories(prev => prev.map((c, i) => (i === index ? target.editValue.trim() : c)));
      setCategoryStates(prev =>
        prev.map((state, i) => (i === index ? { ...state, isEditing: false } : state)),
      );
    } else {
      console.log(`${category} 수정 시작`);
      setCategoryStates(prev =>
        prev.map((state, i) =>
          i === index ? { ...state, isEditing: true, editValue: category } : state,
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
    <div className="flex flex-col w-[300px] h-auto min-h-[200px] max-h-[400px] p-4 border border-gray-300 rounded-xs overflow-y-auto">
      <div className="flex justify-between mb-2">
        <h1 className="text-lg font-semibold">Category List</h1>
        <div
          className="flex w-[28px] aspect-square items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
          onClick={onClose}
        >
          <FaTimes />
        </div>
      </div>
      <div className="flex h-[24px] gap-2 my-2">
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
      <div>
        <ul>
          {categories.map((category, idx) => {
            const { isEditing, isHovered, editValue } = categoryStates[idx] || {};

            return (
              <li key={`${category}-${idx}`} className="flex h-[48px] -mx-4 px-4 py-3">
                <div
                  className={`flex items-center justify-center w-[24px] h-[24px] mr-2 rounded-2xl ${
                    isHovered ? 'hover:bg-gray-200 cursor-pointer' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onClick={isHovered ? () => handleDeleteClick(category, idx) : undefined}
                >
                  {isHovered ? (
                    <IoMdTrash className="p-0.25 w-[20px] h-[20px]" />
                  ) : (
                    <PiTagChevronFill />
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => handleEditInputChange(idx, e.target.value)}
                    onKeyDown={e => handleCategoryModifyKeyDown(e, category, idx)}
                    className="w-[180px] border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                ) : (
                  <span>{category}</span>
                )}

                <div
                  className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-2xl hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleModifyClick(category, idx)}
                >
                  {isEditing ? (
                    <FaCheck className="w-[20px] h-[20px]" />
                  ) : (
                    <HiPencil className="w-[20px] h-[20px]" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
