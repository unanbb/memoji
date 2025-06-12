'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import type { EditorState } from 'lexical';
import { useCallback } from 'react';
import { lexicalTheme } from './LexicalMarkdownEditor.theme';

interface LexicalMarkdownEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function MyOnChangePlugin({ onChange }: { onChange: (editorState: EditorState) => void }) {
  return <OnChangePlugin onChange={onChange} ignoreSelectionChange={true} />;
}

export default function LexicalMarkdownEditor({
  value = '',
  onChange,
  autoFocus = true,
}: LexicalMarkdownEditorProps) {
  const { width } = useWindowSize();
  const editorHeight = width <= 768 ? '87%' : '50vh';

  const initialConfig = {
    namespace: 'MarkdownEditor',
    theme: lexicalTheme,
    onError: (error: Error) => {
      console.error('Lexical error:', error);
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, CodeHighlightNode, LinkNode],
    editorState: value ? () => $convertFromMarkdownString(value, TRANSFORMERS) : undefined,
  };

  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        let markdown = $convertToMarkdownString(TRANSFORMERS);
        markdown = markdown.replace(/\\`/g, '`');
        markdown = markdown.replace(/\\\*/g, '*');
        markdown = markdown.replace(/\\#/g, '#');
        markdown = markdown.replace(/\\-/g, '-');
        markdown = markdown.replace(/\\\[/g, '[');
        markdown = markdown.replace(/\\\]/g, ']');
        markdown = markdown.replace(/\\\(/g, '(');
        markdown = markdown.replace(/\\\)/g, ')');
        markdown = markdown.replace(/\\>/g, '>');
        markdown = markdown.replace(/\\\|/g, '|');
        console.log('Markdown:', markdown);
        onChange?.(markdown);
      });
    },
    [onChange],
  );

  return (
    <div style={{ height: editorHeight }}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="h-full flex flex-col relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="flex-1 p-4 outline-none resize-none border border-gray-300 rounded-lg overflow-y-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            }
            placeholder={
              <div className="text-gray-400 absolute top-4 left-4">내용을 입력하세요...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyOnChangePlugin onChange={handleEditorChange} />
          <HistoryPlugin />
          {autoFocus && <AutoFocusPlugin />}
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <ListPlugin />
          <LinkPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}
