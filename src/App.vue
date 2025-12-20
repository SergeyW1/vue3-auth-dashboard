<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppLayout } from '@/app/layouts';

const route = useRoute();

// Определяем, нужен ли layout на основе мета-данных роута
const needsLayout = computed(() => route.meta.requiresAuth === true);
</script>

<template>
  <v-app>
    <!-- Для страниц с авторизацией - используем полный layout (header + main) -->
    <AppLayout v-if="needsLayout">
      <router-view />
    </AppLayout>

    <!-- Для страниц без авторизации (login) - просто контент без layout -->
    <router-view v-else />
  </v-app>
</template>
