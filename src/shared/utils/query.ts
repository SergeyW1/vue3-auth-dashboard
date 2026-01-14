/**
 * Утилиты для работы с query параметрами URL
 */

/**
 * Преобразует объект параметров в URLSearchParams
 * Игнорирует undefined и null значения
 * @param params - Объект с параметрами запроса
 * @returns URLSearchParams с параметрами
 */
export const buildQueryParams = (
  params: Record<string, string | number | boolean | undefined | null>
): URLSearchParams => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  return queryParams;
};

/**
 * Преобразует объект параметров в строку query параметров
 * Игнорирует undefined и null значения
 * @param params - Объект с параметрами запроса
 * @returns Строка query параметров (без знака "?")
 */
export const buildQueryString = (
  params: Record<string, string | number | boolean | undefined | null>
): string => {
  return buildQueryParams(params).toString();
};
