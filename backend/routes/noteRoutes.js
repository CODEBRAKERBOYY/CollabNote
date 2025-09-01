const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,   // ✅ added
  updateNote,
  deleteNote
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createNote);       // Create
router.get("/", auth, getNotes);          // Read all
router.get("/:id", auth, getNoteById);    // ✅ Read single note (new)
router.put("/:id", auth, updateNote);     // Update
router.delete("/:id", auth, deleteNote);  // Delete

module.exports = router;
