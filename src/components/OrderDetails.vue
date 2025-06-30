<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ title: string; description: string; isEditing: boolean; showValidationErrors: boolean }>();
  const emit = defineEmits(['update:title', 'update:description']);

  const updateTitle = (event: Event) => {
    emit('update:title', (event.target as HTMLInputElement).value);
  };

  const updateDescription = (event: Event) => {
    emit('update:description', (event.target as HTMLTextAreaElement).value);
  };

  const formattedDescription = computed(() => {
    let text = props.description || '';
    // Форматирование жирного и курсивного текста
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Форматирование переноса строки
    text = text.replace(/\n/g, '<br>');
    // Форматирование списка
    text = text
      .split('<br>')
      .map(line => {
        if (line.trim().startsWith('- ')) {
          return `<li>${line.trim().substring(2)}</li>`;
        }
        return line;
      })
      .join('');
    if (text.includes('<li>')) {
      text = `<ul>${text}</ul>`;
    }
    return text;
  });
</script>

<template>
  <section class="order-details">
    <h2>Детали заказа</h2>
    <div class="form-group">
      <label for="title">Название:</label>
      <input
        v-if="props.isEditing"
        type="text"
        id="title"
        :value="props.title"
        @input="updateTitle"
        :class="{ 'input-error': !props.title && props.isEditing && props.showValidationErrors }"
      />
      <p v-else>{{ props.title }}</p>
      <span v-if="!props.title && props.isEditing && props.showValidationErrors" class="error-message">Название обязательно.</span>
    </div>

    <div class="form-group">
      <label for="description">Описание:</label>
      <textarea
        v-if="props.isEditing"
        id="description"
        :value="props.description"
        @input="updateDescription"
        :class="{ 'input-error': !props.description && props.isEditing && props.showValidationErrors }"
        rows="8"
      ></textarea>
      <div v-else class="description-content" v-html="formattedDescription"></div>
      <span v-if="!props.description && props.isEditing && props.showValidationErrors" class="error-message">Описание обязательно.</span>
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
    margin-top: 20px;
  }
</style>
