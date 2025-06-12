import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchCreateCategory = async (category: { category: string }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('카테고리 생성에 실패했습니다.');
    }

    console.log(`새 카테고리 생성! : ${category}`);
  } catch (error) {
    console.error('카테고리 생성 중 오류 발생:', error);
    throw new Error('카테고리 생성 중 오류가 발생했습니다.');
  }
};

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchCreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });

  return mutate;
}
