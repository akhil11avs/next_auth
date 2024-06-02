import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import RouterLink from '../RouterLink';

const Logo = ({ sx }) => (
  <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
    <Box
      component="img"
      sx={{
        width: '100%',
        height: 35,
        ...sx,
      }}
      src="assets/icons/logo.svg"
    />
  </Link>
);

Logo.propTypes = {
  sx: PropTypes.object,
};

export default Logo;