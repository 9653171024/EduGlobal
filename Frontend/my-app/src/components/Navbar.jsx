import React from 'react';
import {Link} from 'react-router-dom';
import {FaGraduationCap} from 'react-icons/fa';

const Navbar =()=>{
    return (
        <>
        <nav className='navbar'>
            <Link to="/" className="logo"><FaGraduationCap /> EduChain</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/register" className='nav-btn'>Student Register</Link>
            </div>
        </nav>
        </>
    );
}

export default Navbar;