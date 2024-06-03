"use client"
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { usePathname } from 'next/navigation';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import Box from '@/components/Box';
import Logo from '@/components/Logo';
import { NAV } from '@/lib/constant';
import Divider from '@/components/Divider';
import Scrollbar from '@/components/Scrollbar';
import navConfig from '@/lib/config_navigation';
import Typography from '@/components/Typography';
import RouterLink from '@/components/RouterLink';
import useResponsive from '@/customHook/useResponsive';

import AccountPopover from '../AccountPopover';

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav">
      {navConfig.map((item) => (
        <>
          <NavItem key={item.title} item={item} />
          <Divider orientation="horizontal" m={0} />
        </>
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
      <Logo sx={{ mt: 3, mb: 3 }} />
      <Divider orientation="horizontal" m={0} />
      {renderMenu}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          boxShadow: '-1px 1px 2px 2px rgb(195 195 195 / 90%)',
          height: '60px',
        }}
      >

        <AccountPopover />
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.15)",
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
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

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        textTransform: 'capitalize',
        '&:nth-of-type(even)': {
          backgroundColor: '#f7f9fb',
        },
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,.07) !important',
        },
        ...(active && {
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
        {item.icon}
      </Box>

      <Typography sx={{ fontSize: '14px', fontFamily: 'var(--font-Poppins-SemiBold)' }}>{item.title} </Typography>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
