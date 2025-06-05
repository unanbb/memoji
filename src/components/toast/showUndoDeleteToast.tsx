import CrossButton from '@/components/common/CrossButton';
import { toast } from 'react-toastify';

interface SplitButtonsProps {
  closeToast: () => void;
  undo: () => void;
}

function MemoDeleteToast({ closeToast, undo }: SplitButtonsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span className="text-gray-800 text-sm">메모가 삭제되었습니다</span>
        <button
          className="text-black hover:bg-gray-100 rounded px-4 py-2 text-sm font-semibold transition"
          onClick={undo}
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
  toast(
    () => (
      <MemoDeleteToast
        closeToast={() => toast.dismiss()}
        undo={() => {
          console.log(`Undo delete for memo ID: ${id}`);
        }}
      />
    ),
    {
      closeButton: false,
      position: 'bottom-left',
      className: 'w-[400px] border border-gray-300 rounded-lg p-4 shadow-lg',
      ariaLabel: '메모 삭제 알림',
      pauseOnHover: false,
      hideProgressBar: true,
      autoClose: 3000,
    },
  );
};
