"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";

import { emailRegex, passwordRegex } from "../../../lib/constant";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [error, setError] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    formValidate(name, value);
  };


  const formValidate = (name, value) => {
    switch (name) {
      case 'username': {
        if (!value) {
          setError({ ...error, [name]: 'Please enter a username' });
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
    if (Object.keys(error).length === 0 && user?.email && user?.password && user?.username) {
      setButtonDisabled(false);
    }
  }, [error, user]);

  const handleOnSubmit = () => {
    setLoading(true);
    console.log('user: ', user);
    axios.post("api/users/signup", user)
      .then((res) => {
        setLoading(false);
        toast.success(res?.message)
        router.push("login");
      })
      .catch(error => {
        toast.error(error?.response?.data?.error)
      })
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
              name="username"
              error={!!error?.username}
              helperText={error?.username}
              value={user?.username}
              sx={{ width: '100%' }}
              onChange={handleOnChange}
            />
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
              name="password"
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
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </section >
  );
};

export default SignUpPage;
