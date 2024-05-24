"use client";
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect } from "react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { authLogout, clearState, getUserDetails } from "@/redux/features/auth/authSlice";

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { loading, isSuccess, data, isError, isLogout, message } = useAppSelector(state => state?.user);

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    if (!isError && isSuccess) {
      if (isLogout) {
        router.push('/login');
        dispatch(clearState())
      }
      toast.success(message);
    }
  }, [isError, isSuccess, message]);

  const logout = useCallback(() => {
    dispatch(authLogout());
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <h2 className="p-1 rounded bg-green-500">{data.length === 0 ? "Nothing" : <h1>{data?._id}</h1>}</h2>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>
      </div>
      {loading && <Loader />}
    </section>
  )
}