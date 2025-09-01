import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NoteEditor from "./components/NoteEditor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Dashboard with Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />

        {/* Note Editor with Navbar */}
        <Route
          path="/note/:id"
          element={
            <>
              <Navbar />
              <NoteEditor />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
