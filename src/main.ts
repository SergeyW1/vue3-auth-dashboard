import { createApp } from 'vue';
import '@/shared/styles';
import App from './App.vue';
import { vuetify, queryClient } from '@/shared/plugins';
import router from '@/app/router';
import { createPinia } from 'pinia';
import { initMSW } from '@/shared/plugins';
import { VueQueryPlugin } from '@tanstack/vue-query';

// Инициализируем MSW перед запуском приложения (только в dev режиме)
await initMSW();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);
app.use(router);
app.use(VueQueryPlugin, {
  queryClient,
});

app.mount('#app');
