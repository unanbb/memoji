'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Modal } from './Modal';

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const showModal = useCallback((modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={hideModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal은 ModalProvider내에서 사용해야 합니다.');
  }
  return context;
} 