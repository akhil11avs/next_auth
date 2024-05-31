"use client"
import Box from '@mui/material/Box';

import { HEADER, NAV } from '@/lib/constant';
import useResponsive from '@/customHook/useResponsive';

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...(lgUp ? {
          px: 2,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        } : {
          py: `${HEADER.H_MOBILE + SPACING}px`
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
