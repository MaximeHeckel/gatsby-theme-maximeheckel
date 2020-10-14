import { css, Global } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import React from 'react';

const GlobalStyles: React.FC<{}> = withTheme((props) => (
  <Global
    styles={css`
      ::selection {
        background-color: rgba(81, 132, 249, 0.15);
        color: ${props.theme.colors.blue};
      }

      body {
        background: ${props.theme.backgroundColor};
      }

      a {
        color: ${props.theme.colors.blue};
        text-decoration: underline;
      }

      .hidden {
        display: none;
      }

      .maximeheckel-light {
        --maximeheckel-colors-brand: #336ef5;
        --maximeheckel-colors-body-0: #ffffff;
        --maximeheckel-colors-body-1: rgba(217, 230, 247, 0.55);
        --maximeheckel-colors-body-2: rgba(236, 236, 236, 0.8);
        --maximeheckel-colors-typeface-0: #2b2d3e;
        --maximeheckel-colors-typeface-1: #4a4a4c;
        --maximeheckel-colors-typeface-2: #767679;
        --plyr-color-main: #336ef5;
      }

      .maximeheckel-dark {
        --maximeheckel-colors-brand: #5184f9;
        --maximeheckel-colors-body-0: #141516;
        --maximeheckel-colors-body-1: rgba(9, 14, 21, 0.6);
        --maximeheckel-colors-body-2: rgba(0, 0, 0, 0.7);
        --maximeheckel-colors-typeface-0: #fefefe;
        --maximeheckel-colors-typeface-1: #c4c5c9;
        --maximeheckel-colors-typeface-2: #8a8a90;
        --plyr-color-main: #5184f9;
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

export { GlobalStyles };
