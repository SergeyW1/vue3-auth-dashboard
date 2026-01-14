import { QueryClient } from '@tanstack/vue-query';

/**
 * Базовый QueryClient с конфигурацией для Vue Query
 * Используется для управления состоянием серверного состояния и кэширования
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время, в течение которого данные считаются актуальными
      staleTime: 1000 * 60 * 5, // 5 минут
      // Время хранения неиспользуемых данных в кэше
      gcTime: 1000 * 60 * 30, // 30 минут (ранее cacheTime)
      // Повторные попытки при ошибке
      retry: 1,
      // Рефетч при возвращении фокуса на окно
      refetchOnWindowFocus: false,
      // Рефетч при переподключении
      refetchOnReconnect: true,
    },
    mutations: {
      // Повторные попытки при ошибке мутации
      retry: 0,
    },
  },
});
