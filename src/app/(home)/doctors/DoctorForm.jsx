"use client";
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import InputField from '@/components/InputField'
import useResponsive from '@/customHook/useResponsive';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addCity, clearSuccess, editCity } from '@/redux/features/citySlice';
import { nameRegex } from '@/lib/form_validation';

const DoctorForm = ({ doctorFormModal, data, setDoctorFormModal, setActionData }) => {
  const lgUp = useResponsive('up', 'lg');
  const dispatch = useAppDispatch();

  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { isError, message, isSuccess, messageType } = useAppSelector(state => state?.city);

  useEffect(() => {
    if (doctorFormModal === "edit" && Object.keys(data).length > 0) {
      setDoctor(data);
    }
  }, [data, doctorFormModal]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, "name": value }));
    formValidate(name, value);
  }

  const onModalClose = () => {
    setDoctor({});
    setError({});
    setDisabled(true);
    setDoctorFormModal("");
    setActionData({})
  }

  const formValidate = (name, value) => {
    switch (name) {
      case 'name': {
        if (!value) {
          setError({ ...error, [name]: 'Please enter a city' });
        } else if (nameRegex.test(value)) {
          setError({ ...error, [name]: 'Please enter a valid city' });
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
    if (Object.keys(error).length === 0 && doctor?.name) {
      setDisabled(false);
    }
  }, [error, doctor]);

  useEffect(() => {
    if (isSuccess && !isError && messageType === 'cityForm') {
      toast.success(message);
      dispatch(clearSuccess());
      setDoctorFormModal("");
      setDoctor({});
      setDisabled(true);
    }
  }, [isError, isSuccess, message, messageType]);

  const handleOnSubmit = useCallback(() => {
    // if (cityFormModal === 'add') {
    //   dispatch(addCity({ ...city, name: city?.name?.trim() }));
    // } else if (cityFormModal === 'edit') {
    //   dispatch(editCity({ ...city, name: city?.name?.trim() }));
    // }
  }, []);

  return (
    <Dialog
      open={!!doctorFormModal}
      title={doctorFormModal === "add" ? "Add Doctor" : doctorFormModal === "edit" ? "Edit Doctor" : ""}
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
        value={doctor?.name ?? ""}
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

export default DoctorForm;
