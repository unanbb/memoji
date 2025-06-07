import { toast } from 'react-toastify';
import Toast from '@/components/common/Toast';

interface ToastProps {
  name: string;
  state: string;
  type?: 'success' | 'error';
  ariaLabel: string;
}

export default function showToast({ name, state, type = 'success', ariaLabel }: ToastProps) {
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
      style: {
        backgroundColor: 'black',
        width: '440px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      },
    },
  );
}
