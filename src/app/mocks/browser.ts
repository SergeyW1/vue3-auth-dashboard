import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * Настройка MSW worker для браузера
 * Используется для мокирования API запросов в режиме разработки
 */
export const worker = setupWorker(...handlers);
