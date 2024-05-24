import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';

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

export const getUserDetails = createAsyncThunk('getUserDetails', async (_, thunkAPI) => {
  try {
    const data = await axios.get('api/users/me');
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
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data?.data;
        state.isSuccess = action?.payload?.data?.success;
        state.message = action?.payload?.data?.message;
        state.isError = false;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(authRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action?.payload?.data?.success;
        state.message = action?.payload?.data?.message;
        state.isError = false;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(getUserDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action?.payload?.data?.success;
        state.message = action?.payload?.data?.message;
        state.data = action?.payload?.data?.data || {};
        state.isError = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(authLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogout = true;
        state.isError = false;
        state.isSuccess = action?.payload?.data?.success;
        state.message = action?.payload?.data?.message;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
      })
  },
});

export const { clearState, clearSuccess } = authSlice.actions;
export default authSlice.reducer;