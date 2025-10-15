import React, { useState, useEffect } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./Footer";

export default function CustomerProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    education: "",
    experience: "",
    image: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile(user);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  return (
    <div >
      {/* Navbar */}
      <CustomerNavbar />

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>👤 My Profile</h1>
        <p>Manage your personal details and account settings.</p>

        <div style={{ margin: "1rem auto" }}>
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #2e7d32",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                fontSize: "2rem",
                
              }}
            >
              👤
            </div>
          )}
        </div>

        <form
          style={{
            maxWidth: "600px",
            margin: "2rem auto",
            display: "grid",
            gap: "1rem",
            textAlign: "left",
          }}
        >
          <label>
            Profile Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Address:
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Skills:
            <input
              type="text"
              name="skills"
              placeholder="e.g. React, Python, AI"
              value={profile.skills}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Education:
            <textarea
              name="education"
              placeholder="Your qualifications"
              value={profile.education}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>
          <label>
            Experience:
            <textarea
              name="experience"
              placeholder="Your work experience"
              value={profile.experience}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </label>

          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: "0.7rem",
              background: "#154231ff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
      <CustomerFooter />
    </div>
  );
}
