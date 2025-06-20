import { queryKeys } from '@/lib/queryKeys';
import { type MemoProps } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchDeleteMemo(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`/api/memos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete memo');
    }
    return { success: true, message: id };
  } catch (error) {
    console.error('Error deleting memo:', error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'Unknown error occurred while deleting memo' };
    }
  }
}

export default function useDeleteMemo() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<
    Awaited<ReturnType<typeof fetchDeleteMemo>>,
    Error,
    string,
    { previousMemo?: MemoProps; previousMemos?: MemoProps[] }
  >({
    mutationFn: fetchDeleteMemo,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.memo.detail(id) });
      const previousMemo = queryClient.getQueryData<MemoProps>(queryKeys.memo.detail(id));
      await queryClient.cancelQueries({ queryKey: queryKeys.memo.lists() });
      const previousMemos = queryClient.getQueryData<MemoProps[]>(queryKeys.memo.lists());
      if (previousMemo) {
        queryClient.removeQueries({ queryKey: queryKeys.memo.detail(id) });
      }
      if (previousMemos) {
        queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), old => {
          if (!old) return old;
          return old.filter(memo => memo.id !== id);
        });
      }
      return { previousMemo, previousMemos };
    },
    onError: (_error, id, context) => {
      if (context?.previousMemo) {
        queryClient.setQueryData(queryKeys.memo.detail(id), context.previousMemo);
      }
      if (context?.previousMemos) {
        queryClient.setQueryData(queryKeys.memo.lists(), context.previousMemos);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.category.lists() });
    },
  });
  return { deleteMemo: mutateAsync };
}
