<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiClient } from '@/shared/api';
import type { Product, ProductsResponse } from '@/entities/product';
import { headersProducts } from './constants';
import { formatDate } from '@/shared/utils/date';

const products = ref<Product[]>([]);

const fetchProducts = async () => {
  try {
    const response = await apiClient.get<ProductsResponse>('/products');
    products.value = response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="table-container">
    <v-data-table
      :items="products"
      class="table"
      :headers="headersProducts"
      fixed-header
    >
      <template #[`item.image`]="{ value }">
        <div v-if="value" class="image-container">
          <v-img
            :src="value"
            :alt="`Product image`"
            width="80"
            height="80"
            cover
            class="product-image"
          />
        </div>
        <span v-else class="text-gray">Нет изображения</span>
      </template>
      <template #[`item.createdAt`]="{ value }">
        {{ formatDate(value) }}
      </template>
      <template #[`item.updatedAt`]="{ value }">
        {{ formatDate(value) }}
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.table-container {
  height: calc(100vh - 64px);
  overflow: hidden;
  padding: 24px;
}

.table {
  height: 100%;
}

.table :deep(.v-data-table__wrapper) {
  height: 100%;
  overflow-y: auto;
}

.table :deep(.v-table thead) {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.table :deep(.v-table thead th) {
  background-color: rgb(var(--v-theme-surface));
  position: relative;
}
.image-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
}

.product-image {
  border-radius: 4px;
}
</style>
