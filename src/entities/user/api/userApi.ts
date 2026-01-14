import { apiClient } from '@/shared/api/instance';
import type { Profile, ProfileUpdateData } from '../types';

class UserApi {
  /**
   * @description Получение информации о профиле пользователя
   * @returns Информация о профиле пользователя
   */
  async fetchProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>('/profile');
    return response.data;
  }

  /**
   * @description Обновление данных профиля пользователя
   * @param data - Данные для обновления профиля
   * @returns Обновленная информация о профиле пользователя
   */
  async updateProfile(data: ProfileUpdateData): Promise<Profile> {
    const response = await apiClient.patch<Profile>('/profile', data);
    return response.data;
  }
}

export const userApi = new UserApi();
