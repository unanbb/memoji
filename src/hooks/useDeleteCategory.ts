import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchDeleteCategory = async (categoryName: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/categories/${encodeURIComponent(categoryName)}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('카테고리 삭제에 실패했습니다.');
    }

    console.log(`카테고리 ${categoryName} 삭제 성공!`);
  } catch (error) {
    console.error('카테고리 삭제 중 오류 발생: ', error);
    throw new Error('카테고리 삭제 중 오류가 발생했습니다.');
  }
};

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchDeleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return mutate;
}
