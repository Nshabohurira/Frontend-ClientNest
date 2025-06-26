import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { persist } from 'zustand/middleware';

const instance = axios.create({ baseURL: '/api' });

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
