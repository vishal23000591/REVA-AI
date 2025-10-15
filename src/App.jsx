import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Public components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verify from "./components/Verify";
import Footer from "./components/Footer";

// Customer components
import CustomerHome from "./components/CustomerHome";
import FileUpload from "./components/FileUpload";
import CustomerProfile from "./components/CustomerProfile";
import ATSScorer from "./components/ATSScorer";
import ResumeBuilder from "./components/ResumeBuilder";
import CustomerJobs from "./components/CustomerJobs";

// Admin components
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddJobs from "./components/AddJobs";
import ApplicationPage from "./components/ApplicationPage";

// ----------------------
// Protected Routes
// ----------------------
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const verified = localStorage.getItem("isVerified") === "true";
  if (!token) return <Navigate to="/login" />;
  if (!verified) return <Navigate to="/verify" />;
  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" />;
  return children;
};

// ----------------------
// Layout Wrapper
// ----------------------
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooter =
    location.pathname.startsWith("/customer") ||
    location.pathname.startsWith("/admin"); // hide Navbar/Footer on these pages
  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

// ----------------------
// Main App Component
// ----------------------
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />

          {/* Customer Routes */}
          <Route
            path="/customer/home"
            element={
              <ProtectedRoute>
                <CustomerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/upload"
            element={
              <ProtectedRoute>
                <FileUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/ats"
            element={
              <ProtectedRoute>
                <ATSScorer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/resume-builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/jobs"
            element={
              <ProtectedRoute>
                <CustomerJobs />
              </ProtectedRoute>
            }
          />
          <Route
  path="/customer/apply/:jobId"
  element={
    <ProtectedRoute>
      <ApplicationPage />
    </ProtectedRoute>
  }
/>


          {/* Admin Routes */}
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/add-jobs"
            element={
              <ProtectedAdminRoute>
                <AddJobs />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
