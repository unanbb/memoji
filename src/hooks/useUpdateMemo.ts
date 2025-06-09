import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchUpdateMemo(
  id: string,
  memo: Omit<MemoProps, 'id' | 'createdAt'>,
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`/api/memos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memo),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error updating memo: ${errorData.message}`);
    }
    return { success: true, message: 'Memo updated successfully' };
  } catch (error) {
    console.error('Error updating memo:', error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'Unknown error occurred while updating memo' };
    }
  }
}

export default function useUpdateMemo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: { id: string; memo: Omit<MemoProps, 'id' | 'createdAt'> }) =>
      fetchUpdateMemo(params.id, params.memo),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memo.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.memo.lists() });
    },
  });

  return { updateMemo: mutation.mutate };
}
