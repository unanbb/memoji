import ReactMarkdown from 'react-markdown';

/**
 * Renders a styled card displaying a title and markdown-formatted content.
 *
 * The markdown content includes a heading, horizontal rule, list items, and bold text, which are rendered as HTML using the {@link ReactMarkdown} component.
 */
export default function MemoCard() {
  const markdown = `
  ## 제목
  ---

  - 리스트1
  - 리스트2

  **텍스트 강조**
  `;

  return (
    <div className="aspect-square border border-gray-300 rounded-lg p-4 overflow-hidden">
      <div className="flex flex-col gap-1 overflow-y-hidden h-full">
        <h1 className="font-semibold text-lg">Title</h1>
        <div className="prose prose-sm">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
