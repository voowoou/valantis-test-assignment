import { createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'md5';

// Функция для получения id товаров
export const fetchProductsIds = createAsyncThunk(
  'products/fetch',
  async ({ offset, limit }, { rejectWithValue, dispatch }) => {
    // Получаем полную дату по iso, отделяя всё, что связано со временем, и убираем дефисы между числами
    const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const password = 'Valantis';
    const authString = md5(`${timeStamp}_${password}`);

    const body = {
      // Формируем тело запроса так, чтобы получить id товаров
      action: 'get_ids',
      params: { offset, limit },
    };

    // Используем паттерн для запросов, используем fetchAPI
    try {
      const response = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'X-Auth': authString,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const idsResponse = await response.json();
        return idsResponse;
      }
      throw new Error('Request failed');
    } catch (error) {
      console.log(error); // Логируем ошибку
      return rejectWithValue(error);
      setTimeout(() => dispatch(fetchProductsIds), 5000); // Повторяем запрос через 5 сек
    }
  },
);
