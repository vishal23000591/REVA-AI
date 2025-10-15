import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import CustomerFooter from "./Footer";
import { useNavigate } from "react-router-dom";

export default function CustomerJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    fetch("https://reva-ai-backend.onrender.com/api/addjobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f0f9f0 0%, #e6f5e6 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CustomerNavbar />
      <div style={{ padding: "3rem", flex: 1 }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Available Job Vacancies
        </h1>

        {/* Search Input */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem", // Space from footer
          }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 style={{ marginBottom: "0.5rem" }}>{job.title}</h3>
                  <p>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong>Description:</strong>{" "}
                    {job.description || "No description provided"}
                  </p>
                  <p style={{ color: "#888" }}>
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    background: "#2e7d32",
                    color: "#fff",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                  onClick={() => navigate(`/customer/apply/${job._id}`)}
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#555" }}>
              No jobs found for "{searchTerm}"
            </p>
          )}
        </div>
      </div>
      <CustomerFooter />
    </div>
  );
}
