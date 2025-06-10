import { queryKeys } from '@/lib/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetchUndoDeleteMemo = async (id: string) => {
  try {
    const response = await fetch(`/api/memos/restore/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('메모 복원 실패');
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || '메모 복원 중 알 수 없는 오류 발생');
    }
    return data;
  } catch (error) {
    console.error('메모 복원 중 오류 발생:', error);
    throw error;
  }
};

export default function useUndoDeleteMemo() {
  const queryClient = useQueryClient();
  const { mutate: undoDeleteMemo } = useMutation({
    mutationFn: fetchUndoDeleteMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.memo.lists(),
      });
    },
  });
  return { undoDeleteMemo };
}
