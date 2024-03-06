import { createAsyncThunk } from '@reduxjs/toolkit';
import authString from '../authString/authStringGenerator';

// thunk для получения товаров по id
const getItems = createAsyncThunk('items/getItems', async ids => {
  const body = {
    action: 'get_items',
    params: {
      ids: ids,
    },
  };

  // Используем паттерн для запросов c fetchAPI
  try {
    const response = await fetch('http://api.valantis.store:40000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': authString,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const itemsResponse = await response.json();
      return itemsResponse.result;
    }
    throw new Error('Items request failed');
  } catch (error) {
    console.log(error); // Логируем ошибку
  }
});

export default getItems;

// Создаем селекторы для компонента RenderProduct.js
export const selectIds = state => state.ids.itemsIds;
export const selectIdsIsLoading = state => state.ids.isLoading;
export const selectIdsHasError = state => state.ids.hasError;
