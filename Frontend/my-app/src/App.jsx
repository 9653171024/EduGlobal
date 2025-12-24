import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import Onboarding from "./pages/Onboarding";
import Recommendations from "./pages/Recommendation";
import StudentLife from './pages/StudentLife';


function App(){
  return(
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Onboarding" element={<Onboarding/>}></Route>
        <Route path="/Recommendation" element={<Recommendations/>}></Route>
        <Route path="/student-life/:collegeName" element={<StudentLife />}></Route>
      </Routes>
    </Router>
  </>);
}
export default App;
