import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';

export const fetchCreateMemo = async (
  memoData: Omit<MemoProps, 'id' | 'createdAt'>,
): Promise<MemoProps> => {
  try {
    const response = await fetch(`/api/memos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoData),
    });

    if (!response.ok) {
      throw new Error('메모 생성에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('메모 생성 중 오류 발생:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default function usePostMemo() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation<
    Awaited<ReturnType<typeof fetchCreateMemo>>,
    Error,
    Omit<MemoProps, 'id' | 'createdAt'>,
    { previousMemos?: MemoProps[]; newOptimisticMemo?: MemoProps }
  >({
    mutationFn: fetchCreateMemo,
    onMutate: async newMemo => {
      await queryClient.cancelQueries({ queryKey: queryKeys.memo.lists() });
      const previousMemos = queryClient.getQueryData<MemoProps[]>(queryKeys.memo.lists());

      const newOptimisticMemo: MemoProps = {
        ...newMemo,
        id: `Temp-${crypto.randomUUID()}`,
        category: newMemo?.category || 'others',
        createdAt: Timestamp.now(),
      };

      queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), old => {
        if (!old) return [newOptimisticMemo];
        return [newOptimisticMemo, ...old];
      });
      return { previousMemos, newOptimisticMemo };
    },

    onSuccess: (createdMemo, _variables, context) => {
      queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), old => {
        if (!old) return [createdMemo];
        return old.map(memo =>
          memo.id === context.newOptimisticMemo?.id ? { ...memo, ...createdMemo } : memo,
        );
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.category.lists() });
    },
    onError: (error, newMemo, context) => {
      queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), context?.previousMemos);
      console.error('메모 생성 중 오류 발생:', error);
    },
  });

  return { postMemo: mutateAsync, isLoading: isPending };
}
