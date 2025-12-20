import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from './store/profileStore';
import type { Profile, ProfileUpdateData } from '@/entities/user';

export function useProfileEdit() {
  const router = useRouter();
  const profileStore = useProfileStore();

  const currentProfile = ref<Profile>({
    name: '',
    email: '',
    phone: '',
  });

  const successMessage = ref<string>('');

  // Автоматическая синхронизация полей формы с данными из store
  watch(
    () => profileStore.profile,
    profile => {
      if (profile) {
        currentProfile.value = profile;
      }
    },
    { immediate: true }
  );

  // Загрузка профиля при монтировании
  onMounted(() => {
    profileStore.loadProfile();
  });

  const handleSave = async () => {
    // Очищаем сообщения
    successMessage.value = '';
    profileStore.error = null;

    // Создаем ProfileUpdateData из currentProfile
    const data: ProfileUpdateData = {
      name: currentProfile.value.name,
      email: currentProfile.value.email,
      phone: currentProfile.value.phone,
    };

    // Вызываем сохранение
    const success = await profileStore.saveProfile(data);

    if (success) {
      // Успех: устанавливаем сообщение и через 1.5 сек перенаправляем
      successMessage.value = 'Профиль успешно сохранен';
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
    // Ошибка обрабатывается через profileStore.error, который показывается в компоненте
  };

  return {
    currentProfile,
    successMessage,
    handleSave,
  };
}
