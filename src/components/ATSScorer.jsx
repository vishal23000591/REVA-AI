import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";

export default function ATSScorer() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please upload a resume first!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      const token = localStorage.getItem("accessToken");
      const response = await fetch("hhttps://reva-ai-backend.onrender.com/api/ats/score", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setScore(data.score || "No score returned");
    } catch (err) {
      console.error(err);
      alert("Error scoring resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <CustomerNavbar />

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1> ATS Scorer</h1>
        <p>Upload your resume and get an ATS compatibility score instantly.</p>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <input type="file" onChange={handleFileChange} />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.7rem 1.5rem",
              background: "#154231ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Scoring..." : "Check ATS Score"}
          </button>
        </form>

        {score && (
          <div
            style={{
              marginTop: "2rem",
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#154231ff",
            }}
          >
            ✅ Your ATS Score: {score} / 100
          </div>
        )}
      </div>
    </div>
  );
}
