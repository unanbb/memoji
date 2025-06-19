import { ROUTE } from '@/components/constants/path';
import Link from 'next/link';
import { IoHomeOutline } from 'react-icons/io5';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-gray-900 tracking-tight">404</h1>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600 leading-relaxed">
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
          </p>
        </div>
        <Link
          className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          href={ROUTE.HOME}
        >
          <IoHomeOutline className="w-4 h-4 mr-2" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
