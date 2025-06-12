import { useMutation, useQueryClient } from '@tanstack/react-query';

export const fetchModifyCategory = async ({categoryName, newCategoryName} : {categoryName: string, newCategoryName: string}) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/categorfies/${encodeURIComponent(categoryName)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newName: newCategoryName,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('카테고리 수정에 실패했습니다.');
    }

    console.log(`카테고리명 수정 성공! ${categoryName} -> ${newCategoryName}`);
  } catch (error) {
    console.error('카테고리 수정 중 오류 발생: ', error);
    throw new Error('카테고리 수정 중 오류가 발생했습니다.');
  }
};

export default function useModifyCategory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchModifyCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });

  return mutate;
}
