import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchUpdateMemo(
  id: string,
  memo: Omit<MemoProps, 'createdAt'>,
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
    mutationFn: (params: { id: string; memo: Omit<MemoProps, 'createdAt'> }) =>
      fetchUpdateMemo(params.id, params.memo),
    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: queryKeys.memo.detail(variables.id) });
      await queryClient.cancelQueries({ queryKey: queryKeys.memo.lists() });
      const previousMemo = queryClient.getQueryData<MemoProps>(queryKeys.memo.detail(variables.id));
      const previousMemos = queryClient.getQueryData<MemoProps[]>(queryKeys.memo.lists());

      if (previousMemo) {
        queryClient.setQueryData<MemoProps>(queryKeys.memo.detail(variables.id), old => {
          if (!old) return old;
          return {
            ...old,
            ...variables.memo,
          };
        });
      }

      if (previousMemos) {
        queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), old => {
          if (!old) return old;
          return old.map(memo =>
            memo.id === variables.id ? { ...memo, ...variables.memo } : memo,
          );
        });
      }

      return { previousMemo, previousMemos };
    },
    onError: (error, variables, context) => {
      if (context?.previousMemo) {
        queryClient.setQueryData<MemoProps>(
          queryKeys.memo.detail(variables.id),
          context.previousMemo,
        );
      }
      if (context?.previousMemos) {
        queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), context.previousMemos);
      }
      console.error('Error updating memo:', error);
      throw error;
    },
  });

  return { updateMemo: mutation.mutate };
}
