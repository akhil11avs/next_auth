'use client';
import { useState } from 'react';

import Box from '@mui/material/Box';

import Header from './header';
import Main from './main';
import Nav from './nav';
import { useResponsive } from '@/customHooks/useResponsive';

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
