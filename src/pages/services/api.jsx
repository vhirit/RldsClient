import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/document/sourcepersons';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Added timeout
});

// Request interceptor to add auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      return Promise.reject({
        message: error.response.data?.message || 'Request failed',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        message: 'Network error: Unable to connect to server',
        status: 0
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred'
      });
    }
  }
);

// API methods
export const sourcePersonAPI = {
  // Register new source person
  register: async (personData) => {
    try {
      const response = await api.post('/register', personData);
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Registration failed' };
    }
  },

  // Get all persons
  getAllPersons: async () => {
    try {
      const response = await api.get('/all-persons');
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Failed to fetch persons' };
    }
  },

  // Get person by ID
  getPersonById: async (id) => {
    try {
      const response = await api.get(`/${id}`); // Changed endpoint
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Failed to fetch person' };
    }
  },

  // Update person
  updatePerson: async (id, personData) => {
    try {
      const response = await api.put(`/${id}`, personData); // Changed endpoint
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Update failed' };
    }
  },

  // Delete person
  deletePerson: async (id) => {
    try {
      const response = await api.delete(`/${id}`); // Changed endpoint
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Delete failed' };
    }
  },

  // Get statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/statistics'); // Changed endpoint
      return response.data;
    } catch (error) {
      throw error.data || { message: 'Failed to fetch statistics' };
    }
  }
};

export default api;