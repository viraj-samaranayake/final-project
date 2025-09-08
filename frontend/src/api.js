import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// attach token before each request
API.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default API;