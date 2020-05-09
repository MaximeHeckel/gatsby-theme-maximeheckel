import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from '../../utils/styled';
import React from 'react';
interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  white?: boolean;
  danger?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => any;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  height: 48px;
  margin: 0;
  border: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 600;
  outline: none;
  padding: 0 30px;
  border-radius: 4px;

  ${(p) =>
    p.primary
      ? `
      background-color: ${p.theme.colors.blue};
      color: ${p.theme.colors.white};
      min-width: 150px;

  ${
    p.danger
      ? `
        background-color: ${p.theme.colors.red};
            `
      : ''
  }

  ${
    p.disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      background-color: ${p.theme.colors.gray};
      color: #000000;
      &:hover {
        transform: none;
      }
        `
      : ''
  }
  
      `
      : ''};

  ${(p) =>
    p.secondary
      ? `
      background-color: transparent;
      color: ${p.theme.colors.blue};
      border: 2px solid ${p.theme.colors.blue};
      min-width: 150px;

  ${
    p.danger
      ? `
          color: ${p.theme.colors.red};
          border-color: ${p.theme.colors.red};
        `
      : ''
  }

  ${
    p.disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      color: ${p.theme.colors.gray};
      border-color: ${p.theme.colors.gray};
      &:hover {
        transform: none;
      }
        `
      : ''
  }

      `
      : ''};

  ${(p) =>
    p.tertiary
      ? `
      background-color: transparent;
      color: ${p.theme.colors.blue};
      min-width: inherited;
      padding: 0px;

      ::after {
        content: '';
        display: block;
        position: absolute;
        top: 96%;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${p.theme.colors.blue};
        transform: scaleX(0);
        transition: transform 0.25s ease-in;
        transform-origin: right center;
        text-decoration: none;
      }
    
      &:hover::after {
        transform: scale(1);
        transform-origin: left center;
      }

      ${
        p.danger
          ? `
              color: ${p.theme.colors.red};
              ::after { 
                background-color: ${p.theme.colors.red};
              }
            `
          : ''
      }

      ${
        p.disabled
          ? `
              opacity: 0.5;
              cursor: not-allowed;
              color: ${p.theme.colors.gray};
              ::after { 
                background-color: ${p.theme.colors.gray};
              }
            `
          : ''
      }
          `
      : ''};
`;

const Button = React.forwardRef(
  ({ children, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <StyledButton
        whileHover={props.tertiary ? {} : { scale: 0.85 }}
        transition={{ duration: 0.1 }}
        ref={ref}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
