import { toast } from 'react-toastify';
import Toast from '@/components/common/Toast';
import type { ToastArgs } from '@/types/toast';

export default function showToast({ name, state, type = 'success', ariaLabel }: ToastArgs) {
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
        name={name}
        state={state}
        type={type}
        ariaLabel={ariaLabel}
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
