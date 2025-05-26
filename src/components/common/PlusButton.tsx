interface PlusButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function PlusButton({ className, onClick }: PlusButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-full bg-neutral-700 cursor-pointer ${className}`}
      onClick={onClick}
    >
      +
    </button>
  );
}
