import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService';

const Signup = () => {
  // Backend model ke hisaab se 'name' field add kiya
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Pura object bhej rahe hain (name, email, password)
      await register(formData); 
      alert("Registration Successful! Now you can Login.");
      navigate('/login'); 
    } catch (err) {
      // Backend se aane wale exact error message ko handle karne ke liye
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Create Account</h2>
        
        {error && <p className="mb-4 text-center text-red-500 bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Field - Required for Backend Model */}
          <input 
            type="text" placeholder="Full Name" required
            className="w-full rounded-lg border p-3 text-black outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="email" placeholder="Email Address" required
            className="w-full rounded-lg border p-3 text-black outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" placeholder="Password (min 6 characters)" required
            className="w-full rounded-lg border p-3 text-black outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <button 
            disabled={loading}
            className="w-full rounded-lg bg-green-600 p-3 font-bold text-white hover:bg-green-700 transition disabled:bg-green-400"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
