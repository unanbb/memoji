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
import './LexicalMarkdownEditor.toolbar.css';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';

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
  placeholder = '내용을 입력하세요...',
}: LexicalMarkdownEditorProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const initialConfig = {
    namespace: 'MarkdownEditor',
    theme: lexicalTheme,
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
      AutoLinkNode,
    ],
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
        onChange?.(markdown);
      });
    },
    [onChange],
  );

  const handleContentEditableClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const targetParent = target.closest('a') || target.parentElement?.closest('a');
    console.log('target', e);
    if (targetParent?.tagName === 'A') {
      const href = (targetParent as HTMLAnchorElement).href;
      if (href) {
        window.open(href, '_blank');
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  return (
    <div className="sm:h-[80%] h-[87%] w-full">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="h-full flex flex-col relative">
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`flex-1 p-4 outline-none resize-none border border-gray-300 overflow-y-auto focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  isMobile ? 'pb-20' : ''
                }`}
                onClick={handleContentEditableClick}
              />
            }
            placeholder={
              <div className={`sm:hidden text-gray-400 absolute sm:top-4 top-[60px] left-4`}>
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
          <AutoLinkPlugin />
          <CodeHighlightPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          {/* {isMobile && <MobileToolbarPlugin />} */}
        </div>
      </LexicalComposer>
    </div>
  );
}
