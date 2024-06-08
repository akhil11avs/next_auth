import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice';
import citySlice from './features/citySlice';
import doctorSlice from './features/doctorSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authSlice,
      city: citySlice,
      doctor: doctorSlice,
    },
  })
}