'use client';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import type { EditorState } from 'lexical';
import { useCallback } from 'react';
import useWindowSize from '@/hooks/useWindowSize';

interface LexicalMarkdownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function MyOnChangePlugin({
  onChange,
}: {
  onChange: (editorState: EditorState) => void;
}) {
  return (
    <OnChangePlugin
      onChange={onChange}
      ignoreSelectionChange={true}
    />
  );
}

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'text-gray-400 text-sm',
  paragraph: 'mb-1',
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2',
  heading: {
    h1: 'text-2xl font-bold mb-2 mt-4',
    h2: 'text-xl font-bold mb-2 mt-3',
    h3: 'text-lg font-bold mb-2 mt-3',
    h4: 'text-base font-bold mb-2 mt-2',
    h5: 'text-sm font-bold mb-2 mt-2',
    h6: 'text-xs font-bold mb-2 mt-2',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal list-inside my-2',
    ul: 'list-disc list-inside my-2',
    listitem: 'mb-1',
  },
  link: 'text-blue-600 hover:text-blue-800 underline cursor-pointer',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono',
  },
  code: 'bg-gray-100 p-4 rounded-lg font-mono text-sm my-2 block overflow-x-auto',
  codeHighlight: {
    atrule: 'text-purple-600',
    attr: 'text-blue-600',
    boolean: 'text-red-600',
    builtin: 'text-purple-600',
    cdata: 'text-gray-600',
    char: 'text-green-600',
    class: 'text-blue-600',
    comment: 'text-gray-500 italic',
    constant: 'text-red-600',
    deleted: 'text-red-600',
    doctype: 'text-gray-600',
    entity: 'text-orange-600',
    function: 'text-blue-600',
    important: 'text-red-600',
    inserted: 'text-green-600',
    keyword: 'text-purple-600',
    namespace: 'text-blue-600',
    number: 'text-red-600',
    operator: 'text-gray-700',
    prolog: 'text-gray-600',
    property: 'text-blue-600',
    punctuation: 'text-gray-700',
    regex: 'text-green-600',
    selector: 'text-purple-600',
    string: 'text-green-600',
    symbol: 'text-red-600',
    tag: 'text-purple-600',
    url: 'text-blue-600',
    variable: 'text-orange-600',
  },
};

export default function LexicalMarkdownEditor({
  value = '',
  onChange,
  placeholder = '내용을 입력하세요...',
  autoFocus = true,
}: LexicalMarkdownEditorProps) {
  const { width } = useWindowSize();
  const editorHeight = width <= 768 ? '87%' : '50vh';

  const initialConfig = {
    namespace: 'MarkdownEditor',
    theme,
    onError: (error: Error) => {
      console.error('Lexical error:', error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
    ],
    editorState: value ? () => $convertFromMarkdownString(value, TRANSFORMERS) : undefined,
  };

  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        onChange?.(markdown);
      });
    },
    [onChange]
  );

  return (
    <div style={{ height: editorHeight }}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="h-full flex flex-col">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="flex-1 p-4 outline-none resize-none border border-gray-300 rounded-lg overflow-y-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyOnChangePlugin onChange={handleEditorChange} />
          <HistoryPlugin />
          {autoFocus && <AutoFocusPlugin />}
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}
