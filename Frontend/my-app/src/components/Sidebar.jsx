import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaUniversity, 
  FaPenNib, 
  FaMoneyCheckAlt, 
  FaHome,
  FaUserGraduate 
} from 'react-icons/fa';
import './Sidebar.css'; // We will create this CSS next

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />
    },
    {
      path: "/recommendations",
      name: "College Finder",
      icon: <FaUniversity />
    },
    {
      path: "/entrance-exams",
      name: "Entrance Exams",
      icon: <FaPenNib />
    },
    {
      path: "/scholarships",
      name: "Scholarships",
      icon: <FaMoneyCheckAlt />
    },
    {
      path: "/reviews",
      name: "Alumni Reviews",
      icon: <FaUserGraduate />
    }
  ];

  return (
    <div className="sidebar-container">
      {/* Sidebar Section */}
      <div style={{ width: isOpen ? "250px" : "60px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">EduGlobal</h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            {isOpen ? <FaTimes onClick={toggle} /> : <FaBars onClick={toggle} />}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <Link to={item.path} key={index} className={`link ${location.pathname === item.path ? 'active' : ''}`}>
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
          </Link>
        ))}
      </div>
      
      {/* Main Content Section */}
      <main style={{ marginLeft: isOpen ? "250px" : "60px", transition: "all 0.5s" }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;