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
<<<<<<< HEAD
import StudentLife from './pages/StudentLife';
=======
import EntranceExams from "./pages/Entrance";
import Scholarships from "./pages/Scholarships";
>>>>>>> db0160321feeb1479ce6d40ae3892aaa56a060be


const AppLayout = ({ children }) => {
  const location = useLocation();
  
  const publicPaths = ['/', '/register', '/login', '/onboarding'];
  const currentPath = location.pathname.toLowerCase();

  if (publicPaths.includes(currentPath)) {
    return <>{children}</>;
  }

  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
};

function App() {
  return (
    <Router>
      
      <Navbar />
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Onboarding" element={<Onboarding/>}></Route>
        <Route path="/Recommendation" element={<Recommendations/>}></Route>
        <Route path="/student-life/:collegeName" element={<StudentLife />}></Route>
      </Routes>
=======

      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Onboarding" element={<Onboarding />} />

          {/* Private / Sidebar Routes */}
          <Route path="/Recommendation" element={<Recommendations />} />
          <Route path="/entrance-exams" element={<EntranceExams />} />
          <Route path="/scholarships" element={<Scholarships />} />
          
          {/* Dashboard Redirect */}
          <Route path="/dashboard" element={<Recommendations />} />
        </Routes>
      </AppLayout>
>>>>>>> db0160321feeb1479ce6d40ae3892aaa56a060be
    </Router>
  );
}

export default App;