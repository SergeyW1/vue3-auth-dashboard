<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ProductUpdateData } from '@/entities/product';

const model = defineModel<boolean>();

const props = defineProps<{
  product: ProductUpdateData | null;
}>();

const emit = defineEmits<{
  (e: 'update', payload: ProductUpdateData): void;
}>();

const updateProduct = ref<ProductUpdateData>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
});

watch(model, newVal => {
  if (newVal && props.product) {
    updateProduct.value = { ...props.product };
  }
});

const handleUpdateProduct = () => {
  emit('update', updateProduct.value);

  model.value = false;
};

const rules = [
  (value: string) => {
    if (value) return true;
    return 'Обязательное поле';
  },
];
</script>

<template>
  <v-dialog v-model="model" max-width="600" class="delete-dialog">
    <v-card class="title">
      <v-form @submit.prevent="handleUpdateProduct">
        <v-card-title class="title"> Обновление товара </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="updateProduct.name"
            :rules="rules"
            label="Название"
          />
          <v-text-field v-model="updateProduct.description" label="Описание" />
          <v-text-field v-model="updateProduct.price" label="Прайс" />
          <v-text-field
            v-model="updateProduct.stock"
            type="number"
            label="Запас"
          />
        </v-card-text>

        <v-card-actions class="actions">
          <v-spacer></v-spacer>

          <v-btn color="red" @click="model = false">Отменить</v-btn>

          <v-btn color="green" type="submit">Сохранить</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.delete-dialog :deep(.v-card) {
  border-radius: 12px;
  padding: 4px;
}

.delete-dialog :deep(.title) {
  font-size: 18px;
  font-weight: 600;
}

.delete-dialog :deep(.text) {
  font-size: 14px;
  color: #555;
  margin-top: 8px;
}

.delete-dialog :deep(.actions) {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
