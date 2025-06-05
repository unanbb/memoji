import { cn } from '@/utils/cn';
import { MdDelete } from 'react-icons/md';

interface DeleteButtonProps {
  onClick: (
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  label: string;
  className?: string;
}

export default function DeleteButton({ onClick, label, className }: DeleteButtonProps) {
  return (
    <button
      className={cn('p-2 rounded-full hover:bg-red-200/70 transition-colors', className)}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <MdDelete className="h-[22px] w-[22px] text-red-600" />
    </button>
  );
}
