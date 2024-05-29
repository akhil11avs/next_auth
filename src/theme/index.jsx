'use client'
import { useMemo } from 'react';
import PropTypes from 'prop-types';

import createTheme from '@mui/material/styles/createTheme';
import MUIThemeProvider from '@mui/material/styles/ThemeProvider';

import palette from './palette';
import Overrides from './overrides';
import typography from './typography';

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette,
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = Overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
