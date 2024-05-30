import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Typography from '@/components/Typography';
import { authLogout, clearState } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

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

  return <Typography sx={{ color: 'red', fontFamily: 'var(--font-Poppins-SemiBold)', fontSize: '14px' }} onClick={handleOnLogout}>Logout</Typography>
}

export default Logout;