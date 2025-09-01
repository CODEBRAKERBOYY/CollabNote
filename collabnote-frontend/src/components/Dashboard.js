import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // fetch all notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    fetchNotes();
  }, [navigate]);

  // create new note
  const handleCreate = async () => {
    try {
      console.log("Token in localStorage:", localStorage.getItem("token")); // 👈 Debug
      const res = await API.post("/notes", {
        title: "Untitled Note",
        content: "",
      });
      console.log("Note created:", res.data); // 👈 Debug
      setNotes([...notes, res.data]);
    } catch (err) {
      console.error("Error creating note:", err.response?.data || err.message); // 👈 Debug
      alert("Error creating note. Please check if you're logged in.");
    }
  };

  // delete note
  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
      alert("Error deleting note.");
    }
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={handleCreate}>+ New Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <Link to={`/note/${note._id}`}>{note.title}</Link>
            <button onClick={() => handleDelete(note._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
