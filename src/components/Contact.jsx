import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your message has been received.`);
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#205d42" }}>
          Contact Us
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Have questions or feedback? We'd love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.border = "1px solid #205d42")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.border = "1px solid #205d42")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={textareaStyle}
            onFocus={(e) => (e.target.style.border = "1px solid #205d42")}
            onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.03)";
              e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.9rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  transition: "border 0.3s",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "120px",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #2e8b57, #205d42)",
  color: "white",
  padding: "0.85rem",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  marginTop: "0.5rem",
};
