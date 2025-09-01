// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import noteRoutes from "./routes/noteRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ============================
   MIDDLEWARE
============================ */
app.use(cors({ origin: "*" })); // safer to allow only frontend origin later
app.use(express.json());

/* ============================
   MONGO CONNECTION
============================ */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/collabnote")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ============================
   ROUTES
============================ */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Test route (for debugging 404s)
app.get("/", (req, res) => {
  res.send("🚀 CollabNote API is running...");
});

/* ============================
   SOCKET.IO
============================ */
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // join a note room
  socket.on("join-note", (noteId) => {
    socket.join(noteId);
    console.log(`User ${socket.id} joined note ${noteId}`);
  });

  // when user edits a note
  socket.on("edit-note", ({ noteId, content }) => {
    // broadcast the update to other users in the same room
    socket.to(noteId).emit("note-update", content);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

/* ============================
   START SERVER
============================ */
const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
