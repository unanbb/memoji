'use client';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-7xl',
};

export const Modal = ({ isOpen, onClose, children, size = 'large', className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const handleEscape = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className={cn(
          'relative z-50 w-full rounded-lg bg-white shadow-xl',
          sizeClasses[size],
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};
