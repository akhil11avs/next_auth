'use client';
import { useState } from 'react';

import Box from '@mui/material/Box';

import useResponsive from '@/customHook/useResponsive';

import Header from './Header';
import Main from './MainLayout';
import Nav from './Navbar';

const DashboardLayout = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const lgUp = useResponsive('up', 'lg');

  return (
    <>
      {
        !lgUp && <Header onOpenNav={() => setOpenNav(true)} />
      }
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

export default DashboardLayout;
