import { CiCirclePlus } from 'react-icons/ci';

interface PlusButtonProps {
  className?: string;
  onClick?: () => void;
  label: string;
}

export default function AddButton({ className, onClick, label }: PlusButtonProps) {
  return (
    <button className={`cursor-pointer ${className}`} onClick={onClick} aria-label={label}>
      <CiCirclePlus size={30} />
    </button>
  );
}
