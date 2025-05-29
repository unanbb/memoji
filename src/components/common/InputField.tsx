import { cn } from '@/utils/cn';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  variant?: 'title' | 'category' | 'default';
}

export default function InputField({
  value,
  onChange,
  placeholder,
  label,
  className = '',
  error = false,
  disabled = false,
  variant = 'category',
}: InputFieldProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      aria-label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'w-full border-none focus:outline-none',
        variant === 'title' && 'text-lg font-medium',
        variant === 'category' && 'text-base text-gray-500',
        variant === 'default' && 'text-sm',
        error && 'border-red-500 ring-2 ring-red-200',
        disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
        className,
      )}
    />
  );
}
