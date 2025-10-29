import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>REVA AI</div>
      <div style={linkContainer}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/signup" style={linkStyle}>Signup</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  width: "100%",
  padding: "1rem 2.5rem",
  background: "linear-gradient(90deg, #1a2e1a, #2e7d32)",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoStyle = {
  fontWeight: "800",
  fontSize: "1.7rem",
  letterSpacing: "1px",
};

const linkContainer = {
  display: "flex",
  gap: "1.5rem",
};

const linkStyle = {
  color: "white",
  fontWeight: "500",
  textDecoration: "none",
  fontSize: "1rem",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  transition: "all 0.3s ease",
};

Object.assign(linkStyle, {
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
    transform: "scale(1.05)",
  },
});
