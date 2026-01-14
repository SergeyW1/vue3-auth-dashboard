<script setup lang="ts">
import { headersProducts } from './constants';
import { formatDate } from '@/shared/utils/date';
import { useGetProducts } from '@/entities/product';
import { ref } from 'vue';
import ModalDelete from './ModalDelete.vue';
import type {
  Product,
  ProductCreateData,
  ProductUpdateData,
} from '@/entities/product';
import { productApi } from '@/entities/product';
import AddProduct from './AddProduct.vue';
import UpdateProduct from './UpdateProduct.vue';

const isOpenDeleteModal = ref(false);
const isCreateProductModalOpen = ref(false);
const isUpdateProduct = ref(false);

const currItem = ref<Product | null>(null);
const currUpdateProduct = ref<Product | null>(null);

const handleOpenUpdateModal = (product: Product) => {
  currUpdateProduct.value = product;
  isUpdateProduct.value = true;
};

const handleUpdateProduct = async (item: ProductUpdateData) => {
  console.log('Update product', item);
  // await productApi.updateProduct(item.id, item);
};

const handleCreateProductOpenModal = () => {
  isCreateProductModalOpen.value = true;
};

const handleDeleteOpenModal = (item: Product) => {
  isOpenDeleteModal.value = true;
  currItem.value = item;
};

const handleDeleteProduct = async () => {
  if (!currItem.value) return;

  await productApi.deleteProduct(currItem.value.id);

  isOpenDeleteModal.value = false;
  currItem.value = null;
};

const { data: products } = useGetProducts({
  page: 1,
  limit: 100,
});

const handleCreateProduct = async (product: ProductCreateData) => {
  await productApi.createProduct(product);
};
</script>

<template>
  <div class="table-container">
    <div class="table-actions">
      <v-btn @click="handleCreateProductOpenModal"> Добавить </v-btn>
    </div>

    <v-data-table
      :headers="headersProducts"
      :items="products?.data"
      :items-per-page-options="[10, 25, 50, 100]"
      class="table"
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

      <template #[`item.actions`]="{ item }">
        <div class="d-flex">
          <v-btn
            icon="mdi-pencil"
            class="error"
            size="small"
            @click="handleOpenUpdateModal(item)"
          />

          <v-btn
            icon="mdi-delete"
            class="error"
            size="small"
            @click="handleDeleteOpenModal(item)"
          />
        </div>
      </template>
    </v-data-table>
  </div>

  <ModalDelete
    v-model="isOpenDeleteModal"
    :product="currItem"
    @delete="handleDeleteProduct"
  />

  <AddProduct v-model="isCreateProductModalOpen" @save="handleCreateProduct" />

  <UpdateProduct
    v-model="isUpdateProduct"
    :product="currUpdateProduct"
    @update="handleUpdateProduct"
  />
</template>
s
<style scoped>
.table-actions {
  margin-bottom: 16px;
  display: flex;
  justify-content: end;
}

.table-container {
  height: calc(100vh - 64px);
  overflow: hidden;
  padding: 24px;
}

.table {
  height: calc(100% - 200px);
  min-height: 400px;
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

.loading-container,
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
}

.model-delete {
  --v-dialog-min-width: 200px;
}
</style>
