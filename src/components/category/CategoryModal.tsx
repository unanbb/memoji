'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { PiTagChevronFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa6';

export default function CategoryModal({ categories }: { categories: string[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryHovered, setIsCategoryHovered] = useState<boolean[]>([]);

  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
  };

  const handleCreateClick = () => {
    if (newCategory.trim() === '') {
      alert('카테고리 이름을 입력해주세요.');
    } else {
      console.log('새 카테고리 생성:', newCategory);
      setIsCreating(!isCreating);

      /**
       * 카테고리 생성 로직
       *  */

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

  const handleModifyClick = (category: string, index: number) => {
    setIsEditing(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];

      if(newStates[index]) {
      console.log(`${category} 수정 중`);
      } else {
        console.log(`${category} 수정 완료`);
        // 수정 로직 (예: 서버로 업데이트 요청)
      }

      return newStates;
    });
  };

  useEffect(() => {
    setIsCategoryHovered(new Array(categories.length).fill(false));
    setIsEditing(new Array(categories.length).fill(false));
  }, [categories]);

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
            onBlur={handleCreateClick}
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
          {sortedCategories.map((category, idx) => (
            <li key={category} className="flex h-[48px] -mx-4 px-4 py-3">
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
                  onClick={() => console.log(`${category} 삭제`)}
                >
                  <IoMdTrash className="p-0.25 w-[20px] h-[20px]" />
                </div>
              )}
              {isEditing[idx] ? (
                <input
                  type="text"
                  value={category}
                  onChange={() => {}}
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
