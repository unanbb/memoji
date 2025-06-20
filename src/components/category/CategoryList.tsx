'use client';

import type { CategoryItem } from '@/types/category';

export default function CategoryList({
  categories,
  onMouseDown,
}: {
  categories: CategoryItem[];
  onMouseDown: (category: string) => void;
}) {
  if (categories.length === 0) {
    return <div className="w-[200px] h-[200px] py-2">카테고리가 없습니다.</div>;
  }

  return (
    <div className="max-h-[250px] overflow-y-auto w-[200px] h-auto py-2 rounded-xs bg-white shadow-sm text-neutral-800">
      <ul>
        {categories.map(category => {
          const { name, id } = category;
          return (
            <li
              key={id}
              className="px-2.5 py-1 cursor-pointer hover:bg-gray-100"
              onMouseDown={() => onMouseDown(name)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
