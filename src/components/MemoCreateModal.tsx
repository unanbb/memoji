import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
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
      <div className="mb-2 mt-2">
        <InputField
          placeholder="제목"
          label="메모 제목"
          value={memoData.title}
          variant="title"
          onChange={e => setMemoData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="mb-4">
        <InputField
          placeholder="카테고리"
          label="메모 카테고리"
          value={memoData.category}
          onChange={e => setMemoData(prev => ({ ...prev, category: e.target.value }))}
        />
      </div>
      <MarkDownEditor
        value={memoData.content}
        onChange={newValue => setMemoData(prev => ({ ...prev, content: newValue || '' }))}
      />
    </Modal>
  );
}
