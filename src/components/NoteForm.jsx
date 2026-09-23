import RichTextEditor from "./RichTextEditor";
function NoteForm({
  newNote,
  setNewnote,
  tagInput,
  setTagInput,
  errors,
  setErrors,
  editorRef
}) {
  return (
    <div className="mt-6 p-5 border rounded-xl shadow-sm bg-white">
      <input
        className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title (optional)"
        value={newNote.title}
        onChange={(event) => {
          setNewnote({
            ...newNote,
            title: event.target.value
          });
          setErrors({});
        }}
      />

      {errors.title && (
        <p className="text-red-500 text-sm mb-2">
          {errors.title}
        </p>
      )}
      <RichTextEditor
        newNote={newNote}
        setNewnote={setNewnote}
        setErrors={setErrors}
        editorRef={editorRef}
      />
      {errors.content && (
        <p className="text-red-500 text-sm mt-1">
          {errors.content}
        </p>
      )}

      {errors.duplicate && (
        <p className="text-red-500 text-sm mt-1">
          {errors.duplicate}
        </p>
      )}

      {errors.tags && (
        <p className="text-red-500 text-sm mt-1">
          {errors.tags}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        {["yellow", "blue", "green", "pink", "red"].map((color) => (
          <button
            key={color}
            type="button"
            onClick={() =>
              setNewnote({
                ...newNote,
                color: color
              })
            }
            className={`w-8 h-8 rounded-full ${{
              yellow: "bg-yellow-100",
              blue: "bg-blue-100",
              green: "bg-green-100",
              pink: "bg-pink-100",
              red: "bg-red-100"
            }[color]
              }`}
          ></button>
        ))}
      </div>

      <input
        className="mt-4 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Tags"
        value={tagInput}
        onChange={(event) => {
          setTagInput(event.target.value);
        }}
      />
    </div>
  );
}

export default NoteForm;