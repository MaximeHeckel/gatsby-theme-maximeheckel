import React from 'react';
import styled, { Theme } from '../../utils/styled';

export enum VARIANT {
  DANGER = 'danger',
  INFO = 'info',
}

interface Props {
  variant: VARIANT;
}

const Callout: React.FC<Props> = (props) => (
  <StyledCallout {...props}>{props.children}</StyledCallout>
);

const variantColors = (theme: Theme): Record<string, string> => ({
  [VARIANT.DANGER]: `
    background-color: #FFEFEE;
    border-color: ${theme.colors.red};
    color: #2B2D3E;
    `,
  [VARIANT.INFO]: `
    background-color: #E6EDF8;
    border-color: ${theme.colors.blue};
    color: #2B2D3E;
  `,
});

const StyledCallout = styled('div')<{ variant: VARIANT }>`
  @media (max-width: 600px) {
    position: relative;
    width: 100vw;
    left: calc(-50vw + 50%);
    border-radius: 0px;
  }

  border-radius: 4px;
  border-left: 3px solid;
  padding: 30px 30px;
  margin-bottom: 25px;

  strong {
    color: ${(p) => p.theme.colors.black}!important;
  }

  *:last-child {
    margin-bottom: 0px;
  }

  ${(p) => variantColors(p.theme)[p.variant]}
`;

export { Callout };
