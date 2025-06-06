import { cn } from '@/utils/cn';
import { MdClose } from 'react-icons/md';

interface CrossButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className?: string;
  theme?: 'light' | 'dark';
  iconSize?: 'small' | 'medium' | 'large';
}

export default function CrossButton({
  onClick,
  label,
  className,
  theme = 'light',
  iconSize = 'medium',
}: CrossButtonProps) {
  return (
    <button
      className={cn('p-2 rounded-full transition-colors cursor-pointer', className, {
        'hover:bg-gray-700 text-gray-100': theme === 'dark',
        'hover:bg-gray-200 text-gray-800': theme === 'light',
      })}
      onClick={onClick}
      aria-label={label}
    >
      <MdClose
        className={cn(
          iconSize === 'small' && 'h-5 w-5',
          iconSize === 'medium' && 'h-6 w-6',
          iconSize === 'large' && 'h-8 w-8',
        )}
      />
    </button>
  );
}
