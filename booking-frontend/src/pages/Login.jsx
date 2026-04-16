import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background setting
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-5 bg-white">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Login</h2>
            <p className="text-muted small">Access your dashboard</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center small rounded-3 border-0">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            {/* Floating Label for Email */}
            <div className="form-floating mb-3">
              <input 
                type="email" 
                className="form-control shadow-none border-secondary-subtle" 
                id="emailInput" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <label htmlFor="emailInput" className="text-muted">Email Address</label>
            </div>

            {/* Floating Label for Password */}
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control shadow-none border-secondary-subtle" 
                id="passwordInput" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <label htmlFor="passwordInput" className="text-muted">Password</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm"
              disabled={loading}
              style={{ transition: '0.3s' }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted small">
              Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
