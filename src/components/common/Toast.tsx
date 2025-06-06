import CrossButton from '@/components/common/CrossButton';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast({
  closeToast,
  name,
  type,
  options = {
    showCloseButton: false,
    pauseOnHover: false,
    hideProgressBar: true,
  },
  style = {
    backgroundColor: 'black',
    width: '440px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
  },
}: {
  closeToast: () => void;
  name: string;
  type: string;
  options?: {
    showCloseButton?: boolean;
    ariaLabel?: string;
    pauseOnHover?: boolean;
    hideProgressBar?: boolean;
  };
  style?: React.CSSProperties;
}) {
  const { showCloseButton = true, ariaLabel } = options || {};

  return (
    <div className="w-full flex items-center justify-between" style={style} aria-label={ariaLabel}>
      <span className="text-gray-100 text-sm">{`${name}가 ${type}되었습니다`}</span>
      {showCloseButton && (
        <CrossButton label="닫기" onClick={closeToast} theme="dark" iconSize="small" />
      )}
    </div>
  );
}
