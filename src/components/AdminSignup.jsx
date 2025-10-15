import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // adjust path
import Footer from "../components/Footer"; // adjust path

export default function AdminSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Email domain validation
    if (!email.endsWith("@revaai.ac.in")) {
      setError("Email must be a valid @revaai.ac.in address");
      return;
    }

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://reva-ai-backend.onrender.com/api/admin/signup", {
  name,
  email,
  password,
});

      if (response.data.success) {
        setSuccess("Admin registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />

      <div style={styles.container}>
        <form onSubmit={handleSignup} style={styles.form}>
          <h1 style={styles.welcome}>Create Admin Account</h1>
          <p style={styles.subWelcome}>Sign up to access the dashboard</p>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email (@revaai.ac.in)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.primaryBtn}>
            Sign Up
          </button>

          <p style={styles.signupText}>
            Already have an account?{" "}
            <Link to="/admin/login" style={styles.signupLink}>
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "white",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  welcome: { marginBottom: "5px", color: "#1a2e1a", fontSize: "1.6rem", fontWeight: "700" },
  subWelcome: { marginBottom: "20px", color: "#3a523a", fontSize: "0.95rem" },
  input: { width: "100%", padding: "12px 15px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "0.95rem" },
  error: { color: "red", marginBottom: "15px", fontSize: "0.9rem" },
  success: { color: "green", marginBottom: "15px", fontSize: "0.9rem" },
  primaryBtn: { width: "100%", background: "#1a2e1a", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "1rem", transition: "0.3s ease", marginBottom: "10px" },
  signupText: { fontSize: "0.9rem", color: "#3a523a" },
  signupLink: { color: "#1a2e1a", fontWeight: "600", textDecoration: "none" },
};
