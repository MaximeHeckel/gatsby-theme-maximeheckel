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

      body {
        background: ${props.theme.backgroundColor};
      }

      a {
        color: ${props.theme.colors.blue};
        text-decoration: underline;
      }

      .maximeheckel-light {
        --maximeheckel-colors-brand: #5184f9;
        --maximeheckel-colors-body-0: #f6f7f8;
        --maximeheckel-colors-body-1: #d9e6f7;
        --maximeheckel-colors-body-2: rgba(236, 236, 236, 0.8);
        --maximeheckel-colors-typeface-0: #2b2d3e;
      }

      .maximeheckel-dark {
        --maximeheckel-colors-brand: #5184f9;
        --maximeheckel-colors-body-0: #1b1e21;
        --maximeheckel-colors-body-1: #0e141b;
        --maximeheckel-colors-body-2: rgba(0, 0, 0, 0.4);
        --maximeheckel-colors-typeface-0: #ffffff;
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
