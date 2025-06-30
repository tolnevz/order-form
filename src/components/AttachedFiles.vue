<script setup lang="ts">
  import type { File } from '@/models';
  import { ref } from 'vue';
  const props = defineProps<{ files: File[]; isEditing: boolean }>();
  const emit = defineEmits(['update:files']);

  const fileInput = ref<HTMLInputElement | null>(null);

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      const newFiles: File[] = [];
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        newFiles.push({ name: file.name, type: file.type, size: file.size });
      }
      emit('update:files', [...props.files, ...newFiles]);
    }
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const uploadedFiles = input.files;
    if (uploadedFiles) {
      const newFiles: File[] = [];
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        newFiles.push({ name: file.name, type: file.type, size: file.size });
      }
      emit('update:files', [...props.files, ...newFiles]);
    }
  };

  const triggerFileInput = () => {
    fileInput.value?.click();
  };
</script>

<template>
  <section class="attached-files">
    <h2>Вложенные Файлы</h2>
    <div v-if="isEditing" @dragover.prevent @drop="handleFileDrop" class="drop-zone">
      Перетащите файлы сюда или нажмите для загрузки
      <input type="file" @change="handleFileUpload" multiple style="display: none" ref="fileInput" />
      <button class="mt-10" @click="triggerFileInput">Загрузить файлы</button>
    </div>
    <ul>
      <li v-for="(file, index) in props.files" :key="index"> {{ file.name }} ({{ file.type }}) </li>
    </ul>
    <p v-if="props.files.length === 0">Файлы не прикреплены.</p>
  </section>
</template>

<style scoped>
  .attached-files {
    margin-bottom: 20px;
  }

  .attached-files ul {
    list-style: none;
    padding: 0;
  }

  .attached-files li {
    background-color: #ecf0f1;
    padding: 8px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
