'use client';
import '@uiw/react-markdown-preview/markdown.css';
import type { PreviewType } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { useWindowSize } from 'react-use';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  markDownProps?: React.ComponentProps<typeof MDEditor>;
}

export default function MarkDownEditor({ value, onChange, markDownProps }: MarkDownEditorProps) {
  const { width } = useWindowSize();
  const editorStyle =
    width <= 768
      ? {
          height: '80%',
          preview: 'edit',
        }
      : {
          height: '50vh',
          preview: 'live',
        };

  return (
    <MDEditor
      data-color-mode="light"
      value={value}
      onChange={onChange}
      height={editorStyle.height}
      style={{ height: editorStyle.height }}
      preview={editorStyle.preview as PreviewType}
      autoFocus
      autoFocusEnd
      {...markDownProps}
    />
  );
}
