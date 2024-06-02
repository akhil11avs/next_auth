import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCity = createAsyncThunk('getCity', async (thunkAPI) => {
  try {
    const data = await axios.get('api/city');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addCity = createAsyncThunk('addCity', async (city, thunkAPI) => {
  try {
    const data = await axios.post('api/city', city);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteCity = createAsyncThunk('deleteCity', async (city, thunkAPI) => {
  try {
    const data = await axios.delete('api/city', { data: city });
    return data;
  } catch (error) {
    console.log('error: ', error?.response);
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editCity = createAsyncThunk('editCity', async (city, thunkAPI) => {
  try {
    const data = await axios.patch('api/city', city);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  cityData: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.isSuccess = false;
      state.message = "";
      state.messageType = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => ({ ...state, loading: true }))
      .addCase(getCity.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        cityData: action.payload?.data?.data,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
        messageType: 'getCity'
      }))
      .addCase(getCity.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(addCity.pending, (state) => ({ ...state, loading: true }))
      .addCase(addCity.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        cityData: [...state.cityData, action.payload?.data?.data],
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
        messageType: 'cityForm'
      }))
      .addCase(addCity.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(deleteCity.pending, (state) => ({ ...state, loading: true }))
      .addCase(deleteCity.fulfilled, (state, action) => {
        const { data, success, message } = action.payload?.data || {}
        const modifiedCity = state?.cityData?.filter((city) => city?._id !== data?._id);

        return ({
          ...state,
          loading: false,
          cityData: [...modifiedCity],
          isSuccess: success,
          message: message,
          isError: false,
          messageType: 'deleteCity'
        })
      })
      .addCase(deleteCity.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(editCity.pending, (state) => ({ ...state, loading: true }))
      .addCase(editCity.fulfilled, (state, action) => {
        const { data, success, message } = action.payload?.data || {}
        const newState = { ...state };
        const modifiedCity = newState?.cityData?.map((city) => city?._id === data?._id ? { ...city, name: data.name } : city);

        return ({
          ...state,
          loading: false,
          cityData: [...modifiedCity],
          isSuccess: success,
          message: message,
          isError: false,
          messageType: 'cityForm'
        })
      })
      .addCase(editCity.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
  },
});

export const { clearSuccess } = citySlice.actions;
export default citySlice.reducer;