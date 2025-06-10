import CrossButton from '@/components/common/CrossButton';
import type { ToastProps } from '@/types/toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast({
  closeToast,
  message,
  ariaLabel,
}: ToastProps) {
  return (
    <div className="w-full flex items-center justify-between" aria-label={ariaLabel}>
      <span className="text-gray-100 text-sm">
        {message}
      </span>
      <CrossButton label="닫기" onClick={closeToast} theme="dark" iconSize="small" />
    </div>
  );
}
