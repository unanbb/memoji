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
  const { mutate } = useMutation({
    mutationFn: fetchDeleteMemo,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['memos'],
      });
    },
  });
  return { deleteMemo: mutate };
}
