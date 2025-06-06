import { toast } from 'react-toastify';
import Toast from '@/components/common/Toast';

interface ToastProps {
  name: string;
  type: string;
  ariaLabel: string;
}

export function showCatCreateToast ({name, type, ariaLabel} : ToastProps) {
  toast(
    () => (
      <Toast
        closeToast={() => toast.dismiss()}
        name={name}
        type={type}
        ariaLabel={ariaLabel}
      />
    ),
    {
      closeButton: false,
      position: 'bottom-left',
      pauseOnHover: false,
      hideProgressBar: true,
      style: {
        backgroundColor: 'black',
        width: '440px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      },
    },
  );
}