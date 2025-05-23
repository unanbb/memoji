import { Separator } from '@/components/common/Separator';
import { CategoryItem } from '@/components/layout/sidebar/CategoryItem';
import { categories } from '@/data/mocks';
import { MdMenu } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isOpen, onToggle, className = '' }: SidebarProps) {
  return (
    <aside
      className={`top-0 right-0 w-64 md:w-1/5 min-h-screen bg-gray-100 overflow-y-auto ${isOpen ? 'block' : 'hidden'} ${className}`}
    >
      <div className="flex items-center justify-between px-4 mt-2 pb-1">
        <h2 className="font-bold text-lg">Categories</h2>
        <button
          onClick={onToggle}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Toggle Sidebar"
          title="Toggle Sidebar"
        >
          <MdMenu size={32} />
        </button>
      </div>
      <Separator />
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
