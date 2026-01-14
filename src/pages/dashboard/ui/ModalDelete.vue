<script setup lang="ts">
import { type Product } from '@/entities/product';

const model = defineModel<boolean>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

defineProps<{
  product: Product | null;
}>();

const onDelete = () => {
  emit('delete');
  model.value = false;
};
</script>

<template>
  <v-dialog v-model="model" max-width="420" class="delete-dialog">
    <v-card>
      <v-card-title class="title"> Удаление товара </v-card-title>

      <v-card-text class="text">
        Вы действительно хотите удалить
        <strong>{{ product?.name }}</strong
        >? Это действие нельзя отменить.
      </v-card-text>

      <v-card-actions class="actions">
        <v-btn variant="text" @click="model = false"> Отмена </v-btn>

        <v-btn color="error" @click="onDelete"> Удалить </v-btn>
      </v-card-actions>
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
