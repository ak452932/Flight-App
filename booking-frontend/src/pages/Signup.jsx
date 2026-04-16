import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService';

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
      alert("Registration Successful! Now you can Login.");
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-5 bg-white">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Create Account</h2>
            <p className="text-muted small">Join us today!</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center small rounded-3 border-0">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            {/* Full Name Field */}
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control shadow-none border-secondary-subtle" 
                id="nameInput" 
                placeholder="John Doe"
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              <label htmlFor="nameInput" className="text-muted">Full Name</label>
            </div>

            {/* Email Field */}
            <div className="form-floating mb-3">
              <input 
                type="email" 
                className="form-control shadow-none border-secondary-subtle" 
                id="emailInput" 
                placeholder="name@example.com"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
              <label htmlFor="emailInput" className="text-muted">Email Address</label>
            </div>

            {/* Password Field */}
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control shadow-none border-secondary-subtle" 
                id="passwordInput" 
                placeholder="Password"
                required
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
              <label htmlFor="passwordInput" className="text-muted">Password (min 6 characters)</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-success w-100 py-3 rounded-3 fw-bold shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted small">
              Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
