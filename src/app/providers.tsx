/**
 * @fileoverview Providers component for the application.
 * This component wraps the entire application with necessary providers such as Material-UI theme.
 * It must be rendered as a client component to enable provider context.
 */

'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';

/**
 * Providers component that wraps the application with Material-UI theming.
 * @function Providers
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with providers
 * @returns {React.ReactNode} The wrapped children with providers applied
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
