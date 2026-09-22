import { useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import NoteFilters from "./components/NoteFilters";
import NoteList from "./components/Notelist";
import NoteForm from "./components/NoteForm";
import { validateNote } from "./utils/validation";
import useNotes from "./hooks/useNotes";
function App() {
  const {
  notes,
  addNote,
  updateNote,
  deleteNote,
  archiveNote,
  pinNote,
  bulkDelete
} = useNotes();
  const [newNote, setNewnote] = useState({
    title: "",
    content: "",
    color: "yellow",
    tags: []
  });
  const [editingId, setEditingId] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterColor, setFilterColor] = useState("all");
  const [errors, setErrors] = useState({});
  const [selectedNotes, setSelectedNotes] = useState([]);
  const editorRef = useRef(null);

  function handleAddNote() {
const validationErrors = validateNote(
  newNote,
  notes,
  editingId,
  tagInput
);

if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors);
  return;
}
    const note = {
      ...newNote,

      tags: tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),

      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      pinned: false,
      archived: false
    };
if (editingId !== null) {
  const existingNote = notes.find(
    (note) => note.id === editingId
  );

  updateNote({
    ...note,
    id: editingId,
    createdAt: existingNote.createdAt,
    pinned: existingNote.pinned,
    archived: existingNote.archived
  });

    } else {
      addNote(note);
    }
    setNewnote({
      title: "",
      content: "",
      color: "yellow",
      tags: []
    });
    setEditingId(null);
    setTagInput("");
    setErrors({});
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  }
  function handleEdit(note) {
    setEditingId(note.id);
    setNewnote(note);
    setTagInput(note.tags.join(","));

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content;
      }
    }, 0);
  }
  function handleSelect(id) {
    setSelectedNotes((previous) =>
      previous.includes(id)
        ? previous.filter((noteId) => noteId !== id)
        : [...previous, id]
    );
  }
  function handleDelete(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmDelete) {
    return;
  }

  deleteNote(id);
}
function handleBulkDelete() {
  if (selectedNotes.length === 0) {
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete the selected notes?"
  );

  if (!confirmDelete) {
    return;
  }

  bulkDelete(selectedNotes);

  setSelectedNotes([]);
}
  const visibleNotes = notes.filter((note) => {
    const matchesArchive = showArchived
      ? note.archived
      : !note.archived;
    const matchesColor =
      filterColor === "all" || note.color === filterColor;
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesArchive && matchesSearch && matchesColor;
  }).sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return b.pinned - a.pinned;
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "color") {
      return a.color.localeCompare(b.color);
    }

    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Notes</h1>
      <p className=" mt-1 text-gray-500">Your thoughts, organised</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <button
          onClick={handleAddNote}
          className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      <NoteFilters
        showArchived={showArchived}
        setShowArchived={setShowArchived}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
        selectedNotes={selectedNotes}
        handleBulkDelete={handleBulkDelete}
      />
      <NoteForm
  newNote={newNote}
  setNewnote={setNewnote}
  tagInput={tagInput}
  setTagInput={setTagInput}
  errors={errors}
  setErrors={setErrors}
  editorRef={editorRef}
/>
      <NoteList
  visibleNotes={visibleNotes}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  handleArchive={archiveNote}
  handlePin={pinNote}
  selectedNotes={selectedNotes}
  handleSelect={handleSelect}
/>
    </div>
  );
}

export default App;