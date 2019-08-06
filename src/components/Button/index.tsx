import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { ReactNode } from 'react';
import { Theme } from '../../theme_light';

interface IButtonProps {
  primary?: boolean;
  secondary?: boolean;
  theme: Theme;
  white?: boolean;
  children: ReactNode;
}

const Button = styled.button`
  margin: 0;
  background-color: ${(props: IButtonProps) =>
    props.primary ? props.theme.colors.blue : 'transparent'};
  color: ${(props: IButtonProps) =>
    props.primary
      ? props.theme.colors.white
      : props.white
      ? props.theme.colors.white
      : props.theme.colors.blue};
  border: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${(props: IButtonProps) => (props.primary ? '0 30px' : '0 0')};
  height: 48px;
  min-width: ${(props: IButtonProps) => (props.primary ? '190px' : 'inherit')};
  font-weight: 700;
  outline: none;
  transition: ${(props: IButtonProps) =>
    props.primary
      ? 'background-color 0.2s cubic-bezier(0.8, 0, 0.2, 1)'
      : '1.8s'};
  &:hover {
    background-color: ${(props: IButtonProps) =>
      props.primary ? props.theme.colors.black : 'transparent'};
  }

  ${(props: IButtonProps) =>
    props.primary
      ? ''
      : `  ::after {
    content: '';
    display: block;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    height: 2px;
    background: ${
      props.white ? props.theme.colors.white : props.theme.colors.blue
    };
    transform: scaleX(0);
    transition: transform 0.25s ease-in;
    transform-origin: right center;
    text-decoration: none;
  }

  &:hover::after {
    transform: scale(1);
    transform-origin: left center;
  }`}
`;

export default withTheme(Button);
