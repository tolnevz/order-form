import type { Order } from '@/models';
import { defineStore } from 'pinia';

const initialOrderData: Order = {
  photo: '',
  photoName: '',
  attachedFiles: [],
  title: 'Заголовок заказа',
  description: 'Это пример описания заказа.\n\n- Пункт 1\n- Пункт 2\n\n**Жирный текст** и *курсивный текст*. Новый абзац.',
  manufacturer: {
    name: 'ООО "Чко"',
    contact: 'Иван Иванов (ivan.ivanov@mail.ru)',
  },
  organization: {
    name: 'ООО "Зеленоглазое такси"',
    address: 'ул. Ленина, 123, г. Москва, Россия',
  },
  status: 'Черновик',
};

export const useOrderStore = defineStore('order', {
  state: () => ({
    order: initialOrderData as Order,
  }),
  actions: {
    setOrder(newOrder: Order) {
      this.order = newOrder;
      localStorage.setItem('orderFormData', JSON.stringify(newOrder));
    },
    loadOrder() {
      const savedData = localStorage.getItem('orderFormData');
      if (savedData) {
        this.order = JSON.parse(savedData);
      }
    },
    confirmReset(editedOrder: Order) {
      const initialOrderString = JSON.stringify(this.order);
      const editedOrderString = JSON.stringify(editedOrder);

      if (initialOrderString !== editedOrderString) {
        const result = confirm('Внесенные изменения будут утеряны. Продолжить?');
        if (!result) {
          return false;
        }
      }

      return true;
    },
  },
});
