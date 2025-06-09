'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { 
  $convertFromMarkdownString, 
  $convertToMarkdownString 
} from '@lexical/markdown';
import { 
  HeadingNode, 
  QuoteNode 
} from '@lexical/rich-text';
import { 
  ListNode, 
  ListItemNode 
} from '@lexical/list';
import { 
  CodeNode, 
  CodeHighlightNode 
} from '@lexical/code';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import type { EditorState } from 'lexical';
import useWindowSize from '@/hooks/useWindowSize';

interface MarkDownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
}

// 간단한 에러 처리 컴포넌트
function LexicalErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
const nodes = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  CodeNode,
  CodeHighlightNode,
  LinkNode,
  AutoLinkNode,
];

export default function MarkDownEditor({
  value = '',
  onChange,
  placeholder = '마크다운으로 작성하세요...',
}: MarkDownEditorProps) {
  const { width } = useWindowSize();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const editorHeight = width <= 768 ? '87%' : '50vh';
  const isMobile = width <= 768;

  // 초기 에디터 설정
  const initialConfig = useMemo(() => ({
    namespace: 'MarkdownEditor',
    nodes,
    onError: (error: Error) => {
      console.error('Lexical Error:', error);
    },
    theme: {
      root: 'p-4 border-none outline-none min-h-[300px] focus:outline-none',
      paragraph: 'mb-2',
      heading: {
        h1: 'text-2xl font-bold mb-4',
        h2: 'text-xl font-bold mb-3',
        h3: 'text-lg font-bold mb-2',
        h4: 'text-base font-bold mb-2',
        h5: 'text-sm font-bold mb-1',
        h6: 'text-xs font-bold mb-1',
      },
      list: {
        nested: {
          listitem: 'list-none',
        },
        ol: 'list-decimal pl-6 mb-2',
        ul: 'list-disc pl-6 mb-2',
        listitem: 'mb-1',
      },
      quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4',
      code: 'bg-gray-100 px-2 py-1 rounded font-mono text-sm',
      codeHighlight: {
        atrule: 'text-purple-600',
        attr: 'text-blue-600',
        boolean: 'text-red-600',
        builtin: 'text-purple-600',
        cdata: 'text-gray-600',
        char: 'text-green-600',
        class: 'text-blue-600',
        'class-name': 'text-blue-600',
        comment: 'text-gray-500',
        constant: 'text-red-600',
        deleted: 'text-red-600',
        doctype: 'text-gray-600',
        entity: 'text-red-600',
        function: 'text-purple-600',
        important: 'text-red-600',
        inserted: 'text-green-600',
        keyword: 'text-purple-600',
        namespace: 'text-red-600',
        number: 'text-red-600',
        operator: 'text-gray-700',
        prolog: 'text-gray-600',
        property: 'text-blue-600',
        punctuation: 'text-gray-700',
        regex: 'text-green-600',
        selector: 'text-green-600',
        string: 'text-green-600',
        symbol: 'text-red-600',
        tag: 'text-red-600',
        url: 'text-blue-600',
        variable: 'text-red-600',
      },
      link: 'text-blue-600 underline hover:text-blue-800',
    },
    editorState: value ? () => $convertFromMarkdownString(value, TRANSFORMERS) : undefined,
  }), [value]);

  // 에디터 내용 변경 핸들러
  const handleEditorChange = useCallback((editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      onChange?.(markdown);
    });
  }, [onChange]);

  // 프리뷰/편집 모드 토글
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // 마크다운을 HTML로 변환하여 프리뷰 표시
  const renderPreview = () => {
    if (!value) return <div className="p-4 text-gray-500">프리뷰할 내용이 없습니다.</div>;
    
    // 간단한 마크다운 -> HTML 변환 (실제로는 markdown parser 라이브러리 사용 권장)
    const html = value
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n$/gim, '<br />');

    return (
      <div 
        className="p-4 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: editorHeight }}>
      {/* 툴바 */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {isMobile ? '마크다운 에디터' : 'Markdown Editor'}
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={togglePreviewMode}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-100 transition-colors"
              type="button"
            >
              {isPreviewMode ? '편집' : '미리보기'}
            </button>
          )}
        </div>
      </div>

      {/* 에디터 컨텐츠 */}
      <div className="flex-1 overflow-hidden">
        {isPreviewMode && !isMobile ? (
          <div className="h-full overflow-auto">
            {renderPreview()}
          </div>
        ) : (
          <LexicalComposer initialConfig={initialConfig}>
            <div className="h-full flex flex-col relative">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="flex-1 overflow-auto resize-none outline-none p-4" />
                }
                placeholder={
                  <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                    {placeholder}
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <OnChangePlugin onChange={handleEditorChange} />
            </div>
          </LexicalComposer>
        )}
      </div>
    </div>
  );
}
