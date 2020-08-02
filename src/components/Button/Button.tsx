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
  vercel?: boolean;
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
    p.vercel
      ? `
          display: flex;
          align-item: center;
          color: ${p.theme.backgroundColor};
          background-color: ${p.theme.fontColor};
        `
      : ''
  }

  ${
    p.disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      background-color: ${p.theme.bodyColor};
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
      color: ${p.theme.bodyColor};
      border-color: ${p.theme.bodyColor};
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
              color: ${p.theme.bodyColor};
              ::after { 
                background-color: ${p.theme.bodyColor};
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
        transition={{ type: 'spring' }}
        ref={ref}
        {...props}
      >
        {props.vercel ? (
          <img
            style={{
              marginBottom: '0px',
              marginRight: '8px',
            }}
            alt="Vercel logo"
            src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
            height="30"
          />
        ) : null}
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
