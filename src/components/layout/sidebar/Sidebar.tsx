import Separator from '@/components/common/Separator';

import { categories } from '@/data/mocks';
import CategoryItem from './CategoryItem';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 right-0 w-64 min-h-screen bg-gray-100 overflow-y-auto z-11 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h2 className="font-bold text-lg translate-y-[5px]">Categories</h2>
      </div>
      <div className="py-[19px]">
        <Separator px={4} />
      </div>
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
