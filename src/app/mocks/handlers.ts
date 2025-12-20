import { http, HttpResponse } from 'msw';
import type { Profile, ProfileUpdateData } from '@/entities/user';
import { getProductsHandler } from './products';

/**
 * Моковые данные профиля
 */
const mockProfile: Profile = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+7 (999) 123-45-67',
  avatar: undefined,
};

/**
 * Обработчики запросов для MSW
 * Моки для API запросов профиля пользователя и товаров
 */
export const handlers = [
  // Получение информации о профиле
  http.get('/api/profile', () => {
    return HttpResponse.json<Profile>(mockProfile);
  }),

  // Обновление данных профиля
  http.patch('/api/profile', async ({ request }) => {
    const data = (await request.json()) as ProfileUpdateData;

    // Базовая валидация
    if (!data.name || data.name.trim().length === 0) {
      return HttpResponse.json(
        { error: 'Имя обязательно для заполнения' },
        { status: 400 }
      );
    }

    // Обновляем моковые данные
    const updatedProfile: Profile = {
      ...mockProfile,
      name: data.name,
      email: data.email ?? mockProfile.email,
      phone: data.phone ?? mockProfile.phone,
    };

    // Обновляем глобальный мок (для последующих GET запросов)
    Object.assign(mockProfile, updatedProfile);

    return HttpResponse.json<Profile>(updatedProfile);
  }),

  // Получение списка товаров с пагинацией
  getProductsHandler,
];
