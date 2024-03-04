import { createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'md5';

// Получаем полную дату по iso, отделяя всё, что связано со временем, и убираем дефисы между числами
const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
const password = 'Valantis';
const authString = md5(`${password}_${timeStamp}`);

// thunk для получения id
const fetchIds = createAsyncThunk('products/fetchIds', async ({ offset, limit }) => {
  const body = {
    action: 'get_ids',
    params: { offset, limit },
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
      const idsResponse = await response.json();
      return idsResponse.result;
    }
    throw new Error('Request failed');
  } catch (error) {
    console.log(error); // Логируем ошибку
  }
});

export default fetchIds;
