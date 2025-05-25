'use client';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center w-full border-1 border-gray-300 px-2 py-2 rounded-full">
      <MdSearch size={24} className="relative left-1" />
      <input
        value={searchQuery}
        onChange={handleSearch}
        type="text"
        name="search"
        role="search"
        placeholder="Search..."
        className="border-none outline-none relative left-3 w-full"
        aria-label="Search"
      />
    </div>
  );
}
