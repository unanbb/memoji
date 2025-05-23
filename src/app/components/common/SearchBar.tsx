import { MdSearch } from 'react-icons/md';

export default function SearchBar({}) {
  return (
    <div className="flex items-center w-full border-1 border-gray-300 px-2 py-2 rounded-full">
      <MdSearch size={24} className="relative left-1" />
      <input
        type="text"
        role="search"
        placeholder="Search..."
        className="border-none outline-none relative left-3 w-full"
        aria-label="Search"
      />
    </div>
  );
}
