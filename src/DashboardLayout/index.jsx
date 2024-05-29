'use client'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@/components/Box';

import Header from './Header';
import Navbar from './Navbar';
import MainLayout from './MainLayout';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Navbar openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <MainLayout>
          {children}
        </MainLayout>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
