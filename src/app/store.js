import { configureStore } from '@reduxjs/toolkit';
import { idsSlice } from '../features/fetchIds/idsSlice';

const store = configureStore({
  reducer: {
    ids: idsSlice.reducer,
  },
});

export default store;
