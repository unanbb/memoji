import { Separator } from '@/app/components/common/Seperator';
import Link from 'next/link';

const categories = [
  {
    name: 'Pinned',
    route: '/pinned',
  },
  {
    name: 'All',
    route: '/all',
  },
  {
    name: 'Cooking',
    route: '/cooking',
  },
  {
    name: 'Coding',
    route: '/coding',
  },
  {
    name: 'Others',
    route: '/others',
  },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block fixed top-0 right-0 w-1/4 h-full bg-gray-100 p-4 overflow-y-auto">
      <h2 className="font-bold text-lg">Categories</h2>
      <Separator />
      <ul className="mt-2">
        {categories.map(category => (
          <li key={category.route}>
            <Link href={category.route} className="hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
