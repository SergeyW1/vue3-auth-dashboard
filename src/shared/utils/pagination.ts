/**
 * Утилиты для работы с пагинацией
 */

/**
 * Параметры пагинации
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Метаданные пагинации
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Вычисляет offset (смещение) для пагинации
 * @param page - Номер страницы (начинается с 1)
 * @param limit - Количество элементов на странице
 * @returns Смещение для запроса данных
 */
export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/**
 * Вычисляет общее количество страниц
 * @param total - Общее количество элементов
 * @param limit - Количество элементов на странице
 * @returns Общее количество страниц
 */
export const calculateTotalPages = (total: number, limit: number): number => {
  if (limit <= 0) return 0;
  return Math.ceil(total / limit);
};

/**
 * Создает метаданные пагинации
 * @param total - Общее количество элементов
 * @param page - Текущая страница
 * @param limit - Количество элементов на странице
 * @returns Метаданные пагинации
 */
export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number
): PaginationMeta => {
  const totalPages = calculateTotalPages(total, limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

/**
 * Валидирует параметры пагинации
 * @param page - Номер страницы
 * @param limit - Количество элементов на странице
 * @param maxLimit - Максимальное количество элементов на странице (по умолчанию 100)
 * @returns Валидные параметры пагинации или null, если параметры невалидны
 */
export const validatePaginationParams = (
  page: number,
  limit: number,
  maxLimit: number = 100
): PaginationParams | null => {
  if (page < 1 || limit < 1 || limit > maxLimit) {
    return null;
  }
  return { page, limit };
};

/**
 * Нормализует параметры пагинации (устанавливает значения по умолчанию)
 * @param page - Номер страницы (может быть undefined)
 * @param limit - Количество элементов на странице (может быть undefined)
 * @param defaultPage - Значение страницы по умолчанию (по умолчанию 1)
 * @param defaultLimit - Значение лимита по умолчанию (по умолчанию 10)
 * @returns Нормализованные параметры пагинации
 */
export const normalizePaginationParams = (
  page?: number,
  limit?: number,
  defaultPage: number = 1,
  defaultLimit: number = 10
): PaginationParams => {
  return {
    page: page ?? defaultPage,
    limit: limit ?? defaultLimit,
  };
};

/**
 * Создает query параметры для URL из параметров пагинации
 * @param params - Параметры пагинации
 * @returns Объект с query параметрами
 */
export const createPaginationQueryParams = (
  params: PaginationParams
): Record<string, string> => {
  return {
    page: params.page.toString(),
    limit: params.limit.toString(),
  };
};

/**
 * Нормализует параметры запроса с page и limit (подставляет значения по умолчанию)
 * Подставляет дефолт для limit, если указан page, но не указан limit
 * @param params - Параметры запроса с page и limit (и другими опциональными полями)
 * @param defaultLimit - Значение лимита по умолчанию (по умолчанию 10)
 * @returns Нормализованные параметры запроса
 */
export const normalizeQueryParams = <
  T extends { page?: number; limit?: number },
>(
  params: T,
  defaultLimit: number = 10
): T & { limit?: number } => {
  // Подставляем дефолт для limit только если указан page, но не указан limit
  if (params.page !== undefined && params.limit === undefined) {
    return {
      ...params,
      limit: defaultLimit,
    };
  }
  return params;
};

/**
 * Валидирует параметры запроса с page и limit
 * @param params - Параметры запроса с page и limit
 * @throws {Error} Если указан page, но не указан limit
 */
export const validateQueryParams = <
  T extends { page?: number; limit?: number },
>(
  params: T
): void => {
  if (params.page !== undefined && params.limit === undefined) {
    throw new Error('Параметр limit обязателен, когда указан параметр page');
  }
};

/**
 * Преобразует параметры запроса с page и limit в параметры с offset и limit
 * Только трансформирует данные, не выполняет нормализацию и валидацию
 * @param params - Параметры запроса с page и limit (и другими опциональными полями)
 * @returns Параметры запроса с offset и limit вместо page
 */
export const transformPageToOffset = <
  T extends { page?: number; limit?: number },
>(
  params: T
): Omit<T, 'page'> & { offset?: number; limit?: number } => {
  const { page, limit, ...rest } = params;

  const result: Omit<T, 'page'> & { offset?: number; limit?: number } = {
    ...rest,
  } as Omit<T, 'page'> & { offset?: number; limit?: number };

  if (limit !== undefined) {
    result.limit = limit;
  }

  if (page !== undefined && limit !== undefined) {
    result.offset = calculateOffset(page, limit);
  }

  return result;
};

/**
 * Преобразует параметры запроса с page и limit в параметры с offset и limit
 * Выполняет нормализацию, валидацию и трансформацию
 * @param params - Параметры запроса с page и limit (и другими опциональными полями)
 * @param defaultLimit - Значение лимита по умолчанию (по умолчанию 10)
 * @returns Параметры запроса с offset и limit вместо page
 * @throws {Error} Если указан page, но не указан limit (после нормализации)
 */
export const buildQueryParamsWithOffset = <
  T extends { page?: number; limit?: number },
>(
  params: T,
  defaultLimit: number = 10
): Omit<T, 'page'> & { offset?: number; limit?: number } => {
  const normalized = normalizeQueryParams(params, defaultLimit);
  validateQueryParams(normalized);
  return transformPageToOffset(normalized);
};
