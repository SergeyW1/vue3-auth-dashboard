/**
 * Плагин для инициализации Mock Service Worker
 * Используется для мокирования API запросов в режиме разработки
 */
export async function initMSW() {
  // Инициализируем MSW только в режиме разработки
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('@/app/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // Пропускаем необработанные запросы
      });
      console.log('[MSW] Mock Service Worker started');
    } catch (error) {
      console.error('[MSW] Failed to start Mock Service Worker:', error);
    }
  }
}
