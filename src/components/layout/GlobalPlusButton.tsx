'use client';

import PlusButton from '@/components/common/PlusButton';
import { useModal } from '@/components/ModalProvider';

interface GlobalPlusButtonProps {
  onClick?: () => void;
}

export default function GlobalPlusButton({ onClick }: GlobalPlusButtonProps) {
  const { showModal, hideModal } = useModal();

  const handleClick = () => {
    onClick?.();
    showModal(
      <div className="w-full h-full">
        <button
          onClick={hideModal}
          className="absolute top-0 right-0 text-2xl p-2 cursor-pointer rounded-full"
        >
          X
        </button>
        빈 모달입니당
      </div>,
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <PlusButton onClick={handleClick} />
    </div>
  );
}
