import axios from 'axios';

/**
 * Базовый экземпляр axios с конфигурацией и interceptors
 * Используется для всех API запросов в приложении
 */
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    // Базовая обработка запроса (можно добавить токены, логирование)
    if (import.meta.env.DEV) {
      console.log('[API Request]', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    // Базовая обработка успешного ответа
    if (import.meta.env.DEV) {
      console.log('[API Response]', response.status, response.config.url);
    }
    return response;
  },
  error => {
    // Базовая обработка ошибок
    if (import.meta.env.DEV) {
      console.error(
        '[API Error]',
        error.response?.status,
        error.config?.url,
        error.message
      );
    }
    return Promise.reject(error);
  }
);
