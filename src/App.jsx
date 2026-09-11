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
  ])
  return (
    <div className = "min-h-screen p-6">
    <h1 className="text-3xl font-bold">Notes</h1>
    <p className=" mt-1 text-gray-500">Your thoughts, organised</p>
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
     <input 
     className = "flex-1 border rounded px-4 py-2 focus:outline-none" 
     placeholder="Search notes..."
     />
     <button className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
      Add Note</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {notes.map((note) => (
  <NoteCard key={note.id} note={note} />
))}

    </div>
    </div>
  );
}

export default App;