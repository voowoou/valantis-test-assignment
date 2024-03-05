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
  extraReducerds: builder => {
    builder
      .addCase(getItems.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.itemsData = action.payload;
      })
      .addCase(getItems.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const itemsSlice = createSlice(options);
