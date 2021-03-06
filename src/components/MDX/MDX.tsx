import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import styled from '@emotion/styled';
import Callout from '../Callout';
import Pill from '../Pill';
import { Blockquote } from './Blockquote';
import Button from '../Button';
import { Code, InlineCode } from './Code';

const ArrowSVG = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.58212 2.40308L11.8248 6.64572L7.58212 10.8884"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.6137 6.5955H11.5132"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ListItem = (props: HTMLLIElement) => {
  return (
    <li>
      <span>
        <ArrowSVG />
      </span>
      <div>{props.children}</div>
    </li>
  );
};

const components = {
  Button,
  blockquote: Blockquote,
  Callout,
  inlineCode: InlineCode,
  Pill,
  pre: Code,
  li: ListItem,
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

type MDXBody = {
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
  maxWidth?: number;
};

const MDXBody = styled.div<MDXBody>`
  margin: 0 auto;
  max-width: ${(p) => `${p.maxWidth || 700}px`};
  padding: 20px 0px 20px 0px;
  color: var(--maximeheckel-colors-typeface-1);

  figcaption {
    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    font-weight: 500;
    color: var(--maximeheckel-colors-typeface-2);
    padding-top: 10px;
  }

  h1 {
    color: var(--maximeheckel-colors-typeface-0);
  }

  h2 {
    color: var(--maximeheckel-colors-typeface-0);
    margin-top: 2em;
  }

  h3 {
    color: var(--maximeheckel-colors-typeface-0);
    margin-top: 2em;
  }

  strong {
    color: var(--maximeheckel-colors-typeface-0);
  }

  hr {
    height: 2px;
    width: 40%;
    margin: 50px auto;
    background-color: var(--maximeheckel-colors-typeface-0);
  }

  ul {
    margin-left: 0px;
    li {
      list-style: none;
      display: flex;
      span {
        display: inline-block;
        padding-right: 16px;
        padding-top: 2px;
        transform: translateY(-2px);
        svg {
          stroke: var(--maximeheckel-colors-brand);
        }
      }
    }
  }

  ol {
    margin-left: 0px;
    list-style: none;
    li {
      counter-increment: li;
      display: flex;

      &:before {
        content: counters(li, '.') '. ';
        color: var(--maximeheckel-colors-brand);
        padding-right: 12px;
      }
    }
  }

  a {
    color: var(--maximeheckel-colors-brand);
  }

  twitter-widget {
    margin: 0 auto;
  }
`;
