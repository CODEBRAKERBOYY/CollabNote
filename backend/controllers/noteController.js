const Note = require("../models/Note");

// ====================== CREATE NOTE ======================
const createNote = async (req, res) => {
  try {
    console.log("👉 Incoming request to create note");
    console.log("👉 req.user:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    console.log("✅ Note saved:", note);
    res.status(201).json(note);
  } catch (err) {
    console.error("❌ Error creating note:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ====================== GET ALL NOTES ======================
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== GET SINGLE NOTE ======================
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== UPDATE NOTE ======================
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ====================== DELETE NOTE ======================
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export all functions together
module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
