import PropTypes from 'prop-types';

import ButtonMUI from '@mui/material/Button';

const Button = ({ children, ...restProps }) => (
  <ButtonMUI {...restProps}>
    {children}
  </ButtonMUI>
);

Button.defaultProps = {
  variant: 'contained',
  children: <span />,
  size: 'large'
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
