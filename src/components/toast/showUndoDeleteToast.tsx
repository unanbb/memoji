import CrossButton from '@/components/common/CrossButton';
import useUndoDeleteMemo from '@/hooks/useUndoDeleMemo';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface SplitButtonsProps {
  closeToast: () => void;
  id: string;
}

function MemoDeleteToast({ closeToast, id }: SplitButtonsProps) {
  const { undoDeleteMemo } = useUndoDeleteMemo(id);

  const router = useRouter();

  const handleUndo = async () => {
    try {
      await undoDeleteMemo();
      closeToast();
      router.push('/');
    } catch (error) {
      console.error('메모 복원 중 오류 발생:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 text-sm">메모가 삭제되었습니다</span>
        <button
          className="text-black hover:bg-gray-100 rounded px-4 py-2 text-sm font-semibold transition"
          onClick={handleUndo}
        >
          삭제 취소
        </button>
        <CrossButton label="닫기" onClick={closeToast} />
      </div>
    </div>
  );
}

/*
 * 메모 삭제 후 토스트 알림을 표시하는 함수
 * @param id - 삭제된 메모의 ID
 */
export const showUndoDeleteToast = (id: string) => {
  toast(() => <MemoDeleteToast closeToast={() => toast.dismiss()} id={id} />, {
    closeButton: false,
    position: 'bottom-left',
    className: 'w-[400px] border border-gray-300 rounded-lg p-4 shadow-lg',
    ariaLabel: '메모 삭제 알림',
    pauseOnHover: false,
    hideProgressBar: true,
    autoClose: 3000,
  });
};
