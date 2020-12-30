import { css, Global } from '@emotion/core';
import React from 'react';

const GlobalStyles: React.FC<{}> = () => (
  <Global
    styles={css`
      :root {
        // Base Hue for main colors (body and branding)
        --base-hue: 222;

        // Color Gray
        --base-gray: var(--base-hue), 8%;
        --palette-gray-00: var(--base-gray), 100%;
        --palette-gray-10: var(--base-gray), 95%;
        --palette-gray-15: var(--base-gray), 90%;
        --palette-gray-20: var(--base-gray), 85%;
        --palette-gray-30: var(--base-gray), 75%;
        --palette-gray-40: var(--base-gray), 65%;
        --palette-gray-50: var(--base-gray), 55%;
        --palette-gray-60: var(--base-gray), 45%;
        --palette-gray-70: var(--base-gray), 35%;
        --palette-gray-80: var(--base-gray), 25%;
        --palette-gray-90: var(--base-gray), 15%;
        --palette-gray-95: var(--base-gray), 10%;
        --palette-gray-100: var(--base-gray), 5%;

        // Color Blue
        --base-blue: var(--base-hue), 89%;
        --palette-blue-10: var(--base-blue), 95%;
        --palette-blue-20: var(--base-blue), 85%;
        --palette-blue-30: var(--base-blue), 75%;
        --palette-blue-40: var(--base-blue), 65%;
        --palette-blue-50: var(--base-blue), 55%;
        --palette-blue-60: var(--base-blue), 45%;
        --palette-blue-70: var(--base-blue), 35%;
        --palette-blue-80: var(--base-blue), 25%;
        --palette-blue-90: var(--base-blue), 15%;

        // Color Red
        --base-red: 353, 100%;
        --palette-red-10: var(--base-red), 95%;
        --palette-red-20: var(--base-red), 85%;
        --palette-red-30: var(--base-red), 75%;
        --palette-red-40: var(--base-red), 65%;
        --palette-red-50: var(--base-red), 55%;

        // Border Radius
        --border-radius-1: 8px;
        --border-radius-2: 16px;
      }

      // Color variables to use in components for light and dark mode
      .maximeheckel-light {
        --maximeheckel-colors-brand: hsla(var(--palette-blue-50), 100%);
        --maximeheckel-colors-body: hsla(var(--palette-gray-00), 100%);
        --maximeheckel-colors-emphasis: hsla(var(--palette-blue-50), 8%);
        --maximeheckel-colors-foreground: hsla(var(--palette-gray-10), 45%);
        --maximeheckel-colors-danger: hsla(var(--palette-red-40), 100%);
        --maximeheckel-colors-danger-emphasis: hsla(var(--palette-red-40), 8%);
        --maximeheckel-colors-typeface-0: hsla(var(--palette-gray-90), 100%);
        --maximeheckel-colors-typeface-1: hsla(var(--palette-gray-70), 100%);
        --maximeheckel-colors-typeface-2: hsla(var(--palette-gray-60), 100%);
        --maximeheckel-shadow-1: 0 0px 12px -6px rgba(0, 24, 40, 0.3);
        --maximeheckel-shadow-2: 0 0px 15px -6px rgba(0, 24, 40, 0.4);
        --maximeheckel-shadow-3: 0 0px 20px -6px rgba(0, 24, 40, 0.5);
      }

      .maximeheckel-dark {
        --maximeheckel-colors-brand: hsla(var(--palette-blue-40), 100%);
        --maximeheckel-colors-body: hsla(var(--palette-gray-95), 100%);
        --maximeheckel-colors-emphasis: hsla(var(--palette-blue-40), 8%);
        --maximeheckel-colors-foreground: hsla(var(--palette-gray-100), 55%);
        --maximeheckel-colors-danger: hsla(var(--palette-red-30), 100%);
        --maximeheckel-colors-danger-emphasis: hsla(var(--palette-red-30), 8%);
        --maximeheckel-colors-typeface-0: hsla(var(--palette-gray-00), 100%);
        --maximeheckel-colors-typeface-1: hsla(var(--palette-gray-20), 100%);
        --maximeheckel-colors-typeface-2: hsla(var(--palette-gray-40), 100%);
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

      span[aria-hidden='true'] {
        display: none;
      }
      span[aria-hidden='false'] {
        display: block;
      }
    `}
  />
);

export { GlobalStyles };
