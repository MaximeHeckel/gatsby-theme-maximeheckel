import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import styled from '../../utils/styled';
import Callout from '../Callout';
import Pill from '../Pill';
import { Blockquote } from './Blockquote';
import Button from '../Button';
import { Code, InlineCode } from './Code';

const components = {
  Button,
  blockquote: Blockquote,
  Callout,
  inlineCode: InlineCode,
  Pill,
  pre: Code,
};

interface IMDXProps {
  children: React.ReactNode;
  maxWidth?: number;
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

export { MDX };

export const toKebabCase = (str: string): string | null => {
  const match = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );

  return match && match.map((x) => x.toLowerCase()).join('-');
};

/**
 * Dirty workaround for the moment, we set p of type any
 * Can't figure out whether or not there's another way to properly
 * type props in this use case of emotion
 */
const PrismCSS = (p: any) => css`
  .prism-code {
    font-family: Fira Code;
    overflow-wrap: normal;
    position: relative;
    overflow: scroll;
    width: 100%;
    max-width: 744px;
    padding: 15px 0px 15px 0px;
    font-size: 14px;
    margin: 15px auto 15px;
    border-radius: 4px;
    background: ${p.theme.colors.prism.background};

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.6;
      color: #dcd9e6;
    }

    .token-line {
      flex: 1;
      padding: 0px 15px 0px 15px;
      min-width: 500px;
      border-left: 3px solid transparent;
      ${Object.keys(p.theme.colors.prism)
        .map((key) => {
          return `.${toKebabCase(key)}{color:${p.theme.colors.prism[key]};}`;
        })
        .reduce((curr, next) => curr + next, ``)};

      &.highlight-line {
        padding: 0px 14px;
        background: ${p.theme.colors.prism.highlight};
        border-left: 3px solid ${p.theme.colors.prism.highlightBorder};
      }

      &:hover {
        .number-line {
          color: ${p.theme.colors.blue};
          opacity: 1;
        }

        background-color: rgba(255, 255, 255, 0.05);
      }
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
  maxWidth?: number;
};

const MDXBody = styled.div<MDXBody>`
  margin: 0 auto;
  max-width: ${(p) => `${p.maxWidth || 700}px`};
  padding: 20px 0px 20px 0px;
  color: ${(props) => props.theme.fontColor};

  figcaption {
    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    font-weight: 500;
    color: #8a8a90;
    padding-top: 10px;
  }

  h2 {
    margin-top: 3em;
  }

  h3 {
    margin-top: 3em;
  }

  hr {
    height: 2px;
    width: 20%;
    margin: 50px auto;
    background-color: #e8e8e8;
  }

  ul {
    margin-left: 18px;
    li {
      list-style-image: url("data:image/svg+xml,%3Csvg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.5858 8H1.5C0.947715 8 0.5 7.55228 0.5 7V7C0.5 6.44771 0.947715 6 1.5 6H11.5858L7.41421 1.82843C7.02369 1.4379 7.02576 0.80267 7.41628 0.412145V0.412145C7.80519 0.0232345 8.43722 0.0193376 8.8284 0.405968L14.7811 6.28944C15.1769 6.68063 15.1772 7.31967 14.7818 7.71124L8.82841 13.6065C8.43734 13.9938 7.80462 13.99 7.41545 13.6008V13.6008C7.02531 13.2107 7.02263 12.5761 7.41222 12.1854L11.5858 8Z' fill='%235184F9'/%3E%3C/svg%3E%0A");
    }
  }

  ol {
    margin-left: 0px;
    list-style: none;
    li {
      counter-increment: li;

      &:before {
        content: counters(li, '.') '. ';
        color: ${(props) => props.theme.colors.blue};
        padding-right: 12px;
      }
    }
  }

  a {
    color: ${(props) => props.theme.colors.blue};
  }

  twitter-widget {
    margin: 0 auto;
  }

  ${PrismCSS}
`;
