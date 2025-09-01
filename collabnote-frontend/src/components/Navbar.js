import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // back to login
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#2c3e50",
        color: "white",
        padding: "10px 20px",
      }}
    >
      {/* Left side: Logo */}
      <h2 style={{ margin: 0 }}>📓 CollabNote</h2>

      {/* Center: Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          My Notes
        </Link>
      </div>

      {/* Right side: Logout */}
      <button
        onClick={handleLogout}
        style={{
          background: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
