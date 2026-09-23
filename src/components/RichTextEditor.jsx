function RichTextEditor({ newNote, setNewnote, setErrors, editorRef }) {
  function applyCommand(command) {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      return;
    }

    document.execCommand(command, false, null);

    editorRef.current?.focus();
  }
  return (
    <>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="border rounded p-3 min-h-32 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
        onInput={(event) => {
          setNewnote({
            ...newNote,
            content: event.currentTarget.innerHTML
          });
          setErrors({});
        }}
      ></div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("bold");
          }}
          className="px-3 py-1 border rounded font-bold"
        >
          B
        </button>

        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            document.execCommand("italic");
          }}
          className="px-3 py-1 border rounded italic"
        >
          I
        </button>

        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();

            editorRef.current?.focus();

            document.execCommand(
              "insertUnorderedList",
              false,
              null
            );
          }}
          className="px-3 py-1 border rounded"
        >
          • List
        </button>

        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();

            editorRef.current?.focus();

            document.execCommand(
              "insertOrderedList",
              false,
              null
            );
          }}
          className="px-3 py-1 border rounded"
        >
          1. List
        </button>
      </div>
    </>
  );
}

export default RichTextEditor;