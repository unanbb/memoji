'use client';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useEffect, useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
}

export default function MarkDownEditor({ value, onChange }: MarkDownEditorProps) {
  const mobileSize = 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= mobileSize);
  }, [mobileSize]);

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [checkIsMobile]);

  const editorStyle = isMobile
    ? {
        height: '100%',
        ContainerHeight: '80vh',
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
