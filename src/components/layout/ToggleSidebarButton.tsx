import { MdMenu } from 'react-icons/md';

export default function ToggleSidebarButton({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`absolute top-1 right-2 p-2 rounded-full cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${isOpen ? 'block' : 'hidden'}`}
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
    >
      <MdMenu size={32} />
    </button>
  );
}
