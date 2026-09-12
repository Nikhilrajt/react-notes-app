function NoteCard({note,onEdit}){
    const colorClasses = {
  yellow: "bg-yellow-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  pink: "bg-pink-100",
  red: "bg-red-100"
};
return (
  <div className={`${colorClasses[note.color]} p-4 rounded-lg shadow`}>
    <h2 className="text-xl font-semibold">{note.title}</h2>

    <p className="mt-2 text-gray-700">
      {note.content}
    </p>
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
      Updated: {note.updatedAt}
    </p>
    <button
    onClick={()=>onEdit(note)}
    className="mt-3 px-3 py-1 border rounded">Edit</button>
  </div>
);
}
export default NoteCard;