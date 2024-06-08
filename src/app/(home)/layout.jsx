"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearState, tokenVerify } from "@/redux/features/auth/authSlice";

export default function RootLayout({ children }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { message, location } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (message === "Token expired" && location) {
      toast.error(message);
      router.push(location);
      dispatch(clearState());
    }
  }, [message, location]);

  useEffect(() => {
    dispatch(tokenVerify());
  }, []);

  return <DashboardLayout>{children}</DashboardLayout>;
}
