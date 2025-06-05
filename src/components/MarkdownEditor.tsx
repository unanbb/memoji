'use client';
import '@uiw/react-markdown-preview/markdown.css';
import type { PreviewType } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { useWindowSize } from 'react-use';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>에디터 로딩 중...</div>,
});
// TODO: 에디터 로딩 중 대신 스켈레톤 UI로 변경하기

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
      autoFocusEnd
      {...markDownProps}
    />
  );
}
