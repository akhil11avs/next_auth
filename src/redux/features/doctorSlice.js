import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getDoctor = createAsyncThunk('getDoctor', async (thunkAPI) => {
  try {
    const data = await axios.get('api/doctors');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addDoctor = createAsyncThunk('addDoctor', async (doctor, thunkAPI) => {
  try {
    const data = await axios.post('api/doctors', doctor);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteDoctor = createAsyncThunk('deleteDoctor', async (doctor, thunkAPI) => {
  try {
    const data = await axios.delete('api/doctors', { data: doctor });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editDoctor = createAsyncThunk('editDoctor', async (doctor, thunkAPI) => {
  try {
    const data = await axios.patch('api/doctors', doctor);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  doctorData: [],
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

const citySlice = createSlice({
  name: 'doctor',
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
      .addCase(addDoctor.pending, (state) => ({ ...state, loading: true }))
      .addCase(addDoctor.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        doctorData: [...state.doctorData, action.payload?.data?.data],
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
        messageType: 'doctorForm'
      }))
      .addCase(addDoctor.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(getDoctor.pending, (state) => ({ ...state, loading: true }))
      .addCase(getDoctor.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        doctorData: action.payload?.data?.data,
        isSuccess: action.payload?.data?.success,
        message: action.payload?.data?.message,
        isError: false,
        messageType: 'getDoctor'
      }))
      .addCase(getDoctor.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(deleteDoctor.pending, (state) => ({ ...state, loading: true }))
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const { data, success, message } = action.payload?.data || {}
        const modifiedCity = state?.doctorData?.filter((doctor) => doctor?._id !== data?._id);

        return ({
          ...state,
          loading: false,
          doctorData: [...modifiedCity],
          isSuccess: success,
          message: message,
          isError: false,
          messageType: 'deleteDoctor'
        })
      })
      .addCase(deleteDoctor.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
      .addCase(editDoctor.pending, (state) => ({ ...state, loading: true }))
      .addCase(editDoctor.fulfilled, (state, action) => {
        const { data, success, message } = action.payload?.data || {}
        const newState = { ...state };
        const modifiedDoctor = newState?.doctorData?.map((doctor) => doctor?._id === data?._id ? { ...data } : doctor);

        return ({
          ...state,
          loading: false,
          doctorData: [...modifiedDoctor],
          isSuccess: success,
          message: message,
          isError: false,
          messageType: 'doctorForm'
        })
      })
      .addCase(editDoctor.rejected, (state) => ({
        ...state,
        loading: false,
        isError: true,
      }))
  },
});

export const { clearSuccess } = citySlice.actions;
export default citySlice.reducer;