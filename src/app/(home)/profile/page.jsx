"use client";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect } from "react";

import { toast } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  clearSuccess,
  getUserDetails,
} from "@/redux/features/auth/authSlice";
import { Box, Typography } from "@mui/material";

const DetailComponent = ({ title, value }) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}>
      <Typography sx={{
        fontSize: "14px",
        fontFamily: 'var(--font)',
        fontWeight: 600,
        width: '30%'
      }}>{title}</Typography>
      <Typography sx={{ fontWeight: 'bold', flex: 1 }}>:</Typography>
      <Typography sx={{
        fontSize: "14px",
        fontFamily: 'var(--font)',
        fontWeight: 500,
        width: '50%'
      }}>{value}</Typography>
    </Box>
  )
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, data, isError, message } = useAppSelector((state) => state?.user);
  console.log('data: ', data);

  useEffect(() => {
    if (isEmpty(data)) {
      console.log('#########');
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    if (!isError && isSuccess) {
      toast.success(message);
      dispatch(clearSuccess());
    }
  }, [isError, isSuccess, message]);

  return (
    <>
      <Typography sx={{
        fontFamily: 'var(--font)',
        fontSize: '16px',
        fontWeight: 600,
        color: "rgb(18, 25, 38)"
      }}>Personal Details</Typography>
      <DetailComponent title="Name" value={data?.name} />
      <DetailComponent title="Mobile Number" value={data?.mobile} />
      <DetailComponent title="Email" value={data?.email} />
    </>
  );
}

export default Profile;

// <div className="flex flex-col items-center justify-center">
//         <h1>Profile</h1>
//         <hr />
//         <h2 className="p-1 rounded bg-green-500">
//           {data.length === 0 ? "Nothing" : <h1>{data?._id}</h1>}
//         </h2>
//         <hr />
//         <button
//           onClick={logout}
//           className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>