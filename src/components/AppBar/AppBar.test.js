import React from 'react';
import { render } from '@testing-library/react';
import AppBar from '.';

describe('AppBar component', () => {
  it('renders children', () => {
    const { getByText } = render(<AppBar>Hello World</AppBar>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('applies className prop to container div', () => {
    const { container } = render(<AppBar className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
