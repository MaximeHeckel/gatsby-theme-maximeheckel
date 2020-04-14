import { css, Global } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import React from 'react';

const GlobalStyles: React.FC<{}> = withTheme((props) => (
  <Global
    styles={css`
      ::selection {
        background: ${props.theme.fontColor};
        color: ${props.theme.backgroundColor};
      }

      a {
        color: ${props.theme.colors.blue};
        text-decoration: underline;
      }

      .lock-scroll {
        overflow: hidden !important;
      }

      .isCurrent {
        a {
          color: ${props.theme.colors.blue} !important;
        }
      }
    `}
  />
));

export default GlobalStyles;
