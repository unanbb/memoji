import getQueryClient from '@/app/getQueryClient';
import { queryKeys } from '@/lib/queryKeys';
import type { MemoProps } from '@/types/memo';
import { useMutation } from '@tanstack/react-query';

export const fetchCreateMemo = async (memoData: Omit<MemoProps, 'id' | 'createdAt'>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/memos`, {
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
  const queryClient = getQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchCreateMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.memo.lists(),
      });
    },
  });

  return { postMemo: mutate };
}
