'use client';

import type { CategoryItem } from '@/types/category';

export default function CategoryList({
  categories,
  onClick,
}: {
  categories: CategoryItem[];
  onClick: (category: string) => void;
}) {
  if (categories.length === 0) {
    return <div className="w-[200px] h-[200px] py-2">카테고리가 없습니다.</div>;
  }

  return (
    <div className="max-h-[250px] overflow-y-auto w-[200px] h-auto py-2 rounded-xs bg-white shadow-sm text-neutral-800">
      <ul>
        {categories.map((category, idx) => {
          const { name } = category;
          return (
            <li
              key={`${category}-${idx}`}
              className="px-2.5 py-1 cursor-pointer hover:bg-gray-100"
              onMouseDown={() => onClick(name)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
