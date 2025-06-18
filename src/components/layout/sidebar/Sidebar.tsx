'use client';
import Separator from '@/components/common/Separator';

import { Skeleton } from '@/components/common/Skeleton';
import { ROUTE } from '@/components/constants/path';
import useCategories from '@/hooks/useCategories';
import { useMemo } from 'react';
import CategoryItem from './CategoryItem';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { categories, isError, isLoading } = useCategories();

  const fiteredCategories = useMemo(
    () => categories.filter(categorie => categorie.memoCount > 0),
    [categories],
  );

  return (
    <aside
      className={`fixed top-0 right-0 w-64 min-h-screen bg-gray-100 overflow-y-auto z-11 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h2 className="font-bold text-lg translate-y-[5px]">Categories</h2>
      </div>
      <div className="py-[19px]">
        <Separator px={4} />
      </div>
      <ul className="">
        {isLoading && (
          <div className="px-4 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="w-24 h-6 bg-gray-300 rounded" />
                <Skeleton className="w-6 h-6 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        )}
        {isError && (
          <li className="px-4 py-2 text-red-500">
            카테고리 가져오기 실패
            <br /> 로그인 후 다시 시도해주세요.
          </li>
        )}
        {fiteredCategories.map((category, index) => (
          <CategoryItem
            key={`category-${category.name}-${index}`}
            name={category.name}
            route={`${ROUTE.CATEGORIES}/${encodeURIComponent(category.name)}`}
            count={category.memoCount}
          />
        ))}
      </ul>
    </aside>
  );
}
