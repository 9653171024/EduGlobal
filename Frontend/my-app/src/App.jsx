import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// --- PAGES ---
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import Recommendations from "./pages/Recommendation";
import StudentLife from "./pages/StudentLife";
import EntranceExams from "./pages/Entrance";
import Scholarships from "./pages/Scholarships";

// Layout wrapper
const AppLayout = ({ children }) => {
  const location = useLocation();

  const publicPaths = ["/", "/register", "/login", "/onboarding"];
  const currentPath = location.pathname.toLowerCase();

  if (publicPaths.includes(currentPath)) {
    return <>{children}</>;
  }

  return <Sidebar>{children}</Sidebar>;
};

function App() {
  return (
    <Router>
      <Navbar />

      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Main App Routes */}
          <Route path="/recommendation" element={<Recommendations />} />
          <Route path="/student-life/:collegeName" element={<StudentLife />} />
          <Route path="/entrance-exams" element={<EntranceExams />} />
          <Route path="/scholarships" element={<Scholarships />} />

          {/* Fallback / Dashboard */}
          <Route path="/dashboard" element={<Recommendations />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;