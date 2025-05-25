import { FaChevronDown } from 'react-icons/fa';

interface ToggleButtonProps {
  onClick?: () => void;
  className?: string;
  isOpen?: boolean;
}

export default function ToggleButton({ onClick, isOpen, className }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-none border-none text-2xl transition-transform duration-300 ${className}`}
      type="button"
    >
      <FaChevronDown
        className={`rounded-full transition-transform duration-300 cursor-pointer hover:bg-gray-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      />
    </button>
  );
}
