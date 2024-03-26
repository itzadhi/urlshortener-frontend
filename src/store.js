import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import urlReducer from './slices/urlSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
