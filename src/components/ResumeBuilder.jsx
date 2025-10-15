import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [resumeLink, setResumeLink] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://reva-ai-backend.onrender.com/api/resume/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.link) {
        setResumeLink(data.link);
      } else {
        alert("Failed to generate resume");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating resume");
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div style={{ padding: "2rem", position: "relative",paddingBottom: "5rem"}}>
        {/* Back to Home Button */}
        

        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
           Resume Builder
        </h1>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "2rem" }}>
          Fill in your details and generate a professional resume instantly.
        </p>

        {/* Form Sections */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gap: "1.5rem",
          }}
        >
          {/* Personal Info */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              background: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3> Personal Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.6rem", margin: "0.5rem 0" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.6rem", margin: "0.5rem 0" }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.6rem", margin: "0.5rem 0" }}
            />
          </div>

          {/* Skills */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              background: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3> Skills</h3>
            <textarea
              name="skills"
              placeholder="e.g. JavaScript, React, Node.js"
              value={formData.skills}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.6rem",
                minHeight: "80px",
                marginTop: "0.5rem",
              }}
            />
          </div>

          {/* Experience */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              background: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3> Work Experience</h3>
            <textarea
              name="experience"
              placeholder="e.g. Software Engineer at XYZ - Built scalable applications"
              value={formData.experience}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.6rem",
                minHeight: "100px",
                marginTop: "0.5rem",
              }}
            />
          </div>

          {/* Education */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              background: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3> Education</h3>
            <textarea
              name="education"
              placeholder="e.g. B.Tech in Computer Science - ABC University (2019-2023)"
              value={formData.education}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.6rem",
                minHeight: "100px",
                marginTop: "0.5rem",
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              padding: "0.7rem 1.5rem",
              background: "#1f6235ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Generate Resume
          </button>
        </form>

        {/* Resume Link */}
        {resumeLink && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1.2rem",
                color: "#2e7d32",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
               Download Your Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
