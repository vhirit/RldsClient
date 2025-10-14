import axios from "axios";


// const API_URL = "http://localhost:8080/api/user"; // Updated to match your API

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login - Updated endpoint
const login = async (email, password) => {
  const response = await api.post("/api/user/customer/login", { email, password }); // Updated endpoint

  if (response.data.success) {
    const { token, user } = response.data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user, message: response.data.message };
  }

  throw new Error(response.data.message || 'Login failed');
};

// Logout
const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Restore from storage
const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export default { login, logout, getStoredAuth };