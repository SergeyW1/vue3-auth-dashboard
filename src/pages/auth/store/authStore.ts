import { defineStore } from 'pinia';
import type { User } from '@/entities/user';

const AUTH_STORAGE_KEY = 'auth_state';
const defaultState = () => ({
  isAuthenticated: false,
  user: null as User | null,
});

const loadAuthState = () => {
  if (typeof window === 'undefined') {
    return defaultState();
  }

  const rawState = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawState) {
    return defaultState();
  }

  try {
    const parsed = JSON.parse(rawState) as {
      isAuthenticated?: boolean;
      user?: User;
    };
    return {
      isAuthenticated: Boolean(parsed.isAuthenticated),
      user: parsed.user ?? null,
    };
  } catch {
    return defaultState();
  }
};

const persistAuthState = (state: {
  isAuthenticated: boolean;
  user: User | null;
}) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

export const useAuthStore = defineStore('auth', {
  state: () => loadAuthState(),
  actions: {
    login() {
      this.isAuthenticated = true;
      this.user = { name: 'Test User' };
      persistAuthState({
        isAuthenticated: this.isAuthenticated,
        user: this.user,
      });
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    },
  },
});
