import React, { } from 'react';
import PropTypes from 'prop-types';
import DrawerMUI from '@mui/material/Drawer';

const Drawer = ({ children, ...props }) => (
  <DrawerMUI
    {...props}
    data-testid="drawer"
  >
    {children}
  </DrawerMUI>
);

Drawer.defaultProps = {
  anchor: 'left',
  variant: 'persistent',
  children: <span />,
};

Drawer.propTypes = {
  anchor: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export default Drawer;

