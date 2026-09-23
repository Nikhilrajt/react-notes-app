import { createContext,useContext,useEffect,useState } from "react";
import axios from "axios";
const NotesContext = createContext();
export function NotesProvider({children}){
    const [notes,setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function createNote(note) {
  const response = await axios.post(
    "http://localhost:3000/notes",
    note
  );

  setNotes((previous) => [...previous, response.data]);
}

async function updateNote(id, updates) {
  const response = await axios.put(
    `http://localhost:3000/notes/${id}`,
    updates
  );

  setNotes((previous) =>
    previous.map((note) =>
      note.id === id ? response.data : note
    )
  );
}

async function deleteNote(id) {
  await axios.delete(
    `http://localhost:3000/notes/${id}`
  );

  setNotes((previous) =>
    previous.filter((note) => note.id !== id)
  );
}

async function toggleArchive(id) {
  const note = notes.find((note) => note.id === id);

  if (!note) return;

  const response = await axios.patch(
    `http://localhost:3000/notes/${id}`,
    {
      archived: !note.archived,
      updatedAt: new Date().toISOString()
    }
  );

  setNotes((previous) =>
    previous.map((note) =>
      note.id === id ? response.data : note
    )
  );
}
async function pinNote(id) {
  const note = notes.find((note) => note.id === id);

  if (!note) return;

  const response = await axios.patch(
    `http://localhost:3000/notes/${id}`,
    {
      pinned: !note.pinned,
      updatedAt: new Date().toISOString()
    }
  );

  setNotes((previous) =>
    previous.map((note) =>
      note.id === id ? response.data : note
    )
  );
}
async function bulkDelete(selectedNotes) {
  await Promise.all(
    selectedNotes.map((id) =>
      axios.delete(`http://localhost:3000/notes/${id}`)
    )
  );

  setNotes((previous) =>
    previous.filter(
      (note) => !selectedNotes.includes(note.id)
    )
  );
}
function searchNotes(query) {
  const searchTerm = query.toLowerCase();

  return notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      )
    );
  });
}
    async function fetchNotes(){
        try{
            setLoading(true);
            setError(null);
            const response =  await axios.get("http://localhost:3000/notes");
            setNotes(response.data);
        }
        catch(error){
            setError("Failed to fetch notes");
        }
        finally{
            setLoading(false);
        }
        }
        useEffect(()=>{
            fetchNotes();
        },[]);
    return(
        <NotesContext.Provider 
          value={{
            notes,
            loading,
            error,
            fetchNotes,
                createNote,
    updateNote,
    deleteNote,
    toggleArchive,
        pinNote,
    bulkDelete,
    searchNotes,
          }}>
          {children}
        </NotesContext.Provider>
    );
}
export function useNotesContext(){
    return useContext(NotesContext);
}