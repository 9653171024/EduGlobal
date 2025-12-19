import React from 'react';
import {Link} from 'react-router-dom';
import {FaGraduationCap,FaHome,FaUserPlus} from 'react-icons/fa';

const Navbar =()=>{
    return (
        <>
        <nav className='navbar'>
            <Link to="/" className="logo"><FaGraduationCap /> EduGlobal</Link>
            <div className="nav-links">
                <Link to="/"><FaHome/>Home</Link>
                <Link to="/register" className='nav-btn'><FaUserPlus/>Student Register</Link>
            </div>
        </nav>
        </>
    );
}

export default Navbar;