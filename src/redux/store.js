import { configureStore } from '@reduxjs/toolkit'
import authLogin from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authLogin
    },
  })
}