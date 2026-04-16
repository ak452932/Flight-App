import axios from 'axios';

const API_URL = 'https://onrender.com';



export const login = async (email, password) => {
  try {
    // 2. Ab ye call 'http://localhost:5000/api/auth/login' par jayegi
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    // 3. Error handle karne ke liye
    throw error.response?.data?.message || 'Login failed';
  }
};
