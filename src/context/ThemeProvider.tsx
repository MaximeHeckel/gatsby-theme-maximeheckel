import React from 'react';
import GlobalStyles from '../components/GlobalStyles';
import { ThemeProvider } from './ThemeContext';

interface IRootWrapperProps {
  children: React.ReactNode;
}

const RootWrapper: React.FC<IRootWrapperProps> = ({ children }) => (
  <ThemeProvider>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default RootWrapper;
