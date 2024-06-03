"use client";
import React, { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import InputField from "@/components/InputField";
import { emailRegex, nameRegex, passwordRegex, phoneNumberRegex } from "@/lib/form_validation";
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
  }, [isSuccess, isError, message]);

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
      <Typography className="auth_header_title">
        Sign Up
      </Typography>
      <InputField
        name="name"
        label="Name"
        required
        error={!!error?.name}
        helperText={error?.name}
        value={user?.name ?? ""}
        onChange={handleOnChange}
      />
      <InputField
        name="mobile"
        label="Mobile"
        required
        error={!!error?.mobile}
        helperText={error?.mobile}
        value={user?.mobile ?? ""}
        onChange={handleOnChange}
      />
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
      <Button
        onClick={handleOnSubmit}
        disabled={buttonDisabled}
        fullWidth
        className="auth_button"
      >
        Submit
      </Button>
      <Typography className="auth_footer" color="primary">
        <span style={{ color: 'black' }}>Already have an account?{" "}</span>
        <Link
          href="/login"
          className="hover:underline"
        >
          Login
        </Link>
      </Typography>
    </>
  );
};

export default SignUpPage;
