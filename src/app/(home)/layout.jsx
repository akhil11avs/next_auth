'use client';
import { useEffect } from "react";

import { useAppDispatch } from "@/redux/hook";
import DashboardLayout from "@/DashboardLayout";
import { getUserDetails } from "@/redux/features/auth/authSlice";

export default function RootLayout({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
