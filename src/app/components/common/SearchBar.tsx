export default function SearchBar() {
  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-full px-4 py-2 w-full"
      />
    </div>
  );
}
