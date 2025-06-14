import { MdMenu } from 'react-icons/md';

export default function ToggleSidebarButton({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-2 right-2 p-2 rounded-full cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-gray-300 z-20"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
    >
      <MdMenu size={32} />
    </button>
  );
}
