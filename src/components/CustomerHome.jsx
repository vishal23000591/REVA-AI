import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerFooter from "./Footer";

export default function CustomerHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
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
            <Link to="/customer/home" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
          </li>
          <li>
            <Link to="/customer/profile" style={{ color: "#fff", textDecoration: "none" }}>Profile</Link>
          </li>
          <li>
            <Link to="/customer/upload" style={{ color: "#fff", textDecoration: "none" }}>Upload Documents</Link>
          </li>
          <li>
            <Link to="/customer/ats" style={{ color: "#fff", textDecoration: "none" }}>ATS Scorer</Link>
          </li>
          <li>
            <Link to="/customer/resume-builder" style={{ color: "#fff", textDecoration: "none" }}>Resume Builder</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{ background: "transparent", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: "1rem" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div style={{ padding: "3rem", background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)" }}>
        {/* Welcome Banner */}
        <div
          style={{
            background: "linear-gradient(90deg, #4a9951ff, #f1f8e9)",
            padding: "2rem",
            borderRadius: "10px",
            textAlign: "center",
            marginBottom: "2rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Welcome back, {user?.name || "Customer"} 🎉
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#444" }}>
            Manage your career journey with smart tools powered by AI.
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ background: "#fff", padding: "1.2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>5</h2>
            <p>Documents Uploaded</p>
          </div>
          <div style={{ background: "#fff", padding: "1.2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>3</h2>
            <p>ATS Scores Checked</p>
          </div>
          <div style={{ background: "#fff", padding: "1.2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>2</h2>
            <p>Resumes Built</p>
          </div>
          <div style={{ background: "#fff", padding: "1.2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>8</h2>
            <p>Job Vacancies</p>
          </div>
        </div>

        {/* Quick Actions – 4 cards per row */}
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}> Quick Actions</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
            <h3> Upload Documents</h3>
            <p>Securely upload and manage your resumes and other documents.</p>
            <Link to="https://bhuvanesh1112006-reva.hf.space">Go to Upload →</Link>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
            <h3> ATS Scorer</h3>
            <p>Get instant insights into how your resume scores against Applicant Tracking Systems.</p>
            <Link to="/customer/ats">Check My Score →</Link>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
            <h3> Resume Builder</h3>
            <p>Create a professional resume with our AI-powered builder.</p>
            <Link to="https://reva-ai-resume-builder.onrender.com/builder">Build Resume →</Link>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
            <h3> Profile</h3>
            <p>Manage your personal details and account settings.</p>
            <Link to="/customer/profile">Go to Profile →</Link>
          </div>

          {/* Extra card wraps to next line automatically */}
          <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
            <h3> Job Vacancies</h3>
            <p>Explore the latest job openings tailored to your profile.</p>
            <Link to="/customer/jobs">View Jobs →</Link>
          </div>
          {/* New AI Interview Simulations Card */}
  <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", background: "#fff" }}>
    <h3> AI Interview Simulations</h3>
    <p>Practice real-time AI-powered interview simulations to boost your confidence.</p>
    <Link to="https://ai-interview-ib4n.onrender.com">Start Simulation →</Link>
  </div>
  <div
  style={{
    padding: "1.5rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    background: "#fff",
  }}
>
  <h3>Skill Gap Analysis</h3>
  <p>Identify your strengths and areas for improvement based on your skills.</p>
  <Link to="https://skill-gap-analysis-2-cfuw.onrender.com">Analyze Skills →</Link>
</div>
<div>
  <h3>Skill Assessment</h3>
  <p>Test your knowledge and evaluate your proficiency in your chosen role.</p>
  <Link to="https://reva-ai-skill-assessment.onrender.com">Start Assessment →</Link>
</div>

        </div>

        {/* Recent Activity */}
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Recent Activity</h2>
        <ul style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left", background: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <li> Checked ATS score for Resume.pdf</li>
          <li> Uploaded CoverLetter.docx</li>
          <li> Built new resume on Sep 12, 2025</li>
        </ul>

        {/* Career Insights */}
        <h2 style={{ margin: "2rem 0 1rem", textAlign: "center" }}>Career Development Tips</h2>
        <div style={{ background: "linear-gradient(90deg, #f1f8e9, #e8f5e9)", padding: "2rem", borderRadius: "10px", maxWidth: "800px", margin: "0 auto 4rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", margin: 0 }}>
            <li>🔹 Tailor your resume for every job application.</li>
            <li>🔹 Highlight measurable achievements in your experience.</li>
            <li>🔹 Keep your resume concise (1–2 pages).</li>
            <li>🔹 Use action verbs like "developed", "led", "built".</li>
          </ul>
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
}
