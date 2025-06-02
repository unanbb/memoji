'use client';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  markDownProps?: React.ComponentProps<typeof MDEditor>;
}

export default function MarkDownEditor({ value, onChange, markDownProps }: MarkDownEditorProps) {
  const isMobile = window.innerWidth <= 768;
  const editorStyle = isMobile
    ? {
        height: '100%',
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
      preview={editorStyle.preview === 'live' ? 'live' : 'edit'}
      autoFocus
      autoFocusEnd
      {...markDownProps}
    />
  );
}
