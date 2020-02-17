import { ReactNode } from 'react';
import styled from '../../utils/styled';
interface IButtonProps {
  primary?: boolean;
  secondary?: boolean;
  white?: boolean;
  children: ReactNode;
}

const Button = styled.button<IButtonProps>`
  margin: 0;
  background-color: ${props =>
    props.primary ? props.theme.colors.blue : 'transparent'};
  color: ${props =>
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
  padding: ${props => (props.primary ? '0 30px' : '0 0')};
  height: 48px;
  min-width: ${props => (props.primary ? '190px' : 'inherit')};
  font-weight: 700;
  outline: none;
  transition: ${props =>
    props.primary
      ? 'background-color 0.2s cubic-bezier(0.8, 0, 0.2, 1)'
      : '1.8s'};
  &:hover {
    background-color: ${props => (props.primary ? '#161617' : 'transparent')};
  }

  ${props =>
    props.primary
      ? ''
      : `  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
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

export default Button;
