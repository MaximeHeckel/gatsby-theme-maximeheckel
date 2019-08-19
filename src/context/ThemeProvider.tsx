import React from 'react';
import GlobalStyles from '../components/GlobalStyles';
import { ThemeProvider } from './ThemeContext';

const RootWrapper = ({ children }) => (
  <ThemeProvider>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default RootWrapper;
