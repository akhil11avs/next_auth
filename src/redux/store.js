import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice';
import citySlice from './features/citySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authSlice,
      city: citySlice
    },
  })
}