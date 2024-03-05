import { createAsyncThunk } from '@reduxjs/toolkit';
import authString from '../authString/authStringGenerator';

// thunk для получения id
const getIds = createAsyncThunk('ids/getIds', async ({ offset, limit }) => {
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
    throw new Error('Ids request failed');
  } catch (error) {
    console.log(error); // Логируем ошибку
  }
});

export default getIds;
