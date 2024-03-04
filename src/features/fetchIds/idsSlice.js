import { createSlice } from '@reduxjs/toolkit';
import fetchIds from './fetchIds';

const initialState = {
  allIds: [],
  isLoading: false,
  hasError: false,
};

// Конфигурационный объект для слайса
const options = {
  name: 'ids',
  initialState,
  reducers: {},

  // Для обработки состояний жизненного цикла промиса
  extraReducers: builder => {
    builder
      .addCase(fetchIds.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.allIds = action.payload;
      })
      .addCase(fetchIds.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const idsSlice = createSlice(options);

export const selectAllIds = state => state.ids.allIds;
