/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { NAV } from '@/lib/constant';
import navConfig from '@/lib/config_navigation';
import useResponsive from '@/customHook/useResponsive';

import Logo from '@/components/Logo';
import Scrollbar from '@/components/Scrollbar';
import RouterLink from '@/components/RouterLink';

// ----------------------------------------------------------------------

const Navbar = ({ openNav, onCloseNav }) => {
  const pathname = usePathname();
  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={1}
        direction='row'
        sx={{
          alignItems: 'center',
        }}
      >
        <Logo sx={{ mt: 2, mb: 2 }} />
      </Stack>
      {renderMenu}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      {!lgUp && (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Navbar.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default Navbar;

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item?.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.primary',
        textTransform: 'capitalize',
        fontFamily: 'var(--font-Poppins-SemiBold)',
        fontSize: 14,
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme?.palette?.primary?.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme?.palette?.primary?.main, 0.16),
          },
          fontFamily: 'var(--font-Poppins-SemiBold)',
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item?.icon}
      </Box>

      <Box component="span">{item?.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
