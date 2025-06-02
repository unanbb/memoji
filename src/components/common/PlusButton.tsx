interface PlusButtonProps {
  className?: string;
  onClick?: () => void;
  label: string;
}

export default function PlusButton({ className, onClick, label }: PlusButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-full bg-neutral-700 cursor-pointer ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      +
    </button>
  );
}
