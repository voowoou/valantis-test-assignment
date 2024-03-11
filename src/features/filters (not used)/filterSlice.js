import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  brand: null,
  price: null,
};

const options = {
  name: 'userFilters',
  initialState,
  reducers: {},
};
