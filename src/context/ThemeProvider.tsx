import 'prismjs-material-theme/css/oceanic.css';
import React from 'react';
import GlobalStyles from '../components/GlobalStyles';
import { ThemeProvider } from './ThemeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <GlobalStyles />
    {element}
  </ThemeProvider>
);
