import { useEffect, useState } from "react";

function useNotes() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setLoading(false);
  }, [notes]);

  function addNote(note) {
    setNotes((previous) => [...previous, note]);
  }

  function updateNote(updatedNote) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === updatedNote.id
          ? updatedNote
          : note
      )
    );
  }

  function deleteNote(id) {
    setNotes((previous) =>
      previous.filter((note) => note.id !== id)
    );
  }

  function archiveNote(id) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived }
          : note
      )
    );
  }

  function pinNote(id) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    );
  }

  function bulkDelete(selectedNotes) {
    setNotes((previous) =>
      previous.filter(
        (note) => !selectedNotes.includes(note.id)
      )
    );
  }

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    archiveNote,
    pinNote,
    bulkDelete
  };
}

export default useNotes;