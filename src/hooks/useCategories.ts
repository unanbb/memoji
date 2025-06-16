import type { CategoryItem } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

const fetchCategories = async (): Promise<CategoryItem[]> => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error(`카테고리 가져오기 실패: ${response.status}`);
    }
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('카테고리 가져오기 실패:', error);
    if (error instanceof Error) {
      throw new Error(`카테고리 가져오기 실패: ${error.message}`);
    }
    throw new Error('카테고리 가져오기 실패: 알 수 없는 오류');
  }
};

export default function useCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    initialData: [],
  });

  return { categories: data, isLoading, isError };
}
