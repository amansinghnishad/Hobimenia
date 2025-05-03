import axios from 'axios';

// Use environment variable for the base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // Fallback for local dev

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Important for sending cookies
});

export default instance;
