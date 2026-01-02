import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaGraduationCap,
  FaHome,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Re-check login on route change
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo">
        <FaGraduationCap /> EduGlobal
        {user && (
          <span
            style={{
              marginLeft: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#64748b'
            }}
          >
            Hi, {user.name}
          </span>
        )}
      </Link>

      {/* NAV LINKS */}
      <div className="nav-links">
        {/* Home */}
        <Link to="/" className="nav-link-item">
          <FaHome /> Home
        </Link>

        {/* Logged In → Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="nav-link-item"
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                font: 'inherit',        // ✅ forces same font & weight
                fontWeight: 600,        // ✅ matches .nav-link-item
                lineHeight: 'normal'    // ✅ prevents vertical bold look
            }}
        >

            <FaSignOutAlt /> Logout
          </button>
        ) : (
          /* Logged Out → Register */
          <Link to="/register" className="nav-cta-btn">
            <FaUserPlus /> Student Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
