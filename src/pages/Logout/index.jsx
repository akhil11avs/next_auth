import { authLogout, clearState } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast';

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isLogout, message } =
    useAppSelector((state) => state?.user);

  useEffect(() => {
    if (!isError && isSuccess && isLogout) {
      toast.success(message);
      router.push("/login");
      dispatch(clearState());
    }
  }, [isError, isSuccess, message]);

  const handleOnLogout = useCallback(() => {
    dispatch(authLogout());
  }, []);

  return (
    <Box className="text-center py-3">
      <Typography sx={{ color: 'red', cursor: 'pointer' }} onClick={handleOnLogout}>Logout</Typography>
    </Box>
  )
}

export default Logout;