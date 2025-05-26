'use client';

export default function CategoryList({ categories }: { categories: string[] }) {
  const uniqueCategories = [...new Set(categories)].sort((a, b) => a.localeCompare(b)); // 중복 제거 및 정렬

  if (uniqueCategories.length === 0) {
    return <div className="w-[200px] h-[200px] py-2">카테고리가 없습니다.</div>;
  }

  return (
    <div className="w-[200px] h-auto py-2 rounded-xs bg-white shadow-sm">
      <ul>
        {uniqueCategories.map(category => {
          return (
            <li key={category} className="px-2.5 py-1 cursor-pointer hover:bg-gray-100" onClick={() => console.log(category)}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}