<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '../store/profileStore';
import { useProfileEdit } from '../useProfileEdit';

const router = useRouter();
const profileStore = useProfileStore();
const { currentProfile, successMessage, handleSave } = useProfileEdit();

// Минимальная логика тоста - буквально 2 строчки
const toastText = computed(
  () => successMessage.value || profileStore.error || ''
);
const toastColor = computed(() => (successMessage.value ? 'success' : 'error'));
</script>

<template>
  <v-container class="profile-edit-container">
    <v-card class="profile-edit-card">
      <v-card-title class="profile-edit-title">
        Редактирование профиля
      </v-card-title>

      <v-progress-linear
        v-if="profileStore.isLoading"
        indeterminate
        color="primary"
        class="mb-4"
      />

      <v-alert
        v-if="toastText"
        :type="toastColor"
        density="compact"
        class="mb-4"
      >
        {{ toastText }}
      </v-alert>

      <v-card-text v-if="!profileStore.isLoading" class="profile-edit-text">
        <v-text-field
          v-model="currentProfile.name"
          type="text"
          label="Имя"
          variant="outlined"
          class="profile-edit-field mb-4"
          required
        />
        <v-text-field
          v-model="currentProfile.email"
          type="email"
          label="Email"
          variant="outlined"
          class="profile-edit-field mb-4"
        />
        <v-text-field
          v-model="currentProfile.phone"
          type="tel"
          label="Телефон"
          variant="outlined"
          class="profile-edit-field mb-4"
        />

        <v-btn
          color="grey"
          size="large"
          variant="outlined"
          @click="router.push('/')"
        >
          Отменить
        </v-btn>
        <v-btn
          type="button"
          color="primary"
          size="large"
          variant="flat"
          class="ml-4"
          :disabled="profileStore.isLoading"
          @click="handleSave"
        >
          Сохранить
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.profile-edit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px); /* Вычитаем высоту app-bar */
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-edit-card {
  width: 100%;
  max-width: 600px;
  padding: 0;
}

.profile-edit-title {
  font-size: 24px;
  font-weight: 600;
  padding: 40px 40px 24px 40px;
  text-align: center;
}

.profile-edit-text {
  padding: 0 40px 24px 40px;
}

.profile-edit-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.profile-edit-field {
  width: 100%;
  max-width: 400px;
}

.profile-edit-actions {
  padding: 24px 40px 40px 40px;
}
</style>
