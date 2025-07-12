import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
  getSkills: (id) => api.get(`/users/${id}/skills`),
  getSwaps: (id) => api.get(`/users/${id}/swaps`),
};

// Skills API
export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getByType: (type) => api.get(`/skills/type/${type}`),
  getMySkills: () => api.get('/skills/my-skills'),
  add: (skillData) => api.post('/skills', skillData),
  update: (id, skillData) => api.put(`/skills/${id}`, skillData),
  delete: (id) => api.delete(`/skills/${id}`),
  search: (query) => api.get(`/skills/search/${query}`),
};

// Swaps API
export const swapsAPI = {
  getMySwaps: () => api.get('/swaps/my-swaps'),
  getById: (id) => api.get(`/swaps/${id}`),
  create: (swapData) => api.post('/swaps', swapData),
  updateStatus: (id, status) => api.put(`/swaps/${id}/status`, { status }),
  delete: (id) => api.delete(`/swaps/${id}`),
  getPendingRequests: () => api.get('/swaps/pending/requests'),
};

// Feedback API
export const feedbackAPI = {
  getUserReviews: (userId) => api.get(`/feedback/user/${userId}`),
  create: (reviewData) => api.post('/feedback', reviewData),
};

export default api; 