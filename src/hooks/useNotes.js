import { useEffect, useState } from "react";

function useNotes() {
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

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
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
    addNote,
    updateNote,
    deleteNote,
    archiveNote,
    pinNote,
    bulkDelete
  };
}

export default useNotes;