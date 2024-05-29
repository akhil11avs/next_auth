import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import './pageTitle.scss';

const PageTitle = (props) => {
  const { title, sx } = props;
  return (
    <Box sx={{
      textAlign: 'center',
      fontSize: '30px',
      fontFamily: 'var(--font-Poppins-SemiBold)',
      ...sx,
    }}>
      {title}
    </Box>
  )
}

PageTitle.defaultProps = {
  title: '',
  sx: {}
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default PageTitle;
