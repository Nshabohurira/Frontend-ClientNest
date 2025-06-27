
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authApi from '../lib/authApi';

type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  name?: string;
  role?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
  }) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  loadUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const tokens = await authApi.loginUser({ username, password });
          set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            isAuthenticated: true,
          });
          await get().loadUser();
        } catch (err: any) {
          set({ error: err?.detail || 'Login failed' });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          error: null,
          isAuthenticated: false,
        });
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          await authApi.registerUser(data);
          // Optionally, auto-login after registration:
          await get().login(data.username, data.password);
        } catch (err: any) {
          set({ error: err?.detail || 'Registration failed' });
        } finally {
          set({ loading: false });
        }
      },

      refreshAccessToken: async () => {
        const refresh = get().refreshToken;
        if (!refresh) return;
        try {
          const { access } = await authApi.refreshToken(refresh);
          set({ accessToken: access });
        } catch (err: any) {
          set({ error: err?.detail || 'Token refresh failed' });
          get().logout();
        }
      },

      loadUser: async () => {
        const token = get().accessToken;
        if (!token) return;
        try {
          const user = await authApi.getCurrentUser(token);
          set({ 
            user: {
              ...user,
              name: `${user.first_name} ${user.last_name}`,
              role: 'Manager'
            }
          });
        } catch (err: any) {
          set({ error: err?.detail || 'Failed to load user' });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
