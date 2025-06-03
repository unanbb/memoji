import { useEffect, useState } from 'react';

const fetchCategories = async (): Promise<string[]> => {
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
  const [categories, setCategories] = useState<string[]>([]);
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
