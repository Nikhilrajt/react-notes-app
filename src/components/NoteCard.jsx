function NoteCard({ note, onEdit, onDelete, onArchive, onPin, selected, onSelect }) {
  const colorClasses = {
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    pink: "bg-pink-100",
    red: "bg-red-100"
  };
  return (
    <div className={`${colorClasses[note.color]} p-4 rounded-lg shadow`}>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(note.id)}
      />
      <h2 className="text-xl font-semibold">{note.title}</h2>

      <div
        className="mt-2 text-gray-700"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div className="mt-3 flex gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm bg-gray-200 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Created: {note.createdAt}
      </p>
      <p className="mt-3 text-xs text-gray-500">
        Updated: {note.updatedAt}
      </p>
      <button
        onClick={() => onEdit(note)}
        className="mt-3 px-3 py-1 border rounded">Edit</button>
      <button onClick={() => onDelete(note.id)}
        className="mt-3 px-3 py-1 border rounded">Delete</button>
      <button onClick={() => onArchive(note.id)}
        className="mt-3 px-3 py-1 border rounded"
      >
        {note.archived ? "Unarchive" : "Archive"}</button>
      <button
        onClick={() => onPin(note.id)}
        className="mt-3 px-3 py-1 border rounded"
      >
        {note.pinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
}
export default NoteCard;