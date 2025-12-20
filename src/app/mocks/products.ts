import { http, HttpResponse } from 'msw';
import type { Product, ProductsResponse } from '@/entities/product';

/**
 * Категории товаров
 */
const categories = [
  'Электроника',
  'Одежда',
  'Еда',
  'Книги',
  'Спорт',
  'Мебель',
  'Игрушки',
  'Красота',
  'Авто',
  'Дом и сад',
];

/**
 * Примеры названий товаров по категориям
 */
const productNames: Record<string, string[]> = {
  Электроника: [
    'Смартфон Samsung Galaxy',
    'Ноутбук ASUS',
    'Наушники Sony',
    'Планшет iPad',
    'Умные часы Apple Watch',
    'Камера Canon',
    'Клавиатура механическая',
    'Мышь беспроводная',
    'Монитор 27 дюймов',
    'Колонка Bluetooth',
  ],
  Одежда: [
    'Футболка хлопковая',
    'Джинсы классические',
    'Кроссовки спортивные',
    'Куртка зимняя',
    'Платье летнее',
    'Рубашка офисная',
    'Шорты спортивные',
    'Пальто демисезонное',
    'Ботинки кожаные',
    'Шарф шерстяной',
  ],
  Еда: [
    'Кофе зерновой',
    'Чай зеленый',
    'Шоколад горький',
    'Мед натуральный',
    'Орехи грецкие',
    'Сыр пармезан',
    'Оливковое масло',
    'Мука пшеничная',
    'Сахар тростниковый',
    'Специи набор',
  ],
  Книги: [
    'Роман современный',
    'Детектив классический',
    'Фантастика научная',
    'Учебник по программированию',
    'Энциклопедия для детей',
    'Словарь иностранных слов',
    'Атлас мира',
    'Биография известного человека',
    'Поэзия сборник',
    'Комикс популярный',
  ],
  Спорт: [
    'Мяч футбольный',
    'Гантели набор',
    'Коврик для йоги',
    'Велосипед горный',
    'Ракетка теннисная',
    'Скейтборд',
    'Лыжи горные',
    'Снаряжение для плавания',
    'Тренажер домашний',
    'Спортивная сумка',
  ],
  Мебель: [
    'Диван угловой',
    'Стол обеденный',
    'Стул офисный',
    'Кровать двуспальная',
    'Шкаф распашной',
    'Комод трехсекционный',
    'Полка настенная',
    'Тумба прикроватная',
    'Кресло кожаное',
    'Стеллаж книжный',
  ],
  Игрушки: [
    'Конструктор LEGO',
    'Кукла интерактивная',
    'Машинка радиоуправляемая',
    'Пазл 1000 деталей',
    'Настольная игра',
    'Мягкая игрушка',
    'Робот программируемый',
    'Набор для творчества',
    'Игрушка развивающая',
    'Кубики деревянные',
  ],
  Красота: [
    'Крем для лица',
    'Шампунь профессиональный',
    'Парфюм элитный',
    'Помада матовая',
    'Тушь для ресниц',
    'Сыворотка для волос',
    'Маска для лица',
    'Скраб для тела',
    'Масло для массажа',
    'Набор косметики',
  ],
  Авто: [
    'Автомобильные шины',
    'Аккумулятор',
    'Моторное масло',
    'Фильтр воздушный',
    'Дворники стеклоочистители',
    'Фары светодиодные',
    'Коврики в салон',
    'Чехлы на сиденья',
    'Навигатор GPS',
    'Видеорегистратор',
  ],
  'Дом и сад': [
    'Горшок для цветов',
    'Лейка садовая',
    'Газонокосилка',
    'Набор инструментов',
    'Лампа настольная',
    'Шторы блэкаут',
    'Ковер напольный',
    'Ваза декоративная',
    'Зеркало настенное',
    'Часы настенные',
  ],
};

/**
 * Генерация случайного числа в диапазоне
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Генерация случайной даты за последний год
 */
function randomDate(): string {
  const now = Date.now();
  const yearAgo = now - 365 * 24 * 60 * 60 * 1000;
  const randomTime = randomInt(yearAgo, now);
  return new Date(randomTime).toISOString();
}

/**
 * Генерация описания товара
 */
function generateDescription(name: string, category: string): string {
  const descriptions = [
    `Высококачественный ${name.toLowerCase()} для повседневного использования.`,
    `Современный ${name.toLowerCase()} с отличными характеристиками и надежностью.`,
    `Популярный ${name.toLowerCase()} в категории ${category.toLowerCase()}.`,
    `Премиальный ${name.toLowerCase()} для требовательных покупателей.`,
    `Экологичный ${name.toLowerCase()} из натуральных материалов.`,
  ];
  const index = randomInt(0, descriptions.length - 1);
  const description = descriptions[index];
  return description ?? descriptions[0] ?? 'Описание товара';
}

/**
 * Генерация массива моковых товаров
 */
export function generateMockProducts(count: number): Product[] {
  const products: Product[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    // Выбираем случайную категорию
    const category = categories[randomInt(0, categories.length - 1)] as string;
    const names = productNames[category] || ['Товар без названия'];

    // Выбираем название, избегая дубликатов
    let name: string;
    let attempts = 0;
    do {
      const nameIndex = randomInt(0, names.length - 1);
      const selectedName = names[nameIndex];
      name = selectedName ?? `Товар ${i + 1}`;
      attempts++;
      if (attempts > 50) {
        // Если не можем найти уникальное имя, добавляем индекс
        name = `${name} ${i + 1}`;
        break;
      }
    } while (usedNames.has(name));
    usedNames.add(name);

    const createdAt = randomDate();
    const updatedAt = new Date(
      new Date(createdAt).getTime() + randomInt(0, 30) * 24 * 60 * 60 * 1000
    ).toISOString();

    products.push({
      id: `product-${i + 1}`,
      name,
      description: generateDescription(name, category),
      price: randomInt(100, 50000),
      category,
      image:
        i % 3 === 0 ? `https://picsum.photos/400/400?random=${i}` : undefined,
      stock: randomInt(0, 1000),
      createdAt,
      updatedAt,
    });
  }

  return products;
}

/**
 * Генерация всех товаров (100 штук)
 */
const allProducts = generateMockProducts(100);

/**
 * Обработчик GET запроса для получения списка товаров с пагинацией
 */
export const getProductsHandler = http.get('/api/products', ({ request }) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const limitParam = url.searchParams.get('limit');

  const page = pageParam !== null ? Number(pageParam) : 1;
  const limit = limitParam !== null ? Number(limitParam) : 10;

  // Валидация параметров
  if (page < 1 || limit < 1 || limit > 100) {
    return HttpResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 }
    );
  }

  // Вычисление offset и слайсинг массива
  const offset = (page - 1) * limit;
  const paginatedProducts = allProducts.slice(offset, offset + limit);

  // Формирование ответа
  const response: ProductsResponse = {
    data: paginatedProducts,
    meta: {
      total: allProducts.length,
      page,
      limit,
    },
  };

  return HttpResponse.json<ProductsResponse>(response);
});
