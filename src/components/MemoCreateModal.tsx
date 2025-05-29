import CrossButton from '@/components/common/CrossButton';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import type { MemoProps } from '@/types/memo';

export default function MemoCreateModal({
  isOpen,
  onClose,
  memoData,
  setMemoData,
}: {
  isOpen: boolean;
  onClose: () => void;
  memoData: Omit<MemoProps, 'id' | 'createdAt'>;
  setMemoData: React.Dispatch<React.SetStateAction<Omit<MemoProps, 'id' | 'createdAt'>>>;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      className="max-w-2xl relative sm:h-[60vh] h-[100vh]"
    >
      <div className="absolute top-1 right-1">
        <CrossButton onClick={onClose} label="Close editor" />
      </div>
      <input
        type="text"
        placeholder="제목"
        value={memoData.title}
        onChange={e => setMemoData(prev => ({ ...prev, title: e.target.value }))}
        className="w-full border-none text-lg font-medium focus:outline-none mb-2 mt-2"
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="카테고리"
          value={memoData.category}
          onChange={e => setMemoData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full border-none text-gray-500 focus:outline-none"
        />
      </div>
      <MarkDownEditor
        value={memoData.content}
        onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
      />
    </Modal>
  );
}
