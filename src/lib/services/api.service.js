import axios from 'axios';
import { API_ENDPOINTS } from '../constants/app.constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH + '/login', credentials);
    return response.data;
  },
  logout: async () => {
    await api.post(API_ENDPOINTS.AUTH + '/logout');
    localStorage.clear();
  }
};

export const emailService = {
  getEmails: async (page = 1, labels = []) => {
    const response = await api.get(API_ENDPOINTS.GMAIL + '/emails', {
      params: { page, labels }
    });
    return response.data;
  },
  
  getThread: async (threadId) => {
    const response = await api.get(API_ENDPOINTS.GMAIL + `/threads/${threadId}`);
    return response.data;
  },

  summarizeEmail: async (emailId) => {
    const response = await api.post(API_ENDPOINTS.SUMMARIES + '/email', { emailId });
    return response.data;
  }
};

export const settingsService = {
  saveSettings: async (settings) => {
    const response = await api.put(API_ENDPOINTS.SETTINGS, settings);
    return response.data;
  },
  
  getSettings: async () => {
    const response = await api.get(API_ENDPOINTS.SETTINGS);
    return response.data;
  }
};