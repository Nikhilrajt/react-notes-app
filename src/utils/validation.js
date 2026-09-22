export function validateNote(newNote, notes, editingId, tagInput) {
  const textContent = new DOMParser()
    .parseFromString(newNote.content, "text/html")
    .body.textContent
    .trim();

  if (textContent === "") {
    return {
      content: "Content is required"
    };
  }

  if (newNote.title.length > 100) {
    return {
      title: "Title cannot exceed 100 characters"
    };
  }

  const duplicate = notes.some(
    (note) =>
      note.id !== editingId &&
      note.title.trim() === newNote.title.trim() &&
      note.content.trim() === newNote.content.trim()
  );

  if (duplicate) {
    return {
      duplicate: "A note with the same title and content already exists"
    };
  }

  if (textContent.length > 1000) {
    return {
      content: "Content cannot exceed 1000 characters"
    };
  }

  if (
    tagInput
      .split(",")
      .some((tag) => tag.trim().length > 30)
  ) {
    return {
      tags: "Each tag cannot exceed 30 characters"
    };
  }

  return {};
}