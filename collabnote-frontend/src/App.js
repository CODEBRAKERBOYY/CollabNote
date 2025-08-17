import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes from backend
  const fetchNotes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/notes`)
      .then((res) => setNotes(res.data))
      .catch((err) =>
        console.error("❌ Fetch Notes Error:", err.response?.data || err.message)
      );
  };

  useEffect(() => {
    fetchNotes();

    // ✅ Initialize socket connection once
    const socket = io(process.env.REACT_APP_API_URL, {
      transports: ["websocket"], // Prevents long polling delay
    });

    // ✅ Listen for real-time note creation
    socket.on("noteCreated", (newNote) => {
      console.log("📥 New note received via Socket.io:", newNote);
      setNotes((prevNotes) => [...prevNotes, newNote]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Add a new note
  const addNote = () => {
    if (!title.trim() && !content.trim()) {
      alert("Please enter a title or content before adding a note.");
      return;
    }

    console.log("📤 Sending new note to backend:", { title, content });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/notes`, {
        title,
        content,
      })
      .then((res) => {
        console.log("✅ Note created successfully:", res.data);
        setTitle("");
        setContent("");
        // No need to add locally — backend will broadcast via socket
      })
      .catch((err) =>
        console.error("❌ Add Note Error:", err.response?.data || err.message)
      );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CollabNote - Notes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <strong>{note.title}:</strong> {note.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}

export default App;
