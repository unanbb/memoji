import { queryKeys } from '@/lib/queryKeys';
import type { CategoryItem } from '@/types/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchModifyCategory = async ({
  categoryName,
  newCategoryName,
}: {
  categoryName: string;
  newCategoryName: string;
}) => {
  const response = await fetch(`/api/categories/${encodeURIComponent(categoryName)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newName: newCategoryName,
    }),
  });

  if (!response.ok) {
    throw new Error('카테고리 수정에 실패했습니다.');
  }

  console.log(`카테고리명 수정 성공! ${categoryName} -> ${newCategoryName}`);
};

export default function useModifyCategory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchModifyCategory,
    onMutate: async ({
      categoryName,
      newCategoryName,
    }: {
      categoryName: string;
      newCategoryName: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const prev = queryClient.getQueryData<CategoryItem[]>(['categories']);
      queryClient.setQueryData<CategoryItem[]>(['categories'], old =>
        old?.map(category =>
          category.name === categoryName ? { ...category, name: newCategoryName } : category,
        ),
      );

      return { prev, categoryName };
    },
    onError: (_err, _variables, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['categories'], context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.memo.lists() });
    },
  });

  return mutate;
}
