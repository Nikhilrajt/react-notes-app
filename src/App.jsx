import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard";
function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: 1,
        title: "React Learning",
        content: "Today I learned about useEffect and useState.",
        color: "yellow",
        pinned: false,
        tags: ["React", "Learning"],
        archived: false,
        createdAt: "Sep 11, 2026",
        updatedAt: "Sep 11, 2026"
      },
      {
        id: 2,
        title: "Shopping List",
        content: "Milk, bread and vegetables.",
        color: "blue",
        pinned: false,
        tags: ["Personal"],
        archived: false,
        createdAt: "Sep 11, 2026",
        updatedAt: "Sep 11, 2026"
      }
    ];
  });
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
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  function handleAddNote() {
    if (newNote.content.trim() === "") {
      setErrors({
        content: "Content is required"
      });
      return;
    }
    if (newNote.title.length > 100) {
      setErrors({
        title: "Title cannot exceed 100 characters"
      });
      return;
    }
    const duplicate = notes.some(
      (note) =>
        note.id !== editingId &&
        note.title.trim() === newNote.title.trim() &&
        note.content.trim() === newNote.content.trim()
    );
    if (duplicate) {
      setErrors({
        duplicate: "A note with the same title and content already exists"
      });
      return;
    }
    if (newNote.content.length > 1000) {
      setErrors({
        content: "Content cannot exceed 1000 characters"
      });
      return;
    }
    if (
      tagInput
        .split(",")
        .some((tag) => tag.trim().length > 30)
    ) {
      setErrors({
        tags: "Each tag cannot exceed 30 characters"
      });
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
      setNotes(
        notes.map((existingNote) =>
          existingNote.id === editingId
            ? {
              ...note,
              id: editingId,
              createdAt: existingNote.createdAt
            }
            : existingNote
        )
      );
    } else {
      setNotes([...notes, note]);
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
  }
  function handleEdit(note) {
    setEditingId(note.id);
    setNewnote(note);
    setTagInput(note.tags.join(","));
  }
  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure want to delete this note?");
    if (!confirmDelete) {
      return;
    }
    setNotes(notes.filter((note) => note.id !== id));
  }
  function handleArchive(id) {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived }
          : note
      )
    )
  }
  function handlePin(id) {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    );
  }
  function handleSelect(id) {
    setSelectedNotes((previous) =>
      previous.includes(id)
        ? previous.filter((noteId) => noteId !== id)
        : [...previous, id]
    );
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

    setNotes(
      notes.filter((note) => !selectedNotes.includes(note.id))
    );

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
        <input
          className="flex-1 border rounded px-4 py-2 focus:outline-none"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button onClick={handleAddNote} className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          {editingId !== null ? "Update Note" : "Add Note"}</button>
      </div>
      <button
        onClick={() => setShowArchived(!showArchived)}
        className="mt-4 px-4 py-2 border rounded"
      >
        {showArchived ? "Active Notes" : "Archived Notes"}
      </button>
      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="mt-4 border rounded px-4 py-2"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
        <option value="color">Sort by Color</option>
      </select>
      <select
        value={filterColor}
        onChange={(event) => setFilterColor(event.target.value)}
        className="mt-4 ml-2 border rounded px-4 py-2"
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
          className="mt-4 ml-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete Selected ({selectedNotes.length})
        </button>
      )}
      <div className="mt-6 border rounded-lg p-4">
        <input
          placeholder="Title"
          maxLength={100}
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
          <p className="text-red-500 text-sm mt-1">
            {errors.title}
          </p>
        )}
        <textarea
          placeholder="Content"
          maxLength={1000}
          value={newNote.content}
          onChange={(event) => {
            setNewnote({
              ...newNote,
              content: event.target.value
            });
            setErrors({});
          }}
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
            <button key={color}
              type="button"
              onClick={() => setNewnote({
                ...newNote,
                color: color
              })}
              className={`w-8 h-8 rounded-full ${{
                yellow: "bg-yellow-100",
                blue: "bg-blue-100",
                green: "bg-green-100",
                pink: "bg-pink-100",
                red: "bg-red-100"
              }[color]}`}>
            </button>
          ))}
        </div>
        <input
          className="mt-4 w-full border rounded px-4 py-2"
          placeholder="Tags"
          value={tagInput}
          onChange={(event) => {
            setTagInput(event.target.value);
          }}
        >
        </input>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
    </div>
  );
}

export default App;