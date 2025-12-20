<script setup lang="ts">
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';
import { useRouter } from 'vue-router';
import { authenticate } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();

const router = useRouter();
const email = ref('');
const password = ref('');
const form = ref<VForm | null>(null);
const errorMessage = ref('');

// Правила валидации для email
const emailRules = [
  (value: string) => {
    if (value) return true; // Если поле заполнено - ок
    return 'Email обязателен для заполнения'; // Если пустое - ошибка
  },
  (value: string) => {
    if (value.length >= 3) return true; // Если минимум 3 символа - ок
    return 'Email должен содержать минимум 3 символа'; // Если меньше - ошибка
  },
];

// Правила валидации для password
const passwordRules = [
  (value: string) => {
    if (value) return true;
    return 'Пароль обязателен для заполнения';
  },
  (value: string) => {
    if (value.length >= 3) return true;
    return 'Пароль должен содержать минимум 3 символа';
  },
];

const login = async () => {
  if (!form.value) return; // Защита от null

  errorMessage.value = '';

  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  // Используем функцию авторизации
  const isAuthenticated = authenticate({
    login: email.value,
    password: password.value,
  });

  if (isAuthenticated) {
    authStore.login();
    router.push('/');
  } else {
    errorMessage.value = 'Неверный логин или пароль';
  }
};
</script>

<template>
  <div class="login-container">
    <v-form ref="form" class="login-form" @submit.prevent="login">
      <h1 class="login-title">Авторизация</h1>
      <v-text-field
        v-model="email"
        type="text"
        label="Email"
        variant="outlined"
        :rules="emailRules"
        class="login-field"
      />
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        variant="outlined"
        :rules="passwordRules"
        class="login-field"
      />
      <v-btn class="login-btn" color="primary" size="large" type="submit">
        Войти
      </v-btn>

      <v-alert v-if="errorMessage" type="error" class="mb-4" density="compact">
        {{ errorMessage }}
      </v-alert>
    </v-form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin: 0 0 32px 0;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.login-field {
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  margin-top: 8px;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
}
</style>
