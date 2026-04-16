import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // API call to authService
      const response = await login(email, password);
      console.log("Login Success:", response);
      navigate('/dashboard'); 
    } catch (err) {
      // Agar error string nahi hai toh use convert karein
      setError(typeof err === 'string' ? err : 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111827', color: 'white' }}>
     <div style={{ background: 'white', padding: '40px', borderRadius: '10px', color: 'black' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login Page</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
             style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '250px' }} 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              style={{ display: 'block', marginBottom: '20px', padding: '10px', width: '250px' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading} style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
// import React from 'react';

// const Login = () => {
//   return (
//     <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111827', color: 'white' }}>
//       <div style={{ background: 'white', padding: '40px', borderRadius: '10px', color: 'black' }}>
//         <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login Page</h2>
//         <form>
//           <input type="email" placeholder="Email" style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '250px' }} />
//           <input type="password" placeholder="Password" style={{ display: 'block', marginBottom: '20px', padding: '10px', width: '250px' }} />
//           <button type="button" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

