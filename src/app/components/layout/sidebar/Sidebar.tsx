import { Separator } from '@/app/components/common/Separator';
import { CategoryItem } from '@/app/components/layout/sidebar/CategoryItem';
import { categories } from '@/data/mocks';
import { MdMenu } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`top-0 right-0 w-1/5 min-h-screen bg-gray-100 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="flex items-center justify-between px-4 mt-2 pb-1">
        <h2 className="font-bold text-lg">Categories</h2>
        <MdMenu size={32} />
      </div>
      <Separator />
      <ul className="">
        {categories.map(category => (
          <CategoryItem
            key={category.route}
            name={category.name}
            route={category.route}
            count={category.count}
          />
        ))}
      </ul>
    </aside>
  );
}
