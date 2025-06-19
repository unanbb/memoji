import { MdRefresh } from 'react-icons/md';

interface ErrorFallbackProps {
  error?: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-gray-900 tracking-tight">!</h1>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">오류가 발생했습니다</h2>
          <p className="text-gray leading-relaxed">
            {error?.message || '일시적인 문제가 발생했습니다.'}
            <br />
            잠시 후 다시 시도해주세요.
          </p>
          {error?.digest && <p className="text-sm text-gray-500 mt-2">오류 ID: {error.digest}</p>}
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <MdRefresh className="w-4 h-4 mr-2" />
          다시 시도
        </button>
      </div>
    </div>
  );
}
