// backend/routes/notes.js
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// CREATE a note (no auth for testing)
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      owner: "000000000000000000000000" // Dummy owner for testing
    });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all notes (no auth for testing)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
