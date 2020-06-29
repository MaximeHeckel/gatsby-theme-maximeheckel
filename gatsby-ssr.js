import React from 'react';
import { wrapRootElement as RootWrapper } from './src/context/ThemeProvider';

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
);
