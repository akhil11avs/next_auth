import React from 'react';
import PropTypes from 'prop-types';
import StackMUI from '@mui/material/Stack';

const Stack = ({ children, ...restProps }) => (
  <StackMUI {...restProps}>
    {children}
  </StackMUI>
);

Stack.defaultProps = {
  children: <span />,
};

Stack.propTypes = {
  children: PropTypes.node,
};

export default Stack;
