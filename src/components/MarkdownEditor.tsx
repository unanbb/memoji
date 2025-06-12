'use client';
import LexicalMarkdownEditor from './LexicalMarkdownEditor';

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  markDownProps?: Record<string, unknown>; // Keeping for backward compatibility
  defaultMode?: string; // Keeping for backward compatibility
}

export default function MarkDownEditor({
  value,
  onChange,
}: MarkDownEditorProps) {
  return (
    <LexicalMarkdownEditor
      value={value}
      onChange={onChange}
      placeholder="내용을 입력하세요..."
      autoFocus
    />
  );
}
