"use client"
import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

import { emailRegex, passwordRegex } from '@/lib/constant';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { authResetPassword, clearSuccess } from '@/redux/features/auth/authSlice';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState({});
  const { isSuccess, message, isError } = useAppSelector(state => state?.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
    formValidate(name, value);
  };

  const formValidate = (name, value) => {
    switch (name) {
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
    if (Object.keys(error).length === 0 && credential?.email && credential?.password) {
      setButtonDisabled(false);
    }
  }, [error, credential]);

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(message);
      router.push("/login");
      dispatch(clearSuccess());
    }
  }, [isSuccess, isError, message]);

  const handleOnReset = useCallback(() => {
    dispatch(authResetPassword(credential));
  }, [credential]);

  return (
    <>
      <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black" style={{
        fontFamily: 'var(--font)', fontWeight: 600
      }}>
        Reset Password
      </h1>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        size="small"
        required
        name="email"
        error={!!error?.email}
        helperText={error?.email}
        value={credential?.email}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <TextField
        id="outlined-basic"
        label="New Password"
        variant="outlined"
        size="small"
        required
        type="password"
        name="password"
        error={!!error?.password}
        helperText={error?.password}
        value={credential?.password}
        sx={{ width: '100%' }}
        onChange={handleOnChange}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ fontWeight: '600', fontFamily: 'var(--font)', fontSize: "16px" }}
        onClick={handleOnReset}
        disabled={buttonDisabled}
      >
        Submit
      </Button>
      <div className="flex text-gray-500 dark:text-gray-400">
        <Link
          href="/login"
          className="text-primary-600 dark:text-primary-500"
          style={{
            fontFamily: 'var(--font)', fontWeight: 600, fontSize: "16px"
          }}
        >
          Back to Login
        </Link>
      </div>
    </>
  )
}

export default ForgotPassword;