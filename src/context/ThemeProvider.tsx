import React from 'react';
import GlobalStyles from '../components/GlobalStyles';
import { ThemeProvider } from './ThemeContext';

interface IRootWrapperProps {
  children: React.ReactNode;
}

const wrapRootElement: React.FC<IRootWrapperProps> = ({ children }) => (
  <ThemeProvider>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export { wrapRootElement };
