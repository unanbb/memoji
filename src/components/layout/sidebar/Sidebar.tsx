import { Separator } from '@/components/common/Separator';
import { CategoryItem } from '@/components/layout/sidebar/CategoryItem';
import ToggleSidebarButton from '@/components/layout/ToggleSidebarButton';
import { categories } from '@/data/mocks';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isOpen, onToggle, className = '' }: SidebarProps) {
  return (
    <aside
      className={`top-0 right-0 w-64 md:w-1/5 min-h-screen bg-gray-100 overflow-y-auto z-11 ${isOpen ? 'block' : 'hidden'} ${className}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h2 className="font-bold text-lg translate-y-[5px]">Categories</h2>
        <ToggleSidebarButton onToggle={onToggle} isOpen={isOpen} />
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
