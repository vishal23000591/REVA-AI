// src/components/CustomerNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isVerified");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "linear-gradient(90deg, #1a2e1a, #2e7d32)",
        height: "90px",
      }}
    >
      <h2 style={{ margin: 0, color: "white", fontSize: "1.4rem" }}>
        REVA AI Customer Portal
      </h2>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          height: "100%",
        }}
      >
        <li>
          <Link to="/customer/home" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/customer/profile" style={{ color: "#fff", textDecoration: "none" }}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="https://bhuvanesh1112006-reva.hf.space" style={{ color: "#fff", textDecoration: "none" }}>
            Upload Documents
          </Link>
        </li>
        <li>
          <Link to="/customer/ats" style={{ color: "#fff", textDecoration: "none" }}>
            ATS Scorer
          </Link>
        </li>
        <li>
          <Link to="https://resume-builder-c5o9.onrender.com/builder" style={{ color: "#fff", textDecoration: "none" }}>
            Resume Builder
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "#ff4d4d",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
