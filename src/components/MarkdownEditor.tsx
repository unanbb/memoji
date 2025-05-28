'use client';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export default function MarkDownEditor({ value, onChange }: MarkDownEditorProps) {
  const isMobile = window.innerWidth <= 768;
  const editorStyle = isMobile
    ? {
        height: '100%',
        ContainerHeight: '95vh',
        preview: 'edit',
      }
    : {
        height: '50vh',
        ContainerHeight: '50vh',
        preview: 'live',
      };

  return (
    <div data-color-mode="light" style={{ height: editorStyle.ContainerHeight }}>
      <Suspense fallback={<div>Loading editor...</div>}>
        <MDEditor
          value={value}
          onChange={onChange}
          height={editorStyle.height}
          style={{ height: editorStyle.height }}
          preview={editorStyle.preview === 'live' ? 'live' : 'edit'}
          autoFocus
        />
      </Suspense>
    </div>
  );
}
