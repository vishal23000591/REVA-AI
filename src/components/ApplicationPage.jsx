import React, { useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./Footer";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    skills: "",
    experience: "",
    education: "",
    coverLetter: "",
    expectedSalary: "",
    availability: "",
  });

  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => setResume(e.target.files[0]);

  const handleUpload = async () => {
    if (!resume) return alert("Please upload your resume!");
    const formDataObj = new FormData();
    formDataObj.append("resume", resume);

    try {
      const res = await fetch("https://reva-ai-backend.onrender.com/api/parse-resume", {
        method: "POST",
        body: formDataObj,
      });
      const data = await res.json();
      setFormData({
        ...formData,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        skills: data.skills || "",
        experience: data.experience || "",
        education: data.education || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Final Application Submitted:", formData);
    alert("Application submitted successfully!");
  };

  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
    },
    container: {
      flex: 1,
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "2.5rem",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#333",
    },
    resumeUpload: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },
    uploadBtn: {
      padding: "0.5rem 1rem",
      background: "#2e7d32",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    form: {
      display: "grid",
      gap: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem",
      outline: "none",
      transition: "border 0.3s",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem",
      minHeight: "80px",
      resize: "vertical",
      outline: "none",
      transition: "border 0.3s",
    },
    submitBtn: {
      padding: "0.75rem",
      background: "#114a21ff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "background 0.3s",
    },
  };

  return (
    <div style={styles.page}>
      <CustomerNavbar />

      <div style={styles.container}>
        <h2 style={styles.title}>📝 Job Application Form</h2>

        <div style={styles.resumeUpload}>
          <label>Resume Upload:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <button style={styles.uploadBtn} onClick={handleUpload}>
            Upload & Autofill
          </button>
        </div>

        <form style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio / Website"
            value={formData.portfolio}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            style={styles.textarea}
          />
          <textarea
            name="experience"
            placeholder="Experience (list roles/projects)"
            value={formData.experience}
            onChange={handleChange}
            style={styles.textarea}
          />
          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            style={styles.textarea}
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            value={formData.coverLetter}
            onChange={handleChange}
            style={styles.textarea}
          />
          <input
            type="text"
            name="expectedSalary"
            placeholder="Expected Salary (INR)"
            value={formData.expectedSalary}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g., Immediate / 2 weeks notice)"
            value={formData.availability}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="button" style={styles.submitBtn} onClick={handleSubmit}>
            Submit Application
          </button>
        </form>
      </div>

      <CustomerFooter />
    </div>
  );
}
