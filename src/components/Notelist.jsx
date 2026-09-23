import NoteCard from "./NoteCard";

function NoteList({
  visibleNotes,
  handleEdit,
  handleDelete,
  handleArchive,
  handlePin,
  selectedNotes,
  handleSelect
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {visibleNotes.length === 0 ? (
        <p className="text-gray-500">
          No notes found.
        </p>
      ) : (
        visibleNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onPin={handlePin}
            selected={selectedNotes.includes(note.id)}
            onSelect={handleSelect}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;