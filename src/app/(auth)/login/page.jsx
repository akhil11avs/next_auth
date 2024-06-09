"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import InputField from "@/components/InputField";
import { emailRegex, passwordRegex } from "@/lib/form_validation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearSuccess, authLogin } from "@/redux/features/auth/authSlice";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({});
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [error, setError] = useState({});
  const dispatch = useAppDispatch();
  const { isSuccess, message, isError } = useAppSelector(state => state?.user);

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
      router.push("/");
      dispatch(clearSuccess());
    }
  }, [isSuccess])

  const handleOnSubmit = useCallback(() => {
    dispatch(authLogin(user));
  }, [user]);

  return (
    <>
      <Typography className="auth_header_title">
        Login
      </Typography>
      <InputField
        name="email"
        label="Email"
        required
        error={!!error?.email}
        helperText={error?.email}
        value={user?.email ?? ""}
        onChange={handleOnChange}
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        required
        error={!!error?.password}
        helperText={error?.password}
        value={user?.password ?? ""}
        onChange={handleOnChange}
      />
      <Typography className="auth_forgotPassword" color="primary">
        <Link
          href="/forgot_password"
          className="hover:underline"
        >
          Forgot password?
        </Link>
      </Typography>
      <Button
        onClick={handleOnSubmit}
        disabled={buttonDisabled}
        fullWidth
        className="auth_button"
      >
        Submit
      </Button>
      <Typography className="auth_footer" color="primary">
        <span style={{ color: 'black' }}>Don’t have an account yet?{" "}</span>
        <Link
          href="/signup"
          className="hover:underline"
        >
          Sign up
        </Link>
      </Typography>
    </>
  );
}

export default Login;