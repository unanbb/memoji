import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';

export const fetchCreateMemo = async (memoData: Omit<MemoProps, 'id' | 'createdAt'>) => {
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
  const { mutate, isPending } = useMutation({
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

      if (previousMemos) {
        queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), old => {
          if (!old) return [newOptimisticMemo];
          return [newOptimisticMemo, ...old];
        });
      }
      return { previousMemos };
    },
    onError: (error, newMemo, context) => {
      queryClient.setQueryData<MemoProps[]>(queryKeys.memo.lists(), context?.previousMemos);
      console.error('메모 생성 중 오류 발생:', error);
    },
    onSettled: () => {
      // TODO: 전체 메모 목록을 리패치하는 대신, 새로 생성된 메모만 추가하는 방법을 고려하기
      queryClient.refetchQueries({ queryKey: queryKeys.memo.lists() });
      queryClient.refetchQueries({ queryKey: ['categories'] });
    },
  });

  return { postMemo: mutate, isLoading: isPending };
}
