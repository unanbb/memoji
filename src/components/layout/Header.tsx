'use client';
import SearchBar from '@/components/common/SearchBar';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full h-16">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link href="/" className="text-xl font-bold justify-start w-1/4">
          Memoji
        </Link>
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>
        <div className="flex justify-end w-1/4"></div>
      </div>
    </header>
  );
}
