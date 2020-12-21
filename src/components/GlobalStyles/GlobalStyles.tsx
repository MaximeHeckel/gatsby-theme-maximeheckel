import { css, Global } from '@emotion/core';
import React from 'react';

const GlobalStyles: React.FC<{}> = () => (
  <Global
    styles={css`
      :root {
        --palette-white-10: #ffffff;
        --palette-white-20: #fefefe;
        //--palette-white-30: 238, 242, 246;
        --palette-white-30: 241, 243, 247;

        --palette-gray-10: 221, 221, 221;
        --palette-gray-20: #c3c3c3;
        --palette-gray-30: #8a8a90;
        --palette-gray-40: #767679;
        --palette-gray-50: #4a4a4c;
        --palette-gray-60: 38, 41, 48;
        --palette-gray-70: #141516;
        --palette-gray-80: #000000;

        --palette-blue-10: #ebf1ff;
        --palette-blue-20: #aec7ff;
        --palette-blue-30: 81, 132, 249;
        --palette-blue-40: #316cf3;

        --palette-red-10: 255, 81, 90;

        --border-radius-1: 8px;
        --border-radius-2: 16px;
      }

      .maximeheckel-light {
        --maximeheckel-colors-brand: var(--palette-blue-40);
        --maximeheckel-colors-body: var(--palette-white-10);
        --maximeheckel-colors-emphasis: rgba(var(--palette-blue-30), 0.08);
        --maximeheckel-colors-foreground: rgba(var(--palette-white-30), 0.65);
        --maximeheckel-colors-danger: rgba(var(--palette-red-10), 1);
        --maximeheckel-colors-danger-emphasis: rgba(
          var(--palette-red-10),
          0.08
        );
        --maximeheckel-colors-typeface-0: rgba(var(--palette-gray-60), 1);
        --maximeheckel-colors-typeface-1: var(--palette-gray-50);
        --maximeheckel-colors-typeface-2: var(--palette-gray-30);
        --maximeheckel-shadow-1: 0 0px 12px -6px rgba(0, 24, 40, 0.3);
        --maximeheckel-shadow-2: 0 0px 15px -6px rgba(0, 24, 40, 0.4);
        --maximeheckel-shadow-3: 0 0px 20px -6px rgba(0, 24, 40, 0.5);
      }

      .maximeheckel-dark {
        --maximeheckel-colors-brand: rgba(var(--palette-blue-30), 1);
        --maximeheckel-colors-body: var(--palette-gray-70);
        --maximeheckel-colors-emphasis: rgba(var(--palette-blue-30), 0.08);
        --maximeheckel-colors-foreground: rgba(var(--palette-gray-60), 0.5);
        --maximeheckel-colors-danger: rgba(var(--palette-red-10), 1);
        --maximeheckel-colors-danger-emphasis: rgba(
          var(--palette-red-10),
          0.08
        );
        --maximeheckel-colors-typeface-0: var(--palette-white-20);
        --maximeheckel-colors-typeface-1: var(--palette-gray-20);
        --maximeheckel-colors-typeface-2: var(--palette-gray-30);
        --maximeheckel-shadow-1: 0 0px 20px -6px rgba(0, 0, 0, 0.7);
        --maximeheckel-shadow-2: 0 0px 25px -6px rgba(0, 0, 0, 0.8);
        --maximeheckel-shadow-3: 0 0px 30px -6px rgba(0, 0, 0, 0.9);
      }

      ::selection {
        background-color: var(--maximeheckel-colors-emphasis);
        color: var(--maximeheckel-colors-brand);
      }

      body {
        background: var(--maximeheckel-colors-body);
        text-rendering: optimizeLegibility;
        --plyr-color-main: var(--maximeheckel-colors-brand);
      }

      a {
        color: var(--maximeheckel-colors-brand);
        text-decoration: underline;
      }

      .hidden {
        display: none;
      }

      .lock-scroll {
        overflow: hidden !important;
      }

      .isCurrent {
        a {
          color: var(--maximeheckel-colors-brand) !important;
        }
      }
    `}
  />
);

export { GlobalStyles };
