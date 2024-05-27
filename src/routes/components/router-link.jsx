import Link from 'next/link';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ href, ...other }, ref) => <Link ref={ref} href={href} {...other} />);

export default RouterLink;
