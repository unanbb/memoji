import { cn } from '@/utils/cn';
import { CiCirclePlus } from 'react-icons/ci';

interface PlusButtonProps {
  className?: string;
  onClick?: () => void;
  label: string;
}

export default function AddButton({ className, onClick, label }: PlusButtonProps) {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200/70',
        className,
      )}
      onClick={onClick}
      aria-label={label}
      name="add-button"
      type="button"
      title={label}
    >
      <CiCirclePlus className="h-[20px] w-[20px] text-gray-500 hover:text-blue-500" />
    </button>
  );
}
