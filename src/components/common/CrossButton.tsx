import { cn } from '@/utils/cn';
import { MdClose } from 'react-icons/md';

interface CrossButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className?: string;
}

export default function CrossButton({ onClick, label, className }: CrossButtonProps) {
  return (
    <button
      className={cn(
        'p-2 rounded-full bg-gray-100/60 hover:bg-gray-200/70 transition-colors',
        className,
      )}
      onClick={onClick}
      aria-label={label}
    >
      <MdClose className="h-6 w-6" />
    </button>
  );
}
