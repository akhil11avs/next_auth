"use client";
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import dayjs from "dayjs";
import { Grid } from '@mui/material';

import Select from '@/components/Select';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import { genderOption } from '@/lib/constant';
import InputField from '@/components/InputField'
import DatePickers from '@/components/DatePicker';
import useResponsive from '@/customHook/useResponsive';
import { clearSuccess } from '@/redux/features/doctorSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addDoctor, editDoctor } from '@/redux/features/doctorSlice';
import {
  nameRegex,
  diffObject,
  emailRegex,
  getFormError,
  experienceRegex,
  phoneNumberRegex,
} from '@/lib/form_validation';

const DoctorForm = ({
  doctorFormModal,
  data,
  setDoctorFormModal,
  setActionData,
}) => {
  const lgUp = useResponsive("up", "lg");
  const dispatch = useAppDispatch();

  const [doctor, setDoctor] = useState({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    specialization: "",
    experience: "",
  });
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { isError, message, isSuccess, messageType } = useAppSelector(state => state?.doctor);

  useEffect(() => {
    if (doctorFormModal === "edit" && Object.keys(data).length > 0) {
      setDoctor(data);
    }
  }, [data, doctorFormModal]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && (isNaN(value) || value.length === 11)) return

    setDoctor((prev) => ({ ...prev, [name]: value }));
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
          setError({ ...error, [name]: getFormError[name].empty });
        } else if (!nameRegex.test(value)) {
          setError({ ...error, [name]: getFormError[name].valid });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "mobile": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else if (!phoneNumberRegex.test(value)) {
          setError({ ...error, [name]: getFormError[name].valid });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "email": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else if (!emailRegex.test(value)) {
          setError({ ...error, [name]: getFormError[name].valid });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "gender": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "address": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else if (value.length < 10) {
          setError({ ...error, [name]: getFormError[name].valid });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "degree": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "specialization": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case "experience": {
        if (!value) {
          setError({ ...error, [name]: getFormError[name].empty });
        } else if (!experienceRegex.test(value)) {
          setError({ ...error, [name]: getFormError[name].valid });
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
    if (
      Object.keys(error).length === 0 &&
      Object.keys(doctor).every((key) => doctor[key])
    ) {
      const diffDoc = diffObject(data, doctor);
      if (doctorFormModal === 'edit' && !Object.keys(diffDoc).length) {
        setDisabled(true)
      } else {
        setDisabled(false);
      }
    }
  }, [error, doctor, doctorFormModal, data]);

  useEffect(() => {
    if (message && isSuccess && !isError && messageType === "doctorForm") {
      toast.success(message);
      dispatch(clearSuccess());
      setDoctorFormModal("");
      setDoctor({});
      setDisabled(true);
    }
  }, [isError, isSuccess, message, messageType]);

  const handleOnSubmit = useCallback(() => {
    if (doctorFormModal === 'add') {
      dispatch(addDoctor(doctor));
    } else if (doctorFormModal === 'edit') {
      const modifyDoctor = diffObject(data, doctor);
      dispatch(editDoctor({ _id: data?._id, ...modifyDoctor }));
    }
  }, [dispatch, doctor, doctorFormModal, data]);

  return (
    <Dialog
      open={!!doctorFormModal}
      title={doctorFormModal === "add" ? "Add Doctor" : doctorFormModal === "edit" ? "Edit Doctor" : ""}
      isCrossIcon={true}
      handleClose={onModalClose}
    >
      <Grid container columnSpacing={2.5}>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="name"
            label="Name"
            required
            error={!!error?.name}
            helperText={error?.name}
            value={doctor?.name ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="email"
            label="Email"
            required
            error={!!error?.email}
            helperText={error?.email}
            value={doctor?.email ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="mobile"
            label="Mobile Number"
            required
            error={!!error?.mobile}
            helperText={error?.mobile}
            value={doctor?.mobile ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Select
            name="gender"
            options={genderOption}
            label="Gender"
            required
            error={!!error?.gender}
            helperText={error?.gender}
            value={doctor?.gender || ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <DatePickers
            label="Date of Birth"
            sx={{ mb: 2 }}
            slotProps={{
              textField: {
                error: !!error?.dob,
                helperText: error?.dob,
                required: true,
                size: "small",
              },
            }}
            maxDate={dayjs(new Date())}
            value={doctor?.dob ?? ""}
            onChange={(e) => {
              setDoctor((prev) => ({ ...prev, dob: e }));
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="address"
            label="Address"
            required
            error={!!error?.address}
            helperText={error?.address}
            value={doctor?.address ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="specialization"
            label="Specialization"
            required
            error={!!error?.specialization}
            helperText={error?.specialization}
            value={doctor?.specialization ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            name="experience"
            label="Experience"
            required
            error={!!error?.experience}
            helperText={error?.experience}
            value={doctor?.experience ?? ""}
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleOnSubmit}
        disabled={disabled}
        fullWidth
        sx={{
          fontFamily: "var(--font-Poppins-SemiBold)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Submit
      </Button>
    </Dialog>
  )
}

export default DoctorForm;
