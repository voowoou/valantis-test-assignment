import { configureStore } from '@reduxjs/toolkit';
import { idsSlice } from '../features/getIds/idsSlice';
import { itemsSlice } from '../features/getItems/itemsSlice';

const store = configureStore({
  reducer: {
    ids: idsSlice.reducer,
    items: itemsSlice.reducer,
  },
});

export default store;
