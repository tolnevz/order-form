<script setup lang="ts">
  const props = defineProps<{ name: string; address: string; isEditing: boolean; showValidationErrors: boolean }>();
  const emit = defineEmits(['update:name', 'update:address']);

  const updateName = (event: Event) => {
    emit('update:name', (event.target as HTMLInputElement).value);
  };

  const updateAddress = (event: Event) => {
    emit('update:address', (event.target as HTMLInputElement).value);
  };
</script>

<template>
  <section class="organization-info">
    <h2>Информация об организации</h2>
    <div class="form-group">
      <label for="organizationName">Название:</label>
      <input
        v-if="props.isEditing"
        type="text"
        id="organizationName"
        :value="props.name"
        @input="updateName"
        :class="{ 'input-error': !props.name && props.isEditing && props.showValidationErrors }"
      />
      <p v-else>{{ props.name }}</p>
      <span v-if="!props.name && props.isEditing && props.showValidationErrors" class="error-message">Название организации обязательно.</span>
    </div>
    <div class="form-group">
      <label for="organizationAddress">Адрес:</label>
      <input v-if="props.isEditing" type="text" id="organizationAddress" :value="props.address" @input="updateAddress" />
      <p v-else>{{ props.address }}</p>
    </div>
  </section>
</template>

<style scoped>
  .organization-info {
    margin-bottom: 20px;
  }
</style>
