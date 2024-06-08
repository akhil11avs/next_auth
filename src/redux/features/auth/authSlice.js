import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const authLogin = createAsyncThunk('authLogin', async (user, thunkAPI) => {
  try {
    const data = await axios.post('api/users/login', user);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authRegister = createAsyncThunk('authRegister', async (user, thunkAPI) => {
  try {
    const data = await axios.post('api/users/signup', user);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const tokenVerify = createAsyncThunk('tokenVerify', async (_, thunkAPI) => {
  try {
    const data = await axios.get('api/users/tokenVerify');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authLogout = createAsyncThunk('authLogout', async (_, thunkAPI) => {
  try {
    const data = await axios.post('/api/users/logout');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authResetPassword = createAsyncThunk('authResetPassword', async (credential, thunkAPI) => {
  try {
    const data = await axios.post('/api/users/forgot_password', credential);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  data: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLogout: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: () => initialState,
    clearSuccess: (state) => {
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => ({ ...state, loading: true }))
      .addCase(authLogin.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: action.payload?.data?.data,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
      }))
      .addCase(authLogin.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))

      .addCase(authRegister.pending, (state) => ({ ...state, loading: true }))
      .addCase(authRegister.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
      }))
      .addCase(authRegister.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(tokenVerify.pending, (state) => ({ ...state, loading: true }))
      .addCase(tokenVerify.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        data: action.payload?.data?.data || {},
        isError: false,
        location: action.payload?.data?.location
      }))
      .addCase(tokenVerify.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))

      .addCase(authLogout.pending, (state) => ({ ...state, loading: true }))
      .addCase(authLogout.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        isLogout: true,
        isError: false,
        message: action.payload?.data?.message,
      }))
      .addCase(authLogout.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))

      .addCase(authResetPassword.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(authResetPassword.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
      }));
  },
});

export const { clearState, clearSuccess } = authSlice.actions;
export default authSlice.reducer;