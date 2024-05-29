import { authLogout, clearState } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast';

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isError, isLogout, message } = useAppSelector((state) => state?.user);

  useEffect(() => {
    if (isLogout && !isError) {
      toast.success(message);
      router.push("/login");
      dispatch(clearState());
    }
  }, [isLogout, isError, message]);

  const handleOnLogout = useCallback(() => dispatch(authLogout()), [dispatch]);

  return <Typography sx={{ color: 'red', cursor: 'pointer', textAlign: 'center' }} pt={1} pb={1} onClick={handleOnLogout}>Logout</Typography>
}

export default Logout;