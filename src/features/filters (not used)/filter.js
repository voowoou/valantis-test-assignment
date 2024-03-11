import { createAsyncThunk } from '@reduxjs/toolkit';
import authString from '../authString/authStringGenerator';

const filter = createAsyncThunk('filters/filter', async (product, brand, price) => {
  const body = {
    action: 'filter',
    params: {
      product: product,
      brand: brand,
      price: price,
    },
  };

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

export default filter;
