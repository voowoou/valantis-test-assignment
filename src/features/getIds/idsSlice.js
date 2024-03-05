import { createSlice } from '@reduxjs/toolkit';
import getIds from './getIds';

const initialState = {
  itemsIds: [],
  isLoading: false,
  hasError: false,
};

// Конфигурационный объект для слайса
const options = {
  name: 'ids',
  initialState,

  // Для обработки состояний жизненного цикла промиса
  extraReducers: builder => {
    builder
      .addCase(getIds.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.itemsIds = action.payload;
      })
      .addCase(getIds.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const idsSlice = createSlice(options); // Отправим в store.js

// Создаем селекторы для компонента RenderProduct.js
export const selectIds = state => state.ids.itemsIds;
export const selectIsLoading = state => state.ids.isLoading;
export const selectHasError = state => state.ids.hasError;
