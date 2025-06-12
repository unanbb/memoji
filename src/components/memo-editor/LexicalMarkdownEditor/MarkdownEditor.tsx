'use client';
import LexicalMarkdownEditor from './LexicalMarkdownEditor';

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export default function MarkDownEditor({ value, onChange }: MarkDownEditorProps) {
  return <LexicalMarkdownEditor value={value} onChange={onChange} autoFocus />;
}
