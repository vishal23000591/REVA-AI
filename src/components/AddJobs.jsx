import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddJobs() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://reva-ai-backend.onrender.com/api/addjobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://reva-ai-backend.onrender.com/api/addjobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, location, type, description }),
      });
      if (!res.ok) throw new Error("Failed to add job");
      const newJob = await res.json();
      setJobs([newJob, ...jobs]);
      setMessage(`Job "${title}" added successfully!`);
      setTitle("");
      setCompany("");
      setLocation("");
      setType("");
      setDescription("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error adding job");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

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

      {/* Page Container */}
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <h2>Add New Job</h2>
        </header>

        {/* Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          {message && <p style={styles.successMsg}>{message}</p>}
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Job Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitBtn}>
            Add Job
          </button>
        </form>

        {/* Job List */}
        <section style={styles.jobList}>
          {jobs.map((job) => (
            <div key={job._id} style={styles.jobCard}>
              <div style={styles.jobHeader}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <span style={styles.jobType}>{job.type}</span>
              </div>
              <p style={styles.company}>{job.company}</p>
              <p style={styles.location}>📍 {job.location}</p>
              <p style={styles.posted}>
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <p style={styles.description}>{job.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "#f0f9f0",
    margin: 0,
    padding: 0,
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
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    margin: "30px 0 20px 0",
    color: "#1a2e1a",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto 50px auto",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  textarea: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    resize: "vertical",
    minHeight: "100px",
  },
  submitBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#1a2e1a",
    color: "#50e3c2",
    fontWeight: "600",
    cursor: "pointer",
  },
  successMsg: {
    color: "#1a2e1a",
    fontWeight: "600",
    marginBottom: "15px",
    textAlign: "center",
  },
  jobList: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    marginBottom: "50px",
  },
  jobCard: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    borderLeft: "5px solid #50e3c2",
  },
  jobHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  jobTitle: { fontSize: "1.3rem", fontWeight: "700", color: "#1a2e1a" },
  jobType: {
    background: "#50e3c2",
    color: "#1a2e1a",
    padding: "3px 8px",
    borderRadius: "5px",
    fontWeight: "600",
    fontSize: "0.85rem",
  },
  company: { fontWeight: "600", color: "#3a523a" },
  location: { fontStyle: "italic", color: "#3a523a" },
  posted: { fontSize: "0.85rem", color: "#3a523a", marginBottom: "10px" },
  description: { color: "#1a2e1a" },
};
