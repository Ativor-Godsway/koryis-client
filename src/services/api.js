import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,

  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("IC-token"); // or use cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
