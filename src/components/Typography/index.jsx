import PropTypes from 'prop-types';

import TypographyMUI from '@mui/material/Typography';

const Typography = ({ children, ...props }) => (
  <TypographyMUI {...props}>
    {children}
  </TypographyMUI>
);

Typography.defaultProps = {
  children: <span />,
};

Typography.propTypes = {
  children: PropTypes.node,
};

export default Typography;