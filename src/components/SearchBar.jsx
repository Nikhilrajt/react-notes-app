function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="flex-1 border rounded px-4 py-2 focus:outline-none"
      placeholder="Search notes..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}

export default SearchBar;