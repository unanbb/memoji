import type { CategoryItem } from '@/types/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchDeleteCategory = async (categoryName: string) => {
  const response = await fetch(`/api/categories/${encodeURIComponent(categoryName)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('카테고리 삭제에 실패했습니다.');
  }

  console.log(`카테고리 ${categoryName} 삭제 성공!`);
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
