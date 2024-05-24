"use client"
import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

import Loader from '@/components/Loader';
import { emailRegex, passwordRegex } from '@/lib/constant';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { authResetPassword, clearSuccess } from '@/redux/features/auth/authSlice';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState({});
  const { loading, isSuccess, message, isError } = useAppSelector(state => state?.user);

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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
          <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
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
              sx={{ fontWeight: 'bold' }}
              onClick={handleOnReset}
              disabled={buttonDisabled}
            >
              Submit
            </Button>
            <div className="flex text-center text-sm font-light text-gray-500 dark:text-gray-400">
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  )
}

export default ForgotPassword;