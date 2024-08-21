import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Axios Config
const apiClient = axios.create({
  baseURL: 'http://localhost:8989',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global Interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
