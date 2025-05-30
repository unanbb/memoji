'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { PiTagChevronFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa6';

export default function CategoryModal({ categories: initialCategories }: { categories: string[] }) {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean[]>(
    new Array(initialCategories.length).fill(false),
  );
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryHovered, setIsCategoryHovered] = useState<boolean[]>(
    new Array(initialCategories.length).fill(false),
  );
  const [value, setValue] = useState<string[]>([...initialCategories]);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
  };

  const handleCreateClick = () => {
    if (newCategory.trim() === '') {
      alert('카테고리 이름을 입력해주세요.');
      // TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요
      return;
    } else {
      console.log('새 카테고리 생성:', newCategory);

      // TODO: 서버에 카테고리 생성 요청 보내는 로직 추가
      // 성공 시 로컬 상태 업데이트:
      setCategories(prev => [...prev, newCategory]);
      setValue(prev => [...prev, newCategory]);
      setIsEditing(prev => [...prev, false]);
      setIsCategoryHovered(prev => [...prev, false]);

      setIsCreating(false);
      setNewCategory('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleMouseEnter = (index: number) => {
    setIsCategoryHovered(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setIsCategoryHovered(prev => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleDeleteClick = (category: string, index: number) => {
    console.log(`${index}. ${category} 삭제`);

    // TODO: 서버에 삭제 요청
    // 성공 시 로컬 상태에서 제거
    setCategories(prev => prev.filter((_, i) => i !== index));
    setValue(prev => prev.filter((_, i) => i !== index));
    setIsEditing(prev => prev.filter((_, i) => i !== index));
    setIsCategoryHovered(prev => prev.filter((_, i) => i !== index));
  };

  const handleModifyClick = (category: string, index: number) => {
    if (isEditing[index]) {
      console.log(`${category} -> ${value[index]} 수정 완료`);

      // TODO: 서버에 수정 요청
      // 성공 시 로컬 상태 업데이트
      setCategories(prev => {
        const newCategories = [...prev];
        newCategories[index] = value[index];
        return newCategories;
      });
    } else {
      console.log(`${category} 수정 시작`);
    }

    setIsEditing(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateClick();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewCategory('');
    }
  };

  return (
    <div className="flex flex-col w-[300px] h-auto min-h-[200px] max-h-[400px] p-4 border border-gray-300 rounded-xs overflow-y-auto">
      <div className="flex justify-between mb-2">
        <h1 className="text-lg font-semibold">Category List</h1>
        <div className="flex w-[28px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl">
          <FaTimes />
        </div>
      </div>
      <div className="flex h-[24px] gap-2 my-2">
        <div
          className="flex w-[24px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
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
            onKeyDown={handleCategoryKeyDown}
          />
        ) : (
          <div>Create New Category</div>
        )}
        {isCreating && (
          <div
            className="ml-auto flex w-[24px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
            onClick={handleCreateClick}
          >
            <FaPlus />
          </div>
        )}
      </div>
      <div>
        <ul>
          {categories.map((category, idx) => (
            <li key={`${category}-${idx}`} className="flex h-[48px] -mx-4 px-4 py-3">
              {!isCategoryHovered[idx] ? (
                <div
                  className="flex items-center justify-center w-[24px] h-[24px] mr-2 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <PiTagChevronFill />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center w-[24px] h-[24px] mr-2 rounded-2xl hover:bg-gray-200 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onClick={() => handleDeleteClick(category, idx)}
                >
                  <IoMdTrash className="p-0.25 w-[20px] h-[20px]" />
                </div>
              )}
              {isEditing[idx] ? (
                <input
                  type="text"
                  value={value[idx]}
                  onChange={e => {
                    const newValue = [...value];
                    newValue[idx] = e.target.value;
                    setValue(newValue);
                  }}
                  className="w-[180px] border-b border-gray-300 focus:border-gray-500 focus:outline-none"
                />
              ) : (
                <span>{category}</span>
              )}
              {isEditing[idx] ? (
                <div
                  className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-2xl hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleModifyClick(category, idx)}
                >
                  <FaCheck className="w-[20px] h-[20px]" />
                </div>
              ) : (
                <div
                  className="ml-auto flex items-center justify-center w-[24px] h-[24px] rounded-2xl hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleModifyClick(category, idx)}
                >
                  <HiPencil className="w-[20px] h-[20px]" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
