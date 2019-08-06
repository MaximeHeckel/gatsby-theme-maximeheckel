import { css, Global } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import React from 'react';
import { Theme } from '../../theme_light';

const GlobalStyles = withTheme((props: { theme: Theme }) => (
  <Global
    styles={css`
      a {
        color: ${props.theme.fontColor};
        text-decoration: underline;
      }
    `}
  />
));

export default GlobalStyles;
