import axios from 'axios';

// Create an instance of axios
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept the request to add the Authorization header if a token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the Bearer token
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
