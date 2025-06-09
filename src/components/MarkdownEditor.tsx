'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import type { EditorState } from 'lexical';
import React, { useCallback, useMemo } from 'react';

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

  const editorHeight = width <= 768 ? '87%' : '50vh';

  // 초기 에디터 설정
  const initialConfig = useMemo(
    () => ({
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
    }),
    [value],
  );

  // 에디터 내용 변경 핸들러
  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        onChange?.(markdown);
      });
    },
    [onChange],
  );

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden"
      style={{ height: editorHeight }}
    >
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
    </div>
  );
}
