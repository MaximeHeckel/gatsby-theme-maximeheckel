import React from 'react';
import RootWrapper from './src/context/ThemeProvider';

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
);
