import { Link } from "react-router-dom";

export default function Home() {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
        color: "#1a2e1a",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroCard}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Welcome to REVA AI </h1>
            <p style={styles.heroSubtitle}>
              "AI-powered Smart Verification & Recruitment Platform"
            </p>
            <p style={styles.heroDesc}>
              REVA AI helps organizations streamline{" "}
              <strong>document verification</strong>,{" "}
              <strong>recruitment</strong>, and{" "}
              <strong>candidate assessments</strong> using secure and intelligent
              AI-driven solutions.
            </p>
            <div style={styles.btnContainer}>
  <Link to="/admin/login" style={linkStyle}>
    <button style={styles.primaryBtn}>Admin Dashboard</button>
  </Link>
  <Link to="/login" style={linkStyle}>
    <button style={styles.secondaryBtn}>Customer Portal</button>
  </Link>
</div>

          </div>
          <div style={styles.heroVisual}>
            <div style={styles.visualPlaceholder}>
              <div style={styles.animatedCircle}></div>
              <div style={styles.animatedSquare}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <div style={styles.longCard}>
          <h2 style={styles.sectionTitle}>About REVA AI</h2>
          <p style={styles.longCardText}>
            REVA AI is an end-to-end platform built to simplify hiring and
            verification processes. From validating applicant documents to
            managing interviews and providing insights, REVA AI ensures speed,
            accuracy, and transparency in recruitment workflows. <br />
            <br />
            Our mission is to empower recruiters, institutions, and
            organizations with AI-driven tools that eliminate manual bottlenecks
            and help identify the best candidates faster, while ensuring data
            security and compliance.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.cardsContainer}>
          {[
            {
              title: " Document Upload",
              text: "Upload and verify certificates, IDs, and official documents using our AI-based verification system.",
            },
            {
              title: " Job Portal",
              text: "Smart job matching connects applicants with relevant roles, reducing manual effort for recruiters.",
            },
            {
              title: " Interview Dashboards",
              text: "Interactive dashboards for managing interview schedules, candidate performance, and evaluations.",
            },
            {
              title: " Analytics & Insights",
              text: "Gain valuable insights into recruitment, application status, and performance through AI-powered analytics.",
            },
          ].map((s, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardIcon}>{s.title.split(" ")[0]}</div>
              <h3 style={styles.cardTitle}>{s.title.split(" ").slice(1).join(" ")}</h3>
              <p style={styles.cardDesc}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={styles.section}>
        <div style={styles.longCard}>
          <h2 style={styles.sectionTitle}>Why Choose REVA AI?</h2>
          <div style={styles.featuresGrid}>
            {[
              "Faster & Automated Verification – Eliminate manual delays with instant document checks.",
              "Secure Data Handling – End-to-end encryption ensures sensitive information is always protected.",
              "AI-Powered Resume & Skill Matching – Get the best-fit candidates for every role, instantly.",
              "Real-time Analytics & Dashboards – Gain complete insights into your recruitment pipelines.",
              "Scalable for Enterprises & Institutions – From startups to global organizations, REVA AI adapts to your needs.",
            ].map((feature, index) => (
              <div key={index} style={styles.featureItem}>
                <p style={styles.featureText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.cardsContainer}>
          {[
            {
              name: "Rahul Sharma",
              role: "HR Director, TechCorp",
              text: "REVA AI reduced our hiring time by 40%. A game changer for recruiters!",
            },
            {
              name: "Sneha Iyer",
              role: "Talent Acquisition Manager",
              text: "The automated document verification saved us countless hours of manual work.",
            },
            {
              name: "Amit Verma",
              role: "CTO, StartupHub",
              text: "We got access to better candidates faster with REVA AI's smart matching system.",
            },
          ].map((t, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.quoteMark}>""</div>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <div style={styles.testimonialAuthor}>
                <h4 style={styles.testimonialName}>{t.name}</h4>
                <p style={styles.testimonialRole}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Get Started with REVA AI</h2>
        <p style={styles.ctaText}>
          Join recruiters, institutions, and organizations already using REVA AI
          to power their recruitment and verification process.
        </p>
        <div style={styles.btnContainer}>
          <Link to="/signup" style={linkStyle}>
            <button style={styles.ctaPrimaryBtn}>Create an Account</button>
          </Link>
          <Link to="/login" style={linkStyle}>
            <button style={styles.ctaSecondaryBtn}>Already a User? Login</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles = {
  heroSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 20px",
    marginBottom: "50px",
  },
  heroCard: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    maxWidth: "1200px",
    width: "100%",
    padding: "60px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
  },
  heroContent: {
    flex: 1,
  },
  heroVisual: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  visualPlaceholder: {
    width: "300px",
    height: "250px",
    position: "relative",
  },
  animatedCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
    position: "absolute",
    top: "20px",
    right: "40px",
    animation: "float 6s ease-in-out infinite",
  },
  animatedSquare: {
    width: "140px",
    height: "140px",
    background: "linear-gradient(135deg, #1a2e1a, #3a523a)",
    position: "absolute",
    bottom: "20px",
    left: "30px",
    borderRadius: "15px",
    animation: "float 4s ease-in-out infinite",
    animationDelay: "1s",
  },
  heroTitle: {
    fontSize: "3.5rem",
    color: "#1a2e1a",
    marginBottom: "20px",
    fontWeight: "800",
    lineHeight: "1.2",
  },
  heroSubtitle: {
    fontSize: "1.4rem",
    color: "#3a523a",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  heroDesc: {
    fontSize: "1.1rem",
    color: "#2e422e",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },
  section: {
    marginBottom: "80px",
    padding: "0 20px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#1a2e1a",
    marginBottom: "50px",
    fontWeight: "700",
    position: "relative",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    background: "white",
    flex: "1 1 300px",
    maxWidth: "340px",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    color: "#1a2e1a",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#2e422e",
  },
  testimonialCard: {
    background: "white",
    flex: "1 1 300px",
    maxWidth: "340px",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    fontSize: "1rem",
    textAlign: "center",
    transition: "all 0.3s ease",
    position: "relative",
  },
  quoteMark: {
    fontSize: "4rem",
    color: "#4CAF50",
    opacity: "0.2",
    position: "absolute",
    top: "10px",
    left: "20px",
    lineHeight: "1",
  },
  testimonialText: {
    fontStyle: "italic",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  testimonialAuthor: {
    marginTop: "20px",
  },
  testimonialName: {
    margin: "0",
    color: "#1a2e1a",
    fontSize: "1.1rem",
  },
  testimonialRole: {
    margin: "5px 0 0",
    color: "#3a523a",
    fontSize: "0.9rem",
  },
  longCard: {
    background: "white",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 50px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  longCardText: {
    fontSize: "1.1rem",
    color: "#2e422e",
    lineHeight: "1.7",
    marginTop: "15px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },
  featureItem: {
    textAlign: "left",
    padding: "20px",
    background: "#f0f9f0",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  featureText: {
    margin: "0",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  cta: {
    padding: "100px 20px",
    background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
    textAlign: "center",
    color: "white",
    margin: "40px 0 0",
  },
  ctaTitle: {
    fontSize: "2.8rem",
    marginBottom: "20px",
    fontWeight: "700",
  },
  ctaText: {
    fontSize: "1.2rem",
    maxWidth: "700px",
    margin: "0 auto 40px",
    opacity: "0.9",
    lineHeight: "1.6",
    color:"#255325ff "
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#1a2e1a",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#1a2e1a",
    padding: "15px 30px",
    border: "2px solid #1a2e1a",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  ctaPrimaryBtn: {
    background: "white",
    color: "#2E7D32",
    padding: "18px 35px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
  ctaSecondaryBtn: {
    background: "transparent",
    color: "white",
    padding: "18px 35px",
    border: "2px solid white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    color:"#258e25ff "
  },
};

// Add this to your global CSS file or use a style tag
const globalStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  .card:hover, .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }
  
  .primary-btn:hover {
    background: #2e422e;
    transform: translateY(-2px);
    boxShadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  .secondary-btn:hover {
    background: rgba(26, 46, 26, 0.1);
    transform: translateY(-2px);
  }
  
  .cta-primary-btn:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
    boxShadow: 0 8px 16px rgba(0,0,0,0.2);
  }
  
  .cta-secondary-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .feature-item:hover {
    transform: translateY(-3px);
    boxShadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

// Add the global styles to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);
}