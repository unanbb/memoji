'use client';
import { useSearchStore } from '@/store/SearchStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdSearch } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const setSearchQuery = useSearchStore(state => state.setSearchQuery);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value === '') {
      params.delete('search');
    } else {
      params.set('search', event.target.value);
    }
    replace(`${pathName}?${params.toString()}`);
    setSearchQuery(event.target.value);
  };
  const useDebouncedSearch = useDebouncedCallback(handleSearch, 300);

  return (
    <div className="flex items-center w-full border-1 border-gray-300 px-2 py-2 rounded-full">
      <MdSearch size={24} className="relative left-1" />
      <input
        onChange={useDebouncedSearch}
        type="text"
        name="search"
        role="search"
        placeholder="Search..."
        className="border-none outline-none relative left-3 w-full"
        aria-label="Search"
        defaultValue={searchParams.get('search') || ''}
      />
    </div>
  );
}
