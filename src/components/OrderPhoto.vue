<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{ photo: string; photoName: string; isEditing: boolean }>();
  const emit = defineEmits(['update:photo', 'update:photoName']);
  const photoInput = ref<HTMLInputElement | null>(null);

  const handlePhotoDrop = (event: DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          emit('update:photo', e.target?.result as string);
          emit('update:photoName', file.name);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Пожалуйста, перетащите файл изображения.');
      }
    }
  };

  const handlePhotoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          emit('update:photo', e.target?.result as string);
          emit('update:photoName', file.name);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Пожалуйста, выберите файл изображения.');
      }
    }
  };

  const triggerPhotoInput = () => {
    photoInput.value?.click();
  };

  const zoomPhoto = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(1.5)';
    target.style.transition = 'transform 0.3s ease';
  };

  const resetPhotoZoom = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(1)';
  };
</script>

<template>
  <section class="order-photo">
    <h2>Фотография заказа</h2>
    <div v-if="props.isEditing" @dragover.prevent @drop="handlePhotoDrop" class="drop-zone">
      Перетащите изображение сюда или нажмите для загрузки
      <input type="file" @change="handlePhotoUpload" accept="image/*" style="display: none" ref="photoInput" />
      <button class="mt-10" @click="triggerPhotoInput">Загрузить фото</button>
    </div>
    <div v-else class="view-mode-photo">
      <img :src="props.photo || '../../img-placeholder.jpg'" alt="Фотография Заказа" @mouseover="zoomPhoto" @mouseout="resetPhotoZoom" />
    </div>
    <p v-if="props.photo">Фото: {{ props.photoName }}</p>
  </section>
</template>

<style scoped>
  .order-photo {
    margin-bottom: 20px;
  }

  .view-mode-photo img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
</style>
