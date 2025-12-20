import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Onboarding from './Onboarding';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const loadingToast = toast.loading("Logging in...");

      const res=await axios.post(
        'http://localhost:5000/api/users/login',
        formData
      );

      toast.update(loadingToast, {
        render: `Welcome back.${res.data.user.name}!`,
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      // save
      localStorage.setItem('userInfo',JSON.stringify(res.data.user));

      setTimeout(() => navigate('/Onboarding'), 2000);

    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />

      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
