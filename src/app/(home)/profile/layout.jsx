'use client'
import React from 'react';

import Loader from '@/components/Loader';
import { useAppSelector } from '@/redux/hook';
import { useResponsive } from '@/customHooks/useResponsive';

const RootLayout = ({ children }) => {
  const { loading } = useAppSelector(state => state?.user);
  const lgUp = useResponsive('up', 'lg');
  return (
    <>
      <div className={`flex items-center justify-center ${lgUp ? 'h-screen' : 'h-96'}`}>
        <div className="w-full bg-white rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:border-grey mr-3 ml-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
          <div className="p-1 space-y-2 md:space-y-4 sm:p-8">
            {children}
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  )
}

export default RootLayout