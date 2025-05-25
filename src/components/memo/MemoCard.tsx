import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import type { MemoCardProps } from '@/types/memo';

export default function MemoCard({ id, title, content }: MemoCardProps) {
  return (
    <div
      onClick={() => console.log(id)}
      className="aspect-square border border-gray-300 rounded-lg p-4 overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          console.log(id);
        }
      }}
    >
      <div className="flex flex-col gap-1 overflow-y-hidden h-full">
        <h1 className="font-semibold text-lg">{title}</h1>
        <div className="prose prose-sm">
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
