import CrossButton from '@/components/common/CrossButton';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast({
  closeToast,
  name,
  state,
  type,
  ariaLabel,
}: {
  closeToast: () => void;
  name: string;
  state: string;
  type: 'success' | 'error';
  ariaLabel: string;
}) {
  return (
    <div className="w-full flex items-center justify-between" aria-label={ariaLabel}>
      <span className="text-gray-100 text-sm">
        {type === 'success'
          ? `${name}가 ${state}되었습니다`
          : `${name} ${state}에 실패했습니다. 다시 시도해주세요.`}
      </span>
      <CrossButton label="닫기" onClick={closeToast} theme="dark" iconSize="small" />
    </div>
  );
}
