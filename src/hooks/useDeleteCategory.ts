import type { CategoryItem } from '@/types/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchDeleteCategory = async (categoryName: string) => {
  try {
    const response = await fetch(`/api/categories/${encodeURIComponent(categoryName)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('카테고리 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('카테고리 삭제 중 오류 발생:', error);
    if (error instanceof Error) {
      throw new Error(`카테고리 삭제 실패: ${error.message}`);
    } else {
      throw new Error('카테고리 삭제 실패: 알 수 없는 오류');
    }
  }
};

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchDeleteCategory,
    onMutate: async (categoryName: string) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const prev = queryClient.getQueryData<CategoryItem[]>(['categories']);

      queryClient.setQueryData<CategoryItem[]>(['categories'], old =>
        old?.filter(category => category.name !== categoryName),
      );

      return { prev };
    },
    onError: (_err, _variables, context) => {
      // 실패 시 롤백
      if (context?.prev) {
        queryClient.setQueryData(['categories'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return mutate;
}
