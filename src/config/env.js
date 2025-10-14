const config = {
  API_BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  API_URL: `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'}/api/user`
};

export default config;