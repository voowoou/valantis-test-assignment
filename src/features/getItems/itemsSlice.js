import { createSlice } from '@reduxjs/toolkit';
import getItems from './getItems';

const initialState = {
  itemsData: [],
  isLoading: false,
  hasError: false,
};

// Конфигурационный объект для слайса
const options = {
  name: 'items',
  initialState,

  // Для обработки состояний жизненного цикла промиса
  extraReducers: builder => {
    builder
      .addCase(getItems.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        // Используем преобразование в Map, чтобы удалить дубликаты
        const itemsMap = new Map();
        action.payload.forEach(item => {
          itemsMap.set(item.id, item);
        });
        state.itemsData = Array.from(itemsMap.values()); // Преобразуем Map в массив
      })
      .addCase(getItems.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const itemsSlice = createSlice(options);

// Создаем селекторы для компонента RenderProduct.js
export const selectItems = state => state.items.itemsData;
export const selectItemsIsLoading = state => state.items.isLoading;
export const selectItemsHasError = state => state.items.hasError;
