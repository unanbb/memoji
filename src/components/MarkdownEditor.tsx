'use client';
import useWindowSize from '@/hooks/useWindowSize';
import '@uiw/react-markdown-preview/markdown.css';
import type { PreviewType } from '@uiw/react-md-editor';
import MDEditor from '@uiw/react-md-editor';

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  markDownProps?: React.ComponentProps<typeof MDEditor>;
  defaultMode?: PreviewType;
}

const getPreviewMode = (width: number, defaultMode: PreviewType): PreviewType => {
  if (width <= 768) {
    return 'edit';
  }
  return defaultMode;
};

export default function MarkDownEditor({
  value,
  onChange,
  markDownProps,
  defaultMode = 'live',
}: MarkDownEditorProps) {
  const { width } = useWindowSize();
  const previewMode = getPreviewMode(width, defaultMode);
  const editorHeight = width <= 768 ? '87%' : '50vh';

  return (
    <MDEditor
      data-color-mode="light"
      value={value}
      onChange={onChange}
      height={editorHeight}
      preview={previewMode as PreviewType}
      autoFocus
      {...markDownProps}
    />
  );
}
