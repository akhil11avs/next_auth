import React from 'react';
import { render, screen } from '@testing-library/react';
import Divider from '.';

describe('Divider', () => {
  test('should renders Divider component correctly', () => {
    render(<Divider />);
    expect(screen.getByTestId('divider-test')).toBeInTheDocument();
  });

  test('should renders Divider component with className correctly', () => {
    render(<Divider />);
    expect(screen.getByTestId('divider-test')).toHaveClass('MuiDivider-root');
  });
});
