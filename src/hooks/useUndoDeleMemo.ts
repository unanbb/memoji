import type { MemoProps } from '@/types/memo';
import { useState } from 'react';

const fetchUndoDeleteMemo = async (id: string) => {
  try {
    const response = await fetch(`/api/memos/restore/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('메모 복원 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('메모 복원 중 오류 발생:', error);
    throw error;
  }
};

export default function useUndoDeleteMemo(id: string) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [memo, setMemo] = useState<MemoProps | null>(null);

  const undoDeleteMemo = async () => {
    setStatus('loading');
    try {
      const result = await fetchUndoDeleteMemo(id);
      setMemo(result.memo);
      setStatus('success');
    } catch (err) {
      if (err instanceof Error) {
        setStatus('error');
      } else {
        setStatus('error');
      }
    }
  };

  return { status, memo, undoDeleteMemo };
}
