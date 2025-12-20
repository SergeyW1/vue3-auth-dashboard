import { apiClient } from '@/shared/api/instance';
import type { Profile, ProfileUpdateData } from '../types';

/**
 * Получение информации о профиле пользователя
 */
export const fetchProfile = async (): Promise<Profile> => {
  const response = await apiClient.get<Profile>('/profile');
  return response.data;
};

/**
 * Обновление данных профиля пользователя
 */
export const updateProfile = async (
  data: ProfileUpdateData
): Promise<Profile> => {
  const response = await apiClient.patch<Profile>('/profile', data);
  return response.data;
};
