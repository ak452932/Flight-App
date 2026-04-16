import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Local storage se user ka data nikalna
  const userToken = localStorage.getItem('userToken');

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Token delete karna
    navigate('/login'); // Wapas login pe bhej dena
  };

  // Agar token nahi hai toh wapas login pe bhej do (Security)
  if (!userToken) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Aap logged in nahi hain!</h2>
          <button onClick={() => navigate('/login')} className="bg-blue-600 px-4 py-2 rounded">
            Login Page par jayein
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between bg-indigo-700 p-4 text-white shadow-lg">
        <h1 className="text-xl font-bold">Flight App Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-4xl font-bold">
              ✔
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login Successful!</h2>
          <p className="text-gray-600 mb-6">Aapka backend aur frontend successfully connect ho gaya hai.</p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 uppercase font-bold">Session Active</p>
            <p className="text-blue-600 truncate font-mono text-xs mt-1">{userToken.substring(0, 30)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
