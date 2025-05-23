import Link from 'next/link';

interface CategoryItemProps {
  name: string;
  route: string;
  count?: number;
}

export function CategoryItem({ name, route, count }: CategoryItemProps) {
  return (
    <Link href={route}>
      <li key={route} className="py-2 pl-6 hover:bg-gray-200 rounded-md">
        {name}
        {count !== undefined && <span className="text-gray-500 text-sm ml-2">({count})</span>}
      </li>
    </Link>
  );
}
