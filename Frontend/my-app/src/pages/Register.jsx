import React, { useState, useRef } from 'react';
import axios from 'axios';
// ✅ FIXED IMPORT: Added 'Link' here
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ageRef = useRef(null);
  const specializationRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    currentEducation: 'Bachelors',
    specialization: '',
    targetCourse: '',
    resumeLink: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) { toast.error("Please enter Name"); nameRef.current.focus(); return; }
    if (!formData.email) { toast.error("Please enter Email"); emailRef.current.focus(); return; }
    if (!formData.password) { toast.error("Please enter Password"); passwordRef.current.focus(); return; }
    if (!formData.age) { toast.error("Please enter Age"); ageRef.current.focus(); return; }
    if (!formData.specialization) { toast.error("Specialization is required"); specializationRef.current.focus(); return; }

    try {
      const loadingToast = toast.loading("Creating your account...");
      
      const res = await axios.post('http://127.0.0.1:5001/api/users/register', formData);

      toast.update(loadingToast, {
        render: "Account Created! Starting Onboarding...",
        type: "success",
        isLoading: false,
        autoClose: 1500
      });

      const userToSave = {
        _id: res.data.userId,
        name: formData.name,
        email: formData.email,
        visaStatus: "Not Started",
        loanStatus: "Not Started"
      };
      localStorage.setItem('userInfo', JSON.stringify(userToSave));

      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      toast.dismiss();
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="auth-card">
        <div className="auth-header">
          <h2>Student Registration</h2>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Join us to find your dream university.</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" ref={nameRef} onChange={handleChange} placeholder="e.g. Rahul Sharma" />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" ref={emailRef} onChange={handleChange} placeholder="student@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" ref={passwordRef} onChange={handleChange} placeholder="********" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-group">
              <label>Age</label>
              <input type="number" name="age" ref={ageRef} onChange={handleChange} placeholder="22" />
            </div>
            <div className="input-group">
              <label>Current Level</label>
              <select name="currentEducation" onChange={handleChange}>
                <option>Bachelors</option>
                <option>Masters</option>
                <option>High School</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Specialization / Major</label>
            <input type="text" name="specialization" ref={specializationRef} onChange={handleChange} placeholder="e.g. Computer Science" />
          </div>

          <button type="submit" className="submit-btn-primary">Create Account & Start</button>

          {/* Login Link */}
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/Login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
              Login here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;