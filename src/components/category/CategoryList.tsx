'use client';

export default function CategoryList({ categories }: { categories: string[] }) {
  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  if (sortedCategories.length === 0) {
    return <div className="w-[200px] h-[200px] py-2">카테고리가 없습니다.</div>;
  }

  return (
    <div className="max-h-[250px] overflow-y-auto w-[200px] h-auto py-2 rounded-xs bg-white shadow-sm text-neutral-800">
      <ul>
        {sortedCategories.map(category => {
          return (
            <li
              key={category}
              className="px-2.5 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => console.log(category)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
