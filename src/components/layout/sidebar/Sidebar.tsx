import Separator from '@/components/common/Separator';
import ToggleSidebarButton from '@/components/layout/ToggleSidebarButton';

import { categories } from '@/data/mocks';
import CategoryItem from './CategoryItem';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function Sidebar({ isOpen, onToggle, className = '' }: SidebarProps) {
  const sidebar_px = 4;
  const sidebar_my = 2;

  return (
    <aside
      className={`top-0 right-0 w-64 min-h-screen bg-gray-100 overflow-y-auto z-11 ${isOpen ? 'block' : 'hidden'} ${className}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h2 className="font-bold text-lg translate-y-[5px]">Categories</h2>
        <ToggleSidebarButton onToggle={onToggle} isOpen={isOpen} />
      </div>
      <Separator px={sidebar_px} my={sidebar_my} />
      <ul className="">
        {categories.map((category, index) => (
          <CategoryItem
            key={`category-${category.route}-${index}`}
            name={category.name}
            route={category.route}
            count={category.count}
          />
        ))}
      </ul>
    </aside>
  );
}
