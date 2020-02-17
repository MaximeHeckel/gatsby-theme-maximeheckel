/* eslint-disable react/display-name */
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { Blockquote } from '../Blockquote';
import { Code, InlineCode } from '../Code';
import { LayoutContentTypeEnum } from '../../@types/layoutContentType';
import styled from '../../utils/styled';

const components = {
  a: (aProps: any) => <a {...aProps} style={{ color: 'inherit' }} />,
  blockquote: Blockquote,
  h2: (hProps: any) => <h2 {...hProps} style={{ marginTop: '3em' }} />,
  h3: (hProps: any) => <h2 {...hProps} style={{ marginTop: '3em' }} />,
  inlineCode: InlineCode,
  pre: Code,
  ul: (ulProps: any) => <ul {...ulProps} style={{ marginLeft: '18px' }} />,
};

interface IMDXProps {
  children: React.ReactNode;
  type?: LayoutContentTypeEnum;
}

const MDX = React.forwardRef(
  ({ children, ...props }: IMDXProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <MDXProvider components={components}>
        <MDXBody ref={ref} {...props}>
          {children}
        </MDXBody>
      </MDXProvider>
    );
  }
);

MDX.displayName = 'MDX';

export default MDX;

export const toKebabCase = (str: string): string | null => {
  const match = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );

  return match && match.map(x => x.toLowerCase()).join('-');
};

/**
 * Dirty workaround for the moment, we set p of type any
 * Can't figure out whether or not there's another way to properly
 * type props in this use case of emotion
 */
const PrismCSS = (p: any) => css`
  .prism-code {
    overflow-wrap: normal;
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

    .token-line {
      flex: 1;
      min-width: 500px;
    }

    .token-line.highlight-line {
      margin: 0px -14px;
      padding: 0px 14px;
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

type MDXBody = {
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
  type?: LayoutContentTypeEnum;
};

const MDXBody = styled.div<MDXBody>`
  margin: 0 auto;
  max-width: ${props => (props.type === 'blogPost' ? '700px' : '1020px')};
  padding: 50px 0px 20px 0px;
  color: ${props => props.theme.fontColor};

  figcaption {
    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    font-weight: 500;
    color: #73737d;
    padding-top: 10px;
  }

  hr {
    height: 2px;
    width: 20%;
    margin: 50px auto;
    background-color: #e8e8e8;
  }

  twitter-widget {
    margin: 0 auto;
  }

  ${PrismCSS}
`;
