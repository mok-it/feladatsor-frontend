/* tslint:disable */
/* eslint-disable */
//This file is from a free MUI theme, don't bother changing it to TypeScript

import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

// @ts-ignore
import { palette } from './palette';
// @ts-ignore
import { shadows } from './shadows';
// @ts-ignore
import { overrides } from './overrides';
// @ts-ignore
import { typography } from './typography';
// @ts-ignore
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

// @ts-ignore
export function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
