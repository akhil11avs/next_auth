"use client"
import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Typography from '@/components/Typography';
import { emailRegex, passwordRegex } from '@/lib/form_validation';
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
      <Typography className="auth_header_title">
        Reset Password
      </Typography>
      <InputField
        name="email"
        label="Email"
        required
        error={!!error?.email}
        helperText={error?.email}
        value={credential?.email ?? ""}
        onChange={handleOnChange}
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        required
        error={!!error?.password}
        helperText={error?.password}
        value={credential?.password ?? ""}
        onChange={handleOnChange}
      />
      <Button
        onClick={handleOnReset}
        disabled={buttonDisabled}
        fullWidth
        className="auth_button"
      >
        Submit
      </Button>
      <Typography className="auth_footer" color="primary">
        <Link
          href="/login"
          className="hover:underline"
        >
          Back to Login
        </Link>
      </Typography>
    </>
  )
}

export default ForgotPassword;