"use client";
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import InputField from '@/components/InputField'
import useResponsive from '@/customHook/useResponsive';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addCity, clearSuccess } from '@/redux/features/citySlice';

const AddCity = ({ open, handleOpenOrClose }) => {
  const lgUp = useResponsive('up', 'lg');
  const dispatch = useAppDispatch();

  const [city, setCity] = useState({});
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { isError, message, isSuccess, messageType } = useAppSelector(state => state?.city);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCity({ "name": value });
    formValidate(name, value);
  }

  const formValidate = (name, value) => {
    switch (name) {
      case 'name': {
        if (!value) {
          setError({ ...error, [name]: 'Please enter a city' });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
    }
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && city?.name) {
      setDisabled(false);
    }
  }, [error, city]);

  useEffect(() => {
    if (isSuccess && !isError && messageType === 'addCity') {
      toast.success(message);
      dispatch(clearSuccess());
      handleOpenOrClose();
      setCity({});
      setDisabled(true);
    }
  }, [dispatch, handleOpenOrClose, isError, isSuccess, message, messageType]);

  const handleOnSubmit = useCallback(() => {
    dispatch(addCity(city));
  }, [city, dispatch]);

  return (
    <Dialog
      open={open}
      title="Add City"
      handleClose={handleOpenOrClose}
      sx={{
        width: lgUp ? "20%" : "75%",
      }}
    >
      <InputField
        name="name"
        label="City"
        required
        error={!!error?.name}
        helperText={error?.name}
        value={city?.name ?? ""}
        onChange={handleOnChange}
      />
      <Button
        onClick={handleOnSubmit}
        disabled={disabled}
        fullWidth
        sx={{
          fontFamily: "var(--font-Poppins-SemiBold)",
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Submit
      </Button>
    </Dialog>
  )
}

export default AddCity
