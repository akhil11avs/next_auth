"use client";
import React, { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";

import { emailRegex, nameRegex, passwordRegex, phoneNumberRegex } from "@/lib/constant";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { authRegister, clearSuccess } from "@/redux/features/auth/authSlice";

const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { isSuccess, message, isError } = useAppSelector(state => state?.user);

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(message);
      router.push("/login");
      dispatch(clearSuccess());
    }
  }, [isSuccess, isError]);

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'mobile' && value.length === 11) {
      return
    }
    setUser({ ...user, [name]: value });
    formValidate(name, value);
  }, [user]);

  const formValidate = (name, value) => {
    switch (name) {
      case 'name': {
        if (!value) {
          setError({ ...error, [name]: 'Please enter a name' });
        } else if (!nameRegex.test(value)) {
          setError({ ...error, [name]: 'Please enter a valid name' });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case 'mobile': {
        if (!value) {
          setError({ ...error, [name]: 'Please enter a mobile number' });
        } else if (!phoneNumberRegex.test(value)) {
          setError({ ...error, [name]: 'Please enter a valid mobile number' });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case 'email': {
        const isEmailValid = emailRegex.test(value);
        if (!value) {
          setError({ ...error, [name]: 'Please enter a email address' });
        } else if (!isEmailValid) {
          setError({ ...error, [name]: 'Please enter a valid email address' });
        } else {
          const modifiedError = { ...error };
          delete modifiedError[name];
          setError(modifiedError);
        }
        break;
      }
      case 'password': {
        const isPasswordValid = passwordRegex.test(value);
        if (!value) {
          setError({ ...error, [name]: 'Please enter a password' });
        } else if (!isPasswordValid) {
          setError({ ...error, [name]: 'Please provide a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 special letter, and 1 number with no spaces.' });
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
    if (Object.keys(error).length === 0 && user?.email && user?.password && user?.name && user?.mobile) {
      setButtonDisabled(false);
    }
  }, [error, user]);

  const handleOnSubmit = useCallback(() => {
    dispatch(authRegister(user))
  }, [user]);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
        Create your account
      </h1>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        size="small"
        name="name"
        required
        error={!!error?.name}
        helperText={error?.name}
        value={user?.name}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        size="small"
        name="mobile"
        required
        error={!!error?.mobile}
        helperText={error?.mobile}
        value={user?.mobile}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        size="small"
        name="email"
        required
        error={!!error?.email}
        helperText={error?.email}
        value={user?.email}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
        size="small"
        name="password"
        required
        error={!!error?.password}
        helperText={error?.password}
        value={user?.password}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <Button
        disabled={buttonDisabled}
        onClick={handleOnSubmit}
        variant="contained"
        fullWidth
        sx={{ fontWeight: 'bold' }}
      >
        Sign up
      </Button>
      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
