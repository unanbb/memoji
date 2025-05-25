import { FaChevronDown } from 'react-icons/fa';

interface ToggleButtonProps {
  onClick?: () => void;
  className?: string;
  isOpen?: boolean;
}

export default function ToggleButton({ onClick, isOpen }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-none border-none text-2xl transition-transform duration-300"
      type="button"
    >
      <FaChevronDown
        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      />
    </button>
  );
}
