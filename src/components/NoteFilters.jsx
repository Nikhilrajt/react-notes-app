function NoteFilters({
  showArchived,
  setShowArchived,
  sortBy,
  setSortBy,
  filterColor,
  setFilterColor,
  selectedNotes,
  handleBulkDelete
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={() => setShowArchived(!showArchived)}
        className="px-4 py-2 border rounded"
      >
        {showArchived ? "Active Notes" : "Archived Notes"}
      </button>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
        <option value="color">Sort by Color</option>
      </select>

      <select
        value={filterColor}
        onChange={(event) => setFilterColor(event.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="all">All Colors</option>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="pink">Pink</option>
        <option value="red">Red</option>
      </select>

      {selectedNotes.length > 0 && (
        <button
          onClick={handleBulkDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete Selected ({selectedNotes.length})
        </button>
      )}
    </div>
  );
}

export default NoteFilters;