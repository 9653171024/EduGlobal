import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1. Import Toastify and its CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  // Refs to jump to missing fields
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

    // --- VALIDATION WITH TOASTS & FOCUS ---

    if (!formData.name) {
      toast.error("Please enter your Full Name", { position: "top-right" });
      nameRef.current.focus();
      return;
    }

    if (!formData.email) {
      toast.error("Email Address is missing!", { position: "top-right" });
      emailRef.current.focus();
      return;
    }

    // Check Password Complexity
    const password = formData.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 11;

    if (!isValidLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      toast.error("Password must be 8-11 chars, with Upper, Lower & Special char (@$!%)", { 
        position: "top-right",
        autoClose: 5000 
      });
      passwordRef.current.focus();
      return;
    }

    if (!formData.age) {
      toast.error("Please tell us your Age", { position: "top-right" });
      ageRef.current.focus();
      return;
    }

    if (!formData.specialization) {
      toast.error("Specialization is needed for matching", { position: "top-right" });
      specializationRef.current.focus();
      return;
    }

    // --- SEND DATA TO BACKEND ---
    try {
      // Show loading toast
      const loadingToast = toast.loading("Creating your profile...");

      await axios.post('http://localhost:5000/api/users/register', formData);

      // Update loading toast to success
      toast.update(loadingToast, {
        render: "Profile Created Successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      // Redirect after 2 seconds
      setTimeout(() => navigate('/'), 2000);

    } catch (err) {
      toast.dismiss(); // Remove loading toast
      const errorMsg = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${errorMsg}`, { position: "top-center" });
    }
  };

  return (
    <div className="auth-container">
      {/* 2. Add the Container (Crucial for Toasts to show up) */}
      <ToastContainer autoClose={3000} />

      <div className="auth-card">
        <h2 style={{ marginBottom: '20px' }}>Create Profile</h2>
        
        <form onSubmit={handleSubmit} noValidate>
          
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" ref={nameRef} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" ref={emailRef} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" ref={passwordRef} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input type="number" name="age" ref={ageRef} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Current Level</label>
            <select name="currentEducation" onChange={handleChange}>
              <option>Bachelors</option>
              <option>Masters</option>
              <option>High School</option>
            </select>
          </div>

          <div className="input-group">
            <label>Specialization</label>
            <input type="text" name="specialization" ref={specializationRef} onChange={handleChange} placeholder="e.g. Computer Science" />
          </div>

          <div className="input-group">
            <label>Target Course (Optional)</label>
            <input type="text" name="targetCourse" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Resume Link (Optional)</label>
            <input type="text" name="resumeLink" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn-primary">Create Account</button>

        </form>
      </div>
    </div>
  );
};

export default Register;