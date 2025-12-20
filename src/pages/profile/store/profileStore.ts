import { defineStore } from 'pinia';
import type { Profile, ProfileUpdateData } from '@/entities/user';
import { fetchProfile, updateProfile } from '@/entities/user/api';

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
        this.profile = await fetchProfile();
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
        this.profile = await updateProfile(data);
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
