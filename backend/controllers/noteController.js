const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title: title || "Untitled",
      content: content || "",
      owner: req.user?.id || null, // ✅ allow null if no auth
      lastEdited: Date.now()
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listNotes = async (req, res) => {
  try {
    let notes;
    if (req.user?.id) {
      // Authenticated: only return notes the user owns or collaborates on
      notes = await Note.find({
        $or: [{ owner: req.user.id }, { collaborators: req.user.id }]
      }).sort({ updatedAt: -1 });
    } else {
      // No auth: return all notes (⚠ only for testing!)
      notes = await Note.find().sort({ updatedAt: -1 });
    }
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
