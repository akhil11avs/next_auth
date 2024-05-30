"use client";
import React, { useEffect } from "react";

import isEmpty from "lodash/isEmpty";
import { toast } from "react-hot-toast";

import { clearSuccess, getUserDetails } from "@/redux/features/auth/authSlice";
import Loader from "@/components/Loader";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import './style.scss'

const DetailComponent = ({ title, value }) => {
  return (
    <Box
      className="details_container"
    >
      <Typography
        className="details_left"
      >
        {title}
      </Typography>
      <Typography sx={{ fontWeight: "bold", flex: 1 }}>:</Typography>
      <Typography
        className="details_right"
      >
        {value}
      </Typography>
    </Box>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();

  const { loading, data, isSuccess, isError, message } = useAppSelector(
    (state) => state?.user
  );

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    if (!isError && isSuccess && message) {
      toast.success(message);
      dispatch(clearSuccess);
    }
  }, [isError, isSuccess, message]);

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:border-grey mr-3 ml-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
            <div className="p-2 space-y-2 md:space-y-4 sm:p-4">
              <Typography
                className="profile_title"
                color="primary"
              >
                Personal Details
              </Typography>
              <DetailComponent title="Name" value={data?.name} />
              <DetailComponent title="Mobile Number" value={data?.mobile} />
              <DetailComponent title="Email" value={data?.email} />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
