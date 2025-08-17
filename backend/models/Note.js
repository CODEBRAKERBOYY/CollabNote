// backend/models/Note.js
const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  content: String,
  editedAt: Date,
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { _id: false });

const noteSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  content: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  versions: [versionSchema],
  lastEdited: Date
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
