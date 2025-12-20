import { useAuthStore } from '@/pages/auth/store/authStore';
import type { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/dashboard/ui/HomePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/ui/LoginPage.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: () => import('@/pages/profile/ui/ProfileEditPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: () => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? { name: 'Home' } : { name: 'Login' };
    },
  },
];
