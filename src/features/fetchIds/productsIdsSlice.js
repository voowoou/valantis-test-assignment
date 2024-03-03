import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsIds } from './fetchProducts';

const initialState = {
  ids: null,
  loading: false,
  error: null,
};

// Конфигурационный объект для слайса
const options = {
  name: 'productsIds',
  initialState,

  // Стандартные редюсеры
  reducers: {},

  // Экстра редюсеры для обработки стадий асинхронного действия
  extraReducers: builder => {
    builder
      .addCase(fetchProductsIds.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsIds.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(fetchProductsIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
};

const productsIdsSlice = createSlice(options);
export default productsIdsSlice.reducer;
