<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/pages/auth/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

const onLogout = () => {
  authStore.logout();
  router.push({ path: '/login' });
};

const navigateToProfile = () => {
  router.push('/profile-edit');
};
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar app class="app-bar" elevation="2">
      <v-toolbar-title class="app-title">My Dashboard</v-toolbar-title>

      <v-spacer />

      <v-menu class="user-menu">
        <template #activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="user-btn"
            aria-label="Меню пользователя"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list class="menu-list">
          <v-list-item class="menu-item" @click="navigateToProfile">
            <v-list-item-title>Редактировать профиль</v-list-item-title>
          </v-list-item>

          <v-list-item class="menu-item logout-item" @click="onLogout">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped>
.app-bar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-weight: 600;
  font-size: 1.25rem;
}

.user-btn {
  transition: transform 0.2s ease;
}

.user-btn:hover {
  transform: scale(1.1);
}

.menu-list {
  padding: 8px 0;
}

.menu-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.logout-item {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  padding-top: 8px;
}

.logout-item :deep(.v-list-item-title) {
  color: #d32f2f;
  font-weight: 500;
}

.logout-item:hover {
  background-color: rgba(211, 47, 47, 0.1);
}

.main-content {
  padding: 24px;
}
</style>
