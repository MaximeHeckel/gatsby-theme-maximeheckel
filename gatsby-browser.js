/**
 * Import fonts to expose them globaly
 */
import 'typeface-fira-code';

import React from 'react';
import RootWrapper from './src/context/ThemeProvider';

export const wrapRootElement = ({ element }, pluginOptions) => {
  return <RootWrapper>{element}</RootWrapper>;
};
