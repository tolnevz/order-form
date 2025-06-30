<script setup lang="ts">
  import { type Order, Status } from './models';
  import { onMounted, reactive, ref } from 'vue';
  import { useOrderStore } from './stores/order';
  import OrderPhoto from './components/OrderPhoto.vue';
  import AttachedFiles from './components/AttachedFiles.vue';
  import ManufacturerInfo from './components/ManufacturerInfo.vue';
  import OrganizationInfo from './components/OrganizationInfo.vue';
  import ActionButtons from './components/ActionButtons.vue';
  import OrderDetails from './components/OrderDetails.vue';
  import OrderStatus from './components/OrderStatus.vue';

  const orderStore = useOrderStore();
  const isEditing = ref(false);
  const showValidationErrors = ref(false);
  const editableOrder = reactive<Order>(JSON.parse(JSON.stringify(orderStore.order)));
  const statuses = Object.values(Status);

  onMounted(() => {
    orderStore.loadOrder();
    Object.assign(editableOrder, JSON.parse(JSON.stringify(orderStore.order)));
  });

  const toggleMode = () => {
    const isResetOrder = orderStore.confirmReset(editableOrder);
    if (!isResetOrder) return;

    isEditing.value = !isEditing.value;
    if (isEditing.value) {
      Object.assign(editableOrder, JSON.parse(JSON.stringify(orderStore.order)));
      showValidationErrors.value = false;
    } else {
      Object.assign(editableOrder, JSON.parse(JSON.stringify(orderStore.order)));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    if (!editableOrder.title) isValid = false;
    if (!editableOrder.description) isValid = false;
    if (!editableOrder.manufacturer.name) isValid = false;
    if (!editableOrder.organization.name) isValid = false;
    return isValid;
  };

  const saveChanges = () => {
    showValidationErrors.value = true;
    if (validateForm()) {
      orderStore.setOrder(JSON.parse(JSON.stringify(editableOrder)));
      isEditing.value = false;
    } else {
      alert('Пожалуйста, заполните все обязательные поля.');
    }
  };

  const cancelEditing = () => {
    const isResetOrder = orderStore.confirmReset(editableOrder);
    if (!isResetOrder) return;

    Object.assign(editableOrder, JSON.parse(JSON.stringify(orderStore.order)));
    isEditing.value = false;
    showValidationErrors.value = false;
  };
</script>

<template>
  <div class="main-header">
    <div class="title">Форма заказа</div>
    <button @click="toggleMode">{{ isEditing ? 'Просмотр' : 'Редактировать' }}</button>
  </div>
  <div class="container">
    <div class="left-column">
      <OrderPhoto
        :photo="isEditing ? editableOrder.photo : orderStore.order.photo"
        :photoName="isEditing ? editableOrder.photoName : orderStore.order.photoName"
        :isEditing="isEditing"
        @update:photo="editableOrder.photo = $event"
        @update:photoName="editableOrder.photoName = $event"
      />
      <AttachedFiles
        :files="isEditing ? editableOrder.attachedFiles : orderStore.order.attachedFiles"
        :isEditing="isEditing"
        @update:files="editableOrder.attachedFiles = $event"
      />
    </div>

    <div class="right-column">
      <OrderDetails
        :title="isEditing ? editableOrder.title : orderStore.order.title"
        :description="isEditing ? editableOrder.description : orderStore.order.description"
        :isEditing="isEditing"
        :showValidationErrors="showValidationErrors"
        @update:title="editableOrder.title = $event"
        @update:description="editableOrder.description = $event"
      />
      <ManufacturerInfo
        :name="isEditing ? editableOrder.manufacturer.name : orderStore.order.manufacturer.name"
        :contact="isEditing ? editableOrder.manufacturer.contact : orderStore.order.manufacturer.contact"
        :isEditing="isEditing"
        :showValidationErrors="showValidationErrors"
        @update:name="editableOrder.manufacturer.name = $event"
        @update:contact="editableOrder.manufacturer.contact = $event"
      />
      <OrganizationInfo
        :name="isEditing ? editableOrder.organization.name : orderStore.order.organization.name"
        :address="isEditing ? editableOrder.organization.address : orderStore.order.organization.address"
        :isEditing="isEditing"
        :showValidationErrors="showValidationErrors"
        @update:name="editableOrder.organization.name = $event"
        @update:address="editableOrder.organization.address = $event"
      />
      <OrderStatus
        :currentStatus="isEditing ? editableOrder.status : orderStore.order.status"
        :isEditing="isEditing"
        :allStatuses="statuses"
        @update:currentStatus="editableOrder.status = $event"
      />
      <ActionButtons :isEditing="isEditing" @save="saveChanges" @cancel="cancelEditing" @edit="toggleMode" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title {
      font-size: 36px;
      font-weight: bold;

      @media (max-width: 768px) {
        font-size: 24px;
      }
    }
  }

  .left-column,
  .right-column {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fff;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .right-column {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
