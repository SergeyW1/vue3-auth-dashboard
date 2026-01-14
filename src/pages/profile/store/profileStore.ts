import { defineStore } from 'pinia';
import type { Profile, ProfileUpdateData } from '@/entities/user';
import { userApi } from '@/entities/user/api/userApi';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null as Profile | null,
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async loadProfile() {
      this.isLoading = true;
      this.error = null;
      try {
        this.profile = await userApi.fetchProfile();
      } catch (error) {
        this.error = 'Ошибка загрузки профиля';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async saveProfile(data: ProfileUpdateData) {
      this.isLoading = true;
      this.error = null;
      try {
        this.profile = await userApi.updateProfile(data);
        return true;
      } catch (error) {
        this.error = 'Ошибка сохранения профиля';
        console.error(error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
