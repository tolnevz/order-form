<script setup lang="ts">
  const props = defineProps<{ name: string; contact: string; isEditing: boolean; showValidationErrors: boolean }>();
  const emit = defineEmits(['update:name', 'update:contact']);

  const updateName = (event: Event) => {
    emit('update:name', (event.target as HTMLInputElement).value);
  };

  const updateContact = (event: Event) => {
    emit('update:contact', (event.target as HTMLInputElement).value);
  };
</script>

<template>
  <section class="manufacturer-info">
    <h2>Данные изготовителя</h2>
    <div class="form-group">
      <label for="manufacturerName">Название:</label>
      <input
        v-if="props.isEditing"
        type="text"
        id="manufacturerName"
        :value="props.name"
        @input="updateName"
        :class="{ 'input-error': !props.name && props.isEditing && props.showValidationErrors }"
      />
      <p v-else>{{ name }}</p>
      <span v-if="!props.name && props.isEditing && props.showValidationErrors" class="error-message">Название изготовителя обязательно.</span>
    </div>
    <div class="form-group">
      <label for="manufacturerContact">Контакт:</label>
      <input v-if="props.isEditing" type="text" id="manufacturerContact" :value="props.contact" @input="updateContact" />
      <p v-else>{{ props.contact }}</p>
    </div>
  </section>
</template>

<style scoped>
  .manufacturer-info {
    margin-bottom: 20px;
  }

  .input-error {
    border-color: #e74c3c;
  }
</style>
