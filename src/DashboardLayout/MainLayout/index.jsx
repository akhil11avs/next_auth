import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { NAV } from '@/lib/constant';
import useResponsive from '@/customHook/useResponsive';

const MainLayout = ({ children, sx, ...other }) => {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        pt: '10px',
        ...(lgUp && {
          pt: `10px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default MainLayout;