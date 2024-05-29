import React from 'react';
import PropTypes from 'prop-types';
import AppBarMUI from '@mui/material/AppBar';

const AppBar = ({
  children, className, ...props
}) => (
  <div className={className}>
    <AppBarMUI {...props}>{children}</AppBarMUI>
  </div>
);

AppBar.defaultProps = {
  className: '',
  children: <span />,
};

AppBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(AppBar);
