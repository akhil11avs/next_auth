/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Link from 'next/link';

const RouterLink = forwardRef(({ href, ...other }, ref) => <Link ref={ref} href={href} {...other} />);

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
