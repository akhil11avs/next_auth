"use client";
import React from "react";

import Loader from "@/components/Loader";
import { useAppSelector } from "@/redux/hook";

import "./style.scss";

const RootLayout = ({ children }) => {
  const { loading } = useAppSelector((state) => state.user);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:border-grey mr-3 ml-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
        <div className="p-3 space-y-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

export default RootLayout;
