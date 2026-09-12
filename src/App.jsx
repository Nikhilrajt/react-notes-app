import {useState} from "react";
import NoteCard from "./components/NoteCard";
function App() {
  const [notes,setNotes] = useState([
    {
      id:1,
      title: "React Learning",
      content: "Today I learned about useEffect and useState.",
      color: "yellow",
      tags: ["React","Learning"],
    updatedAt: "Sep 11, 2026"
    },
    {
    id: 2,
    title: "Shopping List",
    content: "Milk, bread and vegetables.",
    color: "blue",
    tags: ["Personal"],
    updatedAt: "Sep 11, 2026"
  }
  ]);
  const [newNote,setNewnote] = useState({
    title: "",
    content:"",
    color: "yellow",
    tags: []
  });
  const  [editingId,setEditingId] = useState(null);
  const [tagInput, setTagInput] = useState("");
  function handleAddNote(){
    if(newNote.content.trim()===""){
       alert("Content is required");
       return;
    }
    if(newNote.title.length > 100){
      alert("Title cannot exceed 100 characters");
      return;
    }
    const duplicate = notes.some(
      (note)=>
        note.title.trim() === newNote.title.trim() &&
      note.content.trim() === newNote.content.trim()
    );
    if(duplicate){
      alert("A note with the same title and content already exists");
      return;
    }
    if(newNote.content.length > 1000){
      alert("Content cannot exceed 1000 characters");
      return;
    }
    if(newNote.tags.some((tag)=>tag.length > 30)){
      alert("Each tag cannot exceed 30 characters");
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
  updatedAt: new Date().toLocaleDateString()
};
setTagInput("")
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
    content:"",
    color: "yellow",
    tags: []
    });
    setEditingId(null);
    setTagInput("");
  }
 function handleEdit(note) {
  setEditingId(note.id);
  setNewnote(note);
  setTagInput(note.tags.join(","));
}
  return (
    <div className = "min-h-screen p-6">
    <h1 className="text-3xl font-bold">Notes</h1>
    <p className=" mt-1 text-gray-500">Your thoughts, organised</p>
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
     <input 
     className = "flex-1 border rounded px-4 py-2 focus:outline-none" 
     placeholder="Search notes..."
     />
     <button onClick={handleAddNote} className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
      Add Note</button>
    </div>
    <div className="mt-6 border rounded-lg p-4">
  <input
    placeholder="Title"
    maxLength={100}
    value={newNote.title}
    onChange={(event)=>{
      setNewnote({
        ...newNote,
        title: event.target.value
      });
    }}
  />

  <textarea
    placeholder="Content"
    maxLength={1000}
    value={newNote.content}
    onChange={(event)=>{
      setNewnote({
        ...newNote,
        content: event.target.value
      });
    }}
  />
  <div className="flex gap-2 mt-4">
    {["yellow","blue","green","pink","red"].map((color)=>(
      <button key={color}
      type="button"
      onClick={()=>setNewnote({
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
      {notes.map((note) => (
  <NoteCard
   key={note.id} 
   note={note} 
   onEdit={handleEdit}/>
))}

    </div>
    </div>
  );
}

export default App;