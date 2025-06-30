<script setup lang="ts">
  const props = defineProps<{ currentStatus: string; isEditing: boolean; allStatuses: string[] }>();
  const emit = defineEmits(['update:currentStatus']);

  const isStatusActive = (status: string): boolean => {
    const currentIndex = props.allStatuses.indexOf(props.currentStatus);
    const stepIndex = props.allStatuses.indexOf(status);
    return stepIndex <= currentIndex;
  };

  const updateStatus = (event: Event) => {
    emit('update:currentStatus', (event.target as HTMLSelectElement).value);
  };
</script>

<template>
  <section class="order-status">
    <h2>Статус заказа</h2>
    <div class="status-bar">
      <div v-for="(s, index) in props.allStatuses" :key="index" :class="['status-step', { active: isStatusActive(s) }]">
        {{ s }}
      </div>
    </div>
    <div v-if="props.isEditing" class="form-group">
      <label for="statusSelect">Изменить статус:</label>
      <select id="statusSelect" :value="props.currentStatus" @change="updateStatus">
        <option v-for="s in props.allStatuses" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>
    <p class="text-center" v-else>Текущий статус: {{ props.currentStatus }}</p>
  </section>
</template>

<style scoped>
  .order-status {
    margin-bottom: 20px;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 20px;
    position: relative;
  }

  .status-bar::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: #e0e0e0;
    transform: translateY(-50%);
    z-index: 0;
  }

  .status-step {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    background-color: #e0e0e0;
    color: #777;
    border-radius: 20px;
    position: relative;
    z-index: 1;
    margin: 0 5px;
    font-weight: bold;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .status-step.active {
    background-color: #2ecc71;
    color: white;
  }
</style>
