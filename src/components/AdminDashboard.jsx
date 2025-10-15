import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const cards = [
    { title: "Resume Screening", description: "Analyze and score candidate resumes." },
    { title: "Add Jobs", description: "Post and manage job openings.", route: "/admin/add-jobs" },
    { title: "Interview Scoring", description: "Score candidate interviews." },
    { title: "Analytics & Insights", description: "View platform analytics." },
    { title: "Manage Users", description: "Manage admins and candidates." },
  ];

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Reva AI Admin</h1>
        <div>
          <button style={styles.navBtn} onClick={() => navigate("/admin/dashboard")}>Home</button>
          <button style={styles.navBtn} onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Header */}
      <header style={styles.header}>
        <h2>Welcome Back, Admin!</h2>
        <p>Manage resumes, jobs, and candidates efficiently.</p>
      </header>

      {/* Dashboard Cards */}
      <section style={styles.cardGrid}>
        {cards.map((card) => (
          <div key={card.title} style={styles.card}>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDesc}>{card.description}</p>
            <button
              style={styles.cardBtn}
              onClick={() => card.route ? navigate(card.route) : alert(`${card.title} clicked!`)}
            >
              Go
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "#f0f9f0",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    background: "#1a2e1a", // dark green
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "3px solid #50e3c2", // light green accent
  },
  logo: {
    fontWeight: "700",
    fontSize: "1.6rem",
    color: "white", // white logo text
  },
  navBtn: {
    marginLeft: "15px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    background: "#50e3c2", // light green
    color: "#1a2e1a",
    transition: "0.3s",
  },
  header: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "50px",
    color: "#1a2e1a",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    padding: "0 50px 50px 50px",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.3s",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1a2e1a",
    marginBottom: "10px",
  },
  cardDesc: {
    flex: 1,
    color: "#3a523a",
    fontSize: "0.95rem",
    marginBottom: "15px",
  },
  cardBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#1a2e1a", // dark green
    color: "#50e3c2", // light green text
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};
