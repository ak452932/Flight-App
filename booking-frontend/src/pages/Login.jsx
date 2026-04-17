import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authService';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error message ke liye
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // LOGIN FUNCTION
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Page reload rokne ke liye
    setLoading(true);
    setError('');

    try {
      // Backend ko email aur password bhej rahe hain
      const response = await login(email, password);
      console.log("Login Success:", response);
      
      // Success hone par dashboard par bhejein
      navigate('/dashboard'); 
    } catch (err) {
      // Error message set karein
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm border-0 rounded-4" style={{ maxWidth: '480px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0" style={{ fontSize: '24px' }}>Log in</h2>
          </div>

          <p className="text-muted small mb-4">
            New user? <Link to="/signup" className="text-primary text-decoration-none">Register Now</Link>
          </p>

          {/* Error Alert */}
          {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

          {/* Social Logins */}
          <button className="btn btn-outline-secondary w-100 py-2 mb-3 rounded-2 d-flex align-items-center justify-content-center border-opacity-25">
            <FcGoogle className="me-2 fs-5" /> Continue with Google
          </button>

          <div className="d-flex justify-content-center gap-4 mb-4">
            <FaFacebook className="text-primary fs-4 cursor-pointer" />
            <FaLinkedin className="text-primary fs-4 cursor-pointer" />
            <FaGithub className="text-dark fs-4 cursor-pointer" />
          </div>

          <div className="text-center position-relative mb-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">or</span>
          </div>

          {/* FORM START */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small">Username or Email</label>
              <input 
                type="email" 
                required
                className="form-control py-2 shadow-none border-light-subtle" 
                placeholder="Username or Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Password</label>
              <input 
                type="password" 
                required
                className="form-control py-2 shadow-none border-light-subtle" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 small">
              <div className="form-check">
                <input className="form-check-input shadow-none" type="checkbox" id="rememberMe" />
                <label className="form-check-label text-muted" htmlFor="rememberMe">Remember Me</label>
              </div>
              <a href="#" className="text-primary text-decoration-none">Forgot password</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="btn w-100 py-2 fw-bold text-white rounded-2" 
              style={{ backgroundColor: '#006a4e', fontSize: '16px' }}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-4 text-muted" style={{ fontSize: '11px' }}>
            By creating this account, you agree to our <a href="#" className="text-dark fw-semibold">Privacy Policy</a> & <a href="#" className="text-dark fw-semibold">Cookie Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
