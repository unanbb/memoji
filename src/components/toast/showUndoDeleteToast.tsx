import CrossButton from '@/components/common/CrossButton';
import showToast from '@/components/toast/showToast';
import useUndoDeleteMemo from '@/hooks/useUndoDeleMemo';
import { toast } from 'react-toastify';

interface SplitButtonsProps {
  closeToast: () => void;
  id: string;
}

function MemoDeleteToast({ closeToast, id }: SplitButtonsProps) {
  const { undoDeleteMemo } = useUndoDeleteMemo();

  const handleUndo = () => {
    undoDeleteMemo(id, {
      onError: () => {
        closeToast();
        showToast({
          name: '메모',
          state: '복구 실패',
          type: 'error',
        });
      },
      onSuccess: () => {
        closeToast();
        showToast({
          name: '메모',
          state: '복구',
          type: 'success',
        });
      },
    });
  };

  return (
    <div className="w-full flex items-center justify-between">
      <span className="text-gray-100 text-sm">메모가 삭제되었습니다</span>
      <div className="flex items-center gap-2">
        <button
          className="text-blue-400 hover:bg-gray-700 rounded px-4 py-2 text-sm font-semibold transition cursor-pointer"
          onClick={handleUndo}
        >
          삭제 취소
        </button>
        <CrossButton label="닫기" onClick={closeToast} theme="dark" iconSize="small" />
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
    ariaLabel: '메모 삭제 알림',
    pauseOnHover: false,
    hideProgressBar: true,
    style: {
      backgroundColor: 'black',
      width: '440px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    },
  });
};
