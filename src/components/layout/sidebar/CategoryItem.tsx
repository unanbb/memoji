import Link from 'next/link';

interface CategoryItemProps {
  name: string;
  route: string;
  key: string;
  count?: number;
}

export function CategoryItem({ name, route, count, key }: CategoryItemProps) {
  return (
    <li className="py-2 pl-6 hover:bg-gray-200 rounded-md" key={key}>
      <Link
        href={route}
        className="block w-full h-full"
        aria-label={`${name} 카테고리${count !== undefined ? `, ${count}개 항목` : ''}`}
      >
        {name}
        {count !== undefined && <span className="text-gray-500 text-sm ml-2">({count})</span>}
      </Link>
    </li>
  );
}
