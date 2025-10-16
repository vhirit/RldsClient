// branchService.js
import axios from 'axios';
import store from '../../store/store';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

// Create axios instance with authentication
const createAuthenticatedAxios = () => {
  const state = store.getState();
  const token = state.auth?.token;
  
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include auth token
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📤 Request Data:', config.data);
      }
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => {
      console.log(`📥 API Response (${response.status}):`, response.data);
      return response;
    },
    (error) => {
      console.error('❌ API Response Error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        // Handle unauthorized access - redirect to login
        console.error('🔒 Unauthorized access - token may be expired');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const branchService = {
  // Get all branches
  getAllBranches: async (page = 1, limit = 10) => {
    try {
      const api = createAuthenticatedAxios();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      }).toString();
      
      const response = await api.get(`/api/document/documentsbranches?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error in getAllBranches:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch branches');
    }
  },

  // Get branch by ID
  getBranchById: async (id) => {
    try {
      const api = createAuthenticatedAxios();
      const response = await api.get(`/api/document/documentsbranches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getBranchById:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch branch');
    }
  },

  // Create branch
  createBranch: async (branchData) => {
    try {
      const api = createAuthenticatedAxios();
      const response = await api.post('/api/document/documentsbranches/register', branchData);
      return response.data;
    } catch (error) {
      console.error('Error in createBranch:', error);
      throw new Error(error.response?.data?.message || 'Failed to create branch');
    }
  },

  // Update branch
  updateBranch: async (id, branchData) => {
    try {
      const api = createAuthenticatedAxios();
      const response = await api.put(`/api/document/documentsbranches/${id}`, branchData);
      return response.data;
    } catch (error) {
      console.error('Error in updateBranch:', error);
      throw new Error(error.response?.data?.message || 'Failed to update branch');
    }
  },

  // Delete branch
  deleteBranch: async (id) => {
    try {
      const api = createAuthenticatedAxios();
      const response = await api.delete(`/api/document/documentsbranches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in deleteBranch:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete branch');
    }
  },

  // Get branch statistics
  getBranchStatistics: async () => {
    try {
      const api = createAuthenticatedAxios();
      const response = await api.get('/api/document/documentsbranches/statistics');
      return response.data;
    } catch (error) {
      console.error('Error in getBranchStatistics:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
};

export default branchService;