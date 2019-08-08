import styled from '@emotion/styled';
import React from 'react';

interface ILogoProp {
  alt: string;
  inverted?: boolean;
  size: number;
}

const LogoWrapper = styled('div')`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  svg {
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    transition: ${props => props.theme.transitionTime}s;
    rect {
      fill: ${props =>
        props.inverted ? props.theme.fontColor : props.theme.backgroundColor};
      transition: ${props => props.theme.transitionTime}s;
    }

    circle {
      fill: ${props =>
        props.inverted ? props.theme.backgroundColor : props.theme.fontColor};
      transition: ${props => props.theme.transitionTime}s;
    }
  }
`;

const Logo = ({ alt, inverted, size }: ILogoProp) => (
  <LogoWrapper inverted={inverted} size={size}>
    <svg
      aria-label={alt}
      width="401"
      height="401"
      viewBox="0 0 401 401"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="200.633" cy="200.58" r="200" />
        <rect
          x="131.283"
          y="104.174"
          width="46.5558"
          height="144.938"
          rx="23.2779"
          transform="rotate(26 131.283 104.174)"
        />
        <rect
          x="231.663"
          y="109.137"
          width="46.5558"
          height="144.938"
          rx="23.2779"
          transform="rotate(26 231.663 109.137)"
        />
        <rect
          x="257.779"
          y="207.753"
          width="46.5558"
          height="68.1965"
          rx="23.2779"
          transform="rotate(-30 257.779 207.753)"
        />
      </g>
    </svg>
  </LogoWrapper>
);

export default Logo;
