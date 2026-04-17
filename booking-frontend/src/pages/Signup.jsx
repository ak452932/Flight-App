import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService';
import { FcGoogle } from "react-icons/fc"; // npm install react-icons zaroori hai

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      console.log("Signup successful:", formData); // Terminal mein signup data check karne ke liye
      alert("Registration Successful!");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0 rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body p-5">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="fw-bold m-0" style={{ fontSize: '24px' }}>Create Account</h2>
            <button type="button" className="btn-close shadow-none" aria-label="Close"></button>
          </div>
          
          <p className="text-muted small mb-4">
            Already have an account? <Link to="/login" className="text-primary text-decoration-none">Log in</Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSignup}>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Full Name</label>
              <input 
                type="text" 
                className="form-control py-2 shadow-none border-light-subtle" 
                placeholder="Enter your name" 
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold small text-secondary">Email Address</label>
              <input 
                type="email" 
                className="form-control py-2 shadow-none border-light-subtle" 
                placeholder="name@company.com" 
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label fw-semibold small text-secondary">Password</label>
              <div className="position-relative">
                <input 
                  type="password" 
                  className="form-control py-2 shadow-none border-light-subtle" 
                  placeholder="Enter password" 
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Main Sign Up Button */}
            <button 
              type="submit"
              disabled={loading}
              className="btn w-100 py-2 fw-bold text-white rounded-2 mb-3" 
              style={{ backgroundColor: '#006a4e', fontSize: '16px' }}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center position-relative mb-3">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">or</span>
          </div>

          {/* Google Signup Placeholder */}
          <button className="btn btn-outline-secondary w-100 py-2 rounded-2 d-flex align-items-center justify-content-center border-opacity-25 shadow-sm">
            <FcGoogle className="me-2 fs-5" /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
