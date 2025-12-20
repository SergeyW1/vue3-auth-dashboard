<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiClient } from '@/shared/api';
import type { Product, ProductsResponse } from '@/entities/product';

const products = ref<Product[]>([]);

const fetchProducts = async () => {
  try {
    const response = await apiClient.get<ProductsResponse>('/products');
    products.value = response.data.data;
  } catch (error) {
    console.error('Ошибка загрузки продуктов:', error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div>
    <h1>Home Page</h1>

    <slot name="content" />
  </div>

  <v-container
    class="d-flex flex-column align-center justify-center"
    style="min-height: 100vh"
  >
    <v-card class="pa-8">
      <v-card-title class="text-h4 mb-4">Главная страница</v-card-title>
      <v-card-text>
        <p class="text-body-1">Добро пожаловать на главную страницу!</p>
      </v-card-text>

      <ul>
        <li v-for="product in products" :key="product.id">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}</p>
        </li>
      </ul>
    </v-card>
  </v-container>
</template>
