"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";

import Loader from "../../../components/Loader";
import { emailRegex, passwordRegex } from "../../../lib/constant";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { clearSuccess, authLogin } from "../../../redux/features/auth/authSlice";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({});
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [error, setError] = useState({});
  const dispatch = useAppDispatch();
  const { loading, isSuccess, message, isError } = useAppSelector(state => state?.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
    if (Object.keys(error).length === 0 && user?.email && user?.password) {
      setButtonDisabled(false);
    }
  }, [error, user]);

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(message);
      router.push("/profile");
      dispatch(clearSuccess());
    }
  }, [isSuccess])

  const handleOnLogin = useCallback(() => {
    dispatch(authLogin(user));
  }, [user]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              error={!!error?.email}
              helperText={error?.email}
              value={user?.email}
              sx={{ width: '100%' }}
              onChange={handleOnChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              name="password"
              error={!!error?.password}
              helperText={error?.password}
              value={user?.password}
              sx={{ width: '100%' }}
              onChange={handleOnChange}
            />
            <div className="flex items-center justify-end">
              <Link
                href="/forgot_password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ fontWeight: 'bold' }}
              onClick={handleOnLogin}
              disabled={buttonDisabled}
            >
              Login
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <Link
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </section>
  );
}

export default Login;