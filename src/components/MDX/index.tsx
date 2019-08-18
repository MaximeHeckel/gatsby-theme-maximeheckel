import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { Code } from '../Code';
import { ColoredBlockWrapper } from '../ColoredBlock';

const components = {
  a: (aProps: any) => <a {...aProps} style={{ color: 'inherit' }} />,
  pre: Code,
};

const MDX = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <MDXProvider components={components}>
      <MDXBody ref={ref} {...props}>
        {children}
      </MDXBody>
    </MDXProvider>
  );
});

export default MDX;

const toKebabCase = (str: string): string => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
};

const PrismCSS = p => css`
  .prism-code {
    position: relative;
    overflow: scroll;
    width: 100%;
    max-width: 744px;
    margin: 0 auto;
    padding: 15px;
    font-size: 14px;
    margin: 15px auto 15px;
    border-radius: 5px;
    background: ${p.theme.colors.prism.background};
    .token-line {
      border-left: 3px solid transparent;
      ${Object.keys(p.theme.colors.prism)
        .map(key => {
          return `.${toKebabCase(key)}{color:${p.theme.colors.prism[key]};}`;
        })
        .reduce((curr, next) => curr + next, ``)};
      & > span {
      }
    }
    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;
    }
    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${p.theme.colors.prism.highlight};
      border-left: 3px solid ${p.theme.colors.prism.highlightBorder};
    }
    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }
    .plain ~ .operator {
      color: #5fa8aa !important;
    }
  }
`;

const MDXBody = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.type === 'blogPost' ? '700px' : '1020px')};
  padding: 30px 0px 20px 0px;
  color: ${props => props.theme.fontColor};

  figcaption {
    font-size: 14px;
    font-style: italic;
    text-align: center;
  }

  twitter-widget {
    margin: 0 auto;
  }

  ${ColoredBlockWrapper} {
    margin-bottom: 30px;
  }

  ${PrismCSS}
`;
