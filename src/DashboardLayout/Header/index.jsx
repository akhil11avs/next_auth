import PropTypes from 'prop-types';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import Box from '@/components/Box';
import Logo from '@/components/Logo';
import Iconify from '@/components/Iconify';
import { HEADER } from '@/lib/constant';
import navConfig from '@/lib/config_navigation';
import useResponsive from '@/customHook/useResponsive';

import "./header.scss";

const Header = ({ onOpenNav }) => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  return (
    <>
      <AppBar
        sx={{
          position: "sticky",
          display: 'flex',
          boxShadow: '0px 0px 0px 1px #ddd',
          height: HEADER.H_MOBILE,
          backgroundColor: '#fff',
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            height: 1,
          }}
        >
          {!lgUp && (
            <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
          )}
          <Box
            sx={{
              display: 'flex',
              flex: 1,
            }}
          >
            <Box
              spacing={1}
              direction="row"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: !lgUp ? '100%' : '30%',
              }}
            >
              <Logo />
            </Box>
            {lgUp && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {navConfig?.map(route => (
                  <Link href={route?.path} key={route?.title} className='route_name'>
                    {route?.title}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ >
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default Header;
