<script setup lang="ts">
import { ref } from 'vue';
import { type ProductCreateData } from '@/entities/product';

const model = defineModel<boolean>();

const emit = defineEmits<{
  (e: 'save', payload: ProductCreateData): void;
}>();

const product = ref<ProductCreateData>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
});

const handleSaveProduct = () => {
  emit('save', product.value);

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
      <v-form @submit.prevent="handleSaveProduct">
        <v-card-title class="title"> Добавление товара </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="product.name"
            :rules="rules"
            label="Название"
          />
          <v-text-field v-model="product.description" label="Описание" />
          <v-text-field v-model="product.price" label="Прайс" />
          <v-text-field v-model="product.stock" type="number" label="Запас" />
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
