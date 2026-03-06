import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('clinic_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('clinic_token');
      localStorage.removeItem('clinic_user');
    }
    return Promise.reject(error);
  }
);

export const servicesAPI = {
  getAll: () => api.get('/services'),
};

export const doctorsAPI = {
  getAll: () => api.get('/doctors'),
};

export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getAll: (page = 1, limit = 10) => api.get(`/appointments?page=${page}&limit=${limit}`),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.post('/auth/verify'),
};

export default api;
