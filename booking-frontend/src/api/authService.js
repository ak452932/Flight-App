// import axios from 'axios';

// // Sahi URL jisme /api/auth path shaamil hai
// //const API_URL = 'https://flight-booking-backend-idk2.onrender.com/api/auth';
// const API_URL='localhost:5000/api/auth';

// export const login = async (email, password) => {
//   try {
//     // Ab ye call sahi raste '.../api/auth/login' par jayegi
//     const response = await axios.post(`${API_URL}/login`, { email, password });
    
//     if (response.data.token) {
//       localStorage.setItem('userToken', response.data.token);
//     }
//     return response.data;
//   } catch (error) {
//     // Backend se aane wala sahi error message dikhane ke liye
//     throw error.response?.data?.message || 'Login failed';
//   }
// };

// export const register = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, { email, password });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || 'Signup failed';
//   }
// };

import axios from 'axios';

// 1. http:// lagana zaroori hai aur end mein '/' mat rakhein
const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// 2. Signup mein 'name' bhi bhejna hoga kyunki model mein required hai
export const register = async (userData) => {
  try {
    // Backend route '/signup' hai, isliye wahi use karein
    const response = await axios.post(`${API_URL}/signup`, userData); 
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed';
  }
};


