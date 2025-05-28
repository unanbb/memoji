'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { IoMdArrowDropright, IoMdTrash } from 'react-icons/io';

export default function CategoryModal({ categories }: { categories: string[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [isCategoryHovered, setIsCategoryHovered] = useState<boolean[]>([]);

  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  const handlePlusClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCreateClick = () => {
    if (newCategory.trim() === '') {
      alert('카테고리 이름을 입력해주세요.');
    } else {
      console.log('새 카테고리 생성:', newCategory);
      setIsEditing(!isEditing);

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

  useEffect(() => {
    setIsCategoryHovered(new Array(categories.length).fill(false));
  }, [categories]);

  return (
    <div className="flex flex-col w-[300px] h-auto min-h-[200px] max-h-[400px] p-4 border border-gray-300 rounded-xs overflow-y-auto">
      <div className="flex justify-between mb-2">
        <h1 className="text-lg font-semibold">Category List</h1>
        <div className="flex w-[28px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl">
          <FaTimes />
        </div>
      </div>
      <div className="flex h-[32px] gap-2 my-2">
        <div
          className="flex w-[24px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
          onClick={handlePlusClick}
        >
          {isEditing ? <FaTimes /> : <FaPlus />}
        </div>
        {isEditing ? (
          <input
            type="text"
            value={newCategory}
            onChange={handleChange}
            placeholder="새 카테고리 입력"
            className="w-[200px] border-b border-gray-300 focus:border-gray-500 focus:outline-none flex-grow"
            onBlur={handleCreateClick}
          />
        ) : (
          <div>Create New Category</div>
        )}
        {isEditing && (
          <div
            className="flex w-[24px] aspect-ratio items-center justify-center cursor-pointer hover:bg-gray-200 rounded-2xl"
            onClick={handleCreateClick}
          >
            <FaPlus />
          </div>
        )}
      </div>
      <div>
        <ul>
          {sortedCategories.map((category, idx) => (
            <li
              key={category}
              className="flex -mx-4 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log(category)}
            >
              {!isCategoryHovered[idx] ? (
                <IoMdArrowDropright
                  className="flex items-center justify-center w-[24px] h-full mr-2 rounded-2xl hover:bg-gray-200"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                />
              ) : (
                <IoMdTrash
                  className="flex items-center justify-center w-[24px] h-[24px] p-1 mr-2 rounded-2xl hover:bg-gray-200"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onClick={()=> console.log(`${category} 삭제`)}
                />
              )}
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

{
  /* <input type="text" placeholder="카테고리 입력" className="border-b-1  focus:outline-none"/> */
}
