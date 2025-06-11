import type { CategoryItem } from '@/types/category';
import { useEffect, useState } from 'react';

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
    return [];
  }
};
export default function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { categories, isLoading };
}
