import { toast } from 'react-toastify';
import Toast from '@/components/common/Toast';
import type { ToastArgs } from '@/types/toast';

export default function showToast({ name, state, type = 'success', message }: ToastArgs) {
  const ariaLabel = `${name} ${state} ${type === 'error' ? '실패' : '성공'} 알림`;
  const defaultMessage = type === 'success' ? `${name}가 ${state}되었습니다.` : `${name} ${state}에 실패했습니다. 다시 시도해주세요.`;

  const getStyle = () =>
    type === 'error'
      ? {
          backgroundColor: 'darkred',
          width: '440px',
          boxShadow: '0 4px 16px rgba(139,0,0,0.25)',
        }
      : {
          backgroundColor: 'black',
          width: '440px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        };

  toast(
    () => (
      <Toast
        closeToast={() => toast.dismiss()}
        ariaLabel={ariaLabel}
        message={message ?? defaultMessage}
      />
    ),
    {
      closeButton: false,
      position: 'bottom-left',
      pauseOnHover: false,
      hideProgressBar: true,
      autoClose: 3000,
      style: getStyle(),
    },
  );
}
