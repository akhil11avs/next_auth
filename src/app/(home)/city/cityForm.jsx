"use client";
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import InputField from '@/components/InputField'
import useResponsive from '@/customHook/useResponsive';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addCity, clearSuccess, editCity } from '@/redux/features/citySlice';

const CityForm = ({ cityFormModal, data, setCityFormModal, setActionData }) => {
  const lgUp = useResponsive('up', 'lg');
  const dispatch = useAppDispatch();

  const [city, setCity] = useState({});
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { isError, message, isSuccess, messageType } = useAppSelector(state => state?.city);

  useEffect(() => {
    if (cityFormModal === "edit" && Object.keys(data).length > 0) {
      setCity(data);
    }
  }, [data, cityFormModal]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCity((prev) => ({ ...prev, "name": value }));
    formValidate(name, value);
  }

  const onModalClose = () => {
    setCity({});
    setError({});
    setDisabled(true);
    setCityFormModal("");
    setActionData({})
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
    if (isSuccess && !isError && messageType === 'cityForm') {
      toast.success(message);
      dispatch(clearSuccess());
      setCityFormModal("");
      setCity({});
      setDisabled(true);
    }
  }, [isError, isSuccess, message, messageType]);

  const handleOnSubmit = useCallback(() => {
    if (cityFormModal === 'add') {
      dispatch(addCity(city));
    } else if (cityFormModal === 'edit') {
      dispatch(editCity(city));
    }
  }, [city, cityFormModal]);

  return (
    <Dialog
      open={!!cityFormModal}
      title={cityFormModal === "add" ? "Add City" : cityFormModal === "edit" ? "Edit City" : ""}
      isCrossIcon={true}
      handleClose={onModalClose}
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

export default CityForm;
