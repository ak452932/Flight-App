import axios from 'axios';

// Sahi URL jisme /api/auth path shaamil hai
const API_URL = 'https://flight-booking-backend-idk2.onrender.com/api/auth';

export const login = async (email, password) => {
  try {
    // Ab ye call sahi raste '.../api/auth/login' par jayegi
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    // Backend se aane wala sahi error message dikhane ke liye
    throw error.response?.data?.message || 'Login failed';
  }
};
