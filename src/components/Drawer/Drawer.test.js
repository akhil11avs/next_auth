import React from 'react';
import { render } from '@testing-library/react';
import Drawer from '.';

describe('Drawer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Drawer open>
        <div>Child Component</div>
      </Drawer>,
    );

    const childComponent = getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(<Drawer open={false} style={{ width: '240px' }} />);
    const drawerElement = getByTestId('drawer');
    expect(drawerElement).toBeInTheDocument();
    expect(drawerElement).toHaveStyle({ width: '240px' });
  });
});
