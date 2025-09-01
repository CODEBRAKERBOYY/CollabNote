import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";

// ✅ connect frontend socket to backend
const socket = io("http://localhost:5001");

function NoteEditor() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("Untitled Note"); // ✅ track title
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // ✅ Fetch note when page loads
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title || "Untitled Note");
        setContent(res.data.content || "");
      } catch (err) {
        console.error("Error fetching note:", err);
      }
    };
    fetchNote();
  }, [id]);

  // ✅ Join socket room
  useEffect(() => {
    if (!id) return;

    socket.emit("join-note", id);

    socket.on("note-update", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("note-update");
    };
  }, [id]);

  // ✅ Auto-save & broadcast for content
  useEffect(() => {
    if (!note) return;

    const timeout = setTimeout(async () => {
      try {
        setSaving(true);
        await API.put(`/notes/${id}`, { content });
        socket.emit("edit-note", { noteId: id, content });
        setSaving(false);
        setLastSaved(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Auto-save failed:", err);
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [content, id, note]);

  // ✅ Auto-save for title
  useEffect(() => {
    if (!note) return;

    const timeout = setTimeout(async () => {
      try {
        setSaving(true);
        await API.put(`/notes/${id}`, { title });
        setSaving(false);
        setLastSaved(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Title save failed:", err);
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [title, id, note]);

  return (
    <div
      style={{
        background: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#f5f5f5" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setContent(content + " **bold** ")}>B</button>
        <button onClick={() => setContent(content + " *italic* ")}>I</button>
        <button onClick={() => setContent(content + "\n# Heading\n")}>H</button>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: "20px" }}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ✅ Editable Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled Note"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          border: "none",
          background: "transparent",
          color: darkMode ? "#f5f5f5" : "#000",
          marginBottom: "10px",
          width: "100%",
          outline: "none",
        }}
      />

      {/* Content Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        cols={60}
        style={{
          width: "100%",
          padding: "10px",
          background: darkMode ? "#333" : "#fff",
          color: darkMode ? "#f5f5f5" : "#000",
          border: "1px solid #ccc",
        }}
      />

      {/* Status bar */}
      <p style={{ fontSize: "12px", marginTop: "5px" }}>
        {saving
          ? "💾 Saving..."
          : lastSaved
          ? `✅ All changes saved (Last saved at ${lastSaved})`
          : "✅ All changes saved"}
      </p>

      <h3>Preview</h3>
      <div
        style={{
          background: darkMode ? "#2a2a2a" : "#f9f9f9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default NoteEditor;
