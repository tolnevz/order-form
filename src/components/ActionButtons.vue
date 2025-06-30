<script setup lang="ts">
  const props = defineProps<{ isEditing: boolean }>();
  const emit = defineEmits(['save', 'cancel', 'edit']);
</script>

<template>
  <section class="action-buttons">
    <div class="buttons-container">
      <button>Перейти в чат</button>
      <button>Связаться с поддержкой</button>
      <button v-if="props.isEditing" @click="emit('save')" class="primary-button">Сохранить</button>
      <button v-if="props.isEditing" @click="emit('cancel')" class="secondary-button">Отмена</button>
      <button v-if="!props.isEditing" @click="emit('edit')">Редактировать</button>
    </div>
  </section>
</template>

<style scoped>
  .action-buttons {
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
