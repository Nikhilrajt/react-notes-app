const STORAGE_KEY = "notes";

export function getStoredNotes() {
    const storedNotes = localStorage.getItem(STORAGE_KEY);

    if (!storedNotes) {
        return [];
    }

    return JSON.parse(storedNotes);
}

export function saveStoredNotes(notes) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notes)
    );
}