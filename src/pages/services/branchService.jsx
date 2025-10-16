// branchService.js
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

// Simple fetch wrapper for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  console.log(`🌐 API Call: ${config.method || 'GET'} ${url}`);
  if (config.body) {
    console.log('📤 Request Body:', JSON.parse(config.body));
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    console.log(`📥 API Response (${response.status}):`, data);
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`❌ API Error for ${url}:`, error);
    throw error;
  }
};

const branchService = {
  // Get all branches
  getAllBranches: async (page = 1, limit = 10) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      }).toString();
      
      const endpoint = `/api/document/documentsbranches?${queryParams}`;
      return await apiCall(endpoint);
    } catch (error) {
      console.error('Error in getAllBranches:', error);
      throw new Error(error.message || 'Failed to fetch branches');
    }
  },

  // Get branch by ID
  getBranchById: async (id) => {
    try {
      const endpoint = `/api/document/documentsbranches/${id}`;
      return await apiCall(endpoint);
    } catch (error) {
      console.error('Error in getBranchById:', error);
      throw new Error(error.message || 'Failed to fetch branch');
    }
  },

  // Create branch
  createBranch: async (branchData) => {
    try {
      const endpoint = '/api/document/documentsbranches';
      return await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(branchData),
      });
    } catch (error) {
      console.error('Error in createBranch:', error);
      throw new Error(error.message || 'Failed to create branch');
    }
  },

  // Update branch
  updateBranch: async (id, branchData) => {
    try {
      const endpoint = `/api/document/documentsbranches/${id}`;
      return await apiCall(endpoint, {
        method: 'PUT',
        body: JSON.stringify(branchData),
      });
    } catch (error) {
      console.error('Error in updateBranch:', error);
      throw new Error(error.message || 'Failed to update branch');
    }
  },

  // Delete branch
  deleteBranch: async (id) => {
    try {
      const endpoint = `/api/document/documentsbranches/${id}`;
      return await apiCall(endpoint, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error in deleteBranch:', error);
      throw new Error(error.message || 'Failed to delete branch');
    }
  },

  // Get branch statistics
  getBranchStatistics: async () => {
    try {
      const endpoint = '/api/document/documentsbranches/statistics';
      return await apiCall(endpoint);
    } catch (error) {
      console.error('Error in getBranchStatistics:', error);
      throw new Error(error.message || 'Failed to fetch statistics');
    }
  }
};

export default branchService;