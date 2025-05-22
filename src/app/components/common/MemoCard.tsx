import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface MemoCardProps {
  title: string;
  contents: string;
}

export default function MemoCard({title, contents} : MemoCardProps) {
  return (
    <div className="aspect-square border border-gray-300 rounded-lg p-4 overflow-hidden">
      <div className="flex flex-col gap-1 overflow-y-hidden h-full">
        <h1 className="font-semibold text-lg">{title}</h1>
        <div className="prose prose-sm">
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{contents}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
