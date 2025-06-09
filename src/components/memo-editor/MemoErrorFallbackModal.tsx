// MemoUpdateErrorFallbackModal.tsx

import { Modal } from '@/components/Modal';

interface Props {
  onClose: () => void;
  name?: string;
  message?: string;
}

export default function MemoErrorFallbackModal({ onClose, name = '', message }: Props) {
  return (
    <Modal
      onClose={onClose}
      isOpen={true}
      aria-label={name}
      size="large"
      className="max-w-2xl relative sm:h-[70vh] h-[100vh]"
    >
      <div className="flex items-center justify-center h-full">
        <p>{message || '데이터를 불러오는 중 오류가 발생했습니다.'}</p>
      </div>
    </Modal>
  );
}
