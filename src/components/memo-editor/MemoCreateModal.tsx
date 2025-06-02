import { fetchCreateMemo } from '@/action';
import CrossButton from '@/components/common/CrossButton';
import InputField from '@/components/common/InputField';
import MarkDownEditor from '@/components/MarkdownEditor';
import { Modal } from '@/components/Modal';
import type { MemoProps } from '@/types/memo';
import { useCallback, useState } from 'react';

export default function MemoCreateModal() {
  const [memoData, setMemoData] = useState<Omit<MemoProps, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    category: '',
  });

  const submitMemo = useCallback(async () => {
    if (!memoData.title || !memoData.content || !memoData.category) {
      console.error('메모 제목, 내용, 카테고리는 필수입니다.');
      return;
    }
    try {
      const response = await fetchCreateMemo(memoData);
      console.log('메모가 성공적으로 생성되었습니다:', response);
    } catch (error) {
      console.error('메모 생성 중 오류 발생:', error);
      //TODO: 사용자에게 오류 메시지를 표시하는 로직 추가 필요
    }
    setMemoData({
      title: '',
      content: '',
      category: '',
    });
  }, [memoData]);

  return (
    <Modal
      onClose={submitMemo}
      isOpen={true}
      aria-label="메모 생성"
      aria-labelledby="memo-create-modal"
      size="large"
      className="max-w-2xl relative sm:h-[70vh] h-[100vh]"
    >
      <div className="absolute top-1 right-1">
        <CrossButton onClick={submitMemo} label="Close editor" />
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
