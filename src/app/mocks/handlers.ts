import { http, HttpResponse } from 'msw';
import type { Profile, ProfileUpdateData } from '@/entities/user';
import { getProductsHandler } from './products';
import type { Product, ProductCreateData } from '@/entities/product';

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

  http.delete('/api/products/:productId', req => {
    const { productId } = req.params;

    return HttpResponse.json({ message: `Product ${productId} deleted` });
  }),

  http.post('/api/products', async ({ request }) => {
    const data = (await request.json()) as ProductCreateData;

    if (!data.name || !data.price) {
      return HttpResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: data.name,
      stock: data.stock ?? 0,
      description: data.description ?? '',
      price: data.price,
      category: data.category ?? 'default',
      image: data.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json<Product>(newProduct, { status: 201 });
  }),

  http.put('/api/products/:productId', async ({ request, params }) => {
    const { productId } = params;
    const data = (await request.json()) as ProductCreateData;

    if (!data.name || !data.price) {
      return HttpResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const updatedProduct: Product = {
      id: String(productId),
      name: data.name,
      stock: data.stock ?? 0,
      description: data.description ?? '',
      price: data.price,
      category: data.category ?? 'default',
      image: data.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json<Product>(updatedProduct);
  }),
];
