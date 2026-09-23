function NoteCard({ note, onEdit, onDelete, onArchive, onPin, selected, onSelect }) {
  const colorClasses = {
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    pink: "bg-pink-100",
    red: "bg-red-100"
  };
  return (
    <div
      className={`${colorClasses[note.color]} p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(note.id)}
      />
      <h2 className="text-xl font-semibold break-words">
        {note.title}
      </h2>

      <div
        className="mt-3 text-gray-700 break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
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
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>

      <p className="mt-3 text-xs text-gray-500">
        Updated: {new Date(note.updatedAt).toLocaleDateString()}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Delete
        </button>

        <button
          onClick={() => onArchive(note.id)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          onClick={() => onPin(note.id)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
    </div>
  );
}
export default NoteCard;