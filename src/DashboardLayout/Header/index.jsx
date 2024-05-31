'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Box from '@/components/Box';
import { NAV } from '@/lib/constant';
import Logo from '@/components/Logo';
import { bgBlur } from '@/theme/css';
import Iconify from '@/components/Iconify';
import useResponsive from '@/customHook/useResponsive';

// ----------------------------------------------------------------------

const Header = ({ onOpenNav }) => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
        {!lgUp && <Box
          spacing={1}
          direction="row"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Logo />
        </Box>}
      </Toolbar>
    </AppBar>
  );
}

export default Header;