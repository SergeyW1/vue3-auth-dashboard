import dayjs from 'dayjs';

/**
 * Форматирует дату в читаемый формат
 * @param date - Дата в виде строки или объекта Date
 * @returns Отформатированная дата в формате DD.MM.YYYY HH:mm
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) {
    return '';
  }

  return dayjs(date).format('DD.MM.YYYY HH:mm');
};
