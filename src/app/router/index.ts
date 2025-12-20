import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

import { useAuthStore } from '@/pages/auth/store/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();

  // Случай 1: Авторизованный пользователь пытается зайти на страницу логина
  if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'Home' });
    return;
  }

  // Случай 2: Неавторизованный пользователь пытается зайти на защищенную страницу
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
    return;
  }

  // Случай 3: Все остальные случаи - разрешаем переход
  next();
});

export default router;
