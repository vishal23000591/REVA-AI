import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://reva-ai-backend.onrender.com/api/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token); // store JWT/token
        navigate("/admin/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h1 style={styles.welcome}>Welcome Back, Admin!</h1>
          <p style={styles.subWelcome}>Sign in to access your dashboard</p>

          {error && <p style={styles.error}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
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
            Login
          </button>

          <p style={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/admin/signup" style={styles.signupLink}>
              Signup
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
  welcome: {
    marginBottom: "5px",
    color: "#1a2e1a",
    fontSize: "1.6rem",
    fontWeight: "700",
  },
  subWelcome: {
    marginBottom: "20px",
    color: "#3a523a",
    fontSize: "0.95rem",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "0.9rem",
  },
  primaryBtn: {
    width: "100%",
    background: "#1a2e1a",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "0.3s ease",
    marginBottom: "10px",
  },
  signupText: {
    fontSize: "0.9rem",
    color: "#3a523a",
  },
  signupLink: {
    color: "#1a2e1a",
    fontWeight: "600",
    textDecoration: "none",
  },
};
