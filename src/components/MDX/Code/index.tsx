import { css } from '@emotion/core';
import Highlight, { Prism, defaultProps, Language } from 'prism-react-renderer';
import themePrism from 'prism-react-renderer/themes/oceanicNext';
import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Recharts from 'recharts';
import styled from '../../../utils/styled';
import EmotionStyled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { withTheme } from 'emotion-theming';
import Button from '../../Button';
import Flex from '../../Flex';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

/**
 * This imports the syntax highlighting style for the Swift language
 */
require('prismjs/components/prism-swift');

const copyToClipboard = (content: string) => {
  const el = document.createElement(`textarea`);
  el.value = content;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
};

type PrePropsType = {
  props: {
    live?: boolean;
    render?: boolean;
  };
  children: {
    props: {
      metastring: string;
      mdxType?: string;
      className?: string;
      children: string;
    };
  };
};

export const preToCodeBlock = (
  preProps: PrePropsType
):
  | {
      live?: boolean;
      render?: boolean;
      className: string;
      codeString: string;
      language: Language;
      metastring: string;
    }
  | undefined => {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.props.mdxType === 'code'
  ) {
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);
    return {
      className,
      codeString: codeString.trim(),
      language:
        matches && matches.groups && matches.groups.lang
          ? (matches.groups.lang as Language)
          : ('' as Language),
      ...props,
    };
  }
};

const RE = /{([\d,-]+)}/;

export const calculateLinesToHighlight = (metastring: string | null) => {
  if (!metastring || !RE.test(metastring)) {
    return () => false;
  } else {
    const lineNumbers = RE.exec(metastring)![1]
      .split(',')
      .map((v) => v.split('-').map((val) => parseInt(val, 10)));
    return (index: number) => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  }
};

const RETitle = /title=[A-Za-z](.+)/;

export const hasTitle = (metastring: string | null) => {
  if (!metastring || !RETitle.test(metastring)) {
    return '';
  } else {
    return RETitle.exec(metastring)![0].split('title=')[1];
  }
};

interface IInlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<IInlineCodeProps> = (props) => {
  return <InlineCodeWrapper>{props.children}</InlineCodeWrapper>;
};

export const LiveCodeBlock: React.FC<ICodeBlockProps> = withTheme((props) => {
  const { codeString, live, render } = props;

  const scope = {
    motion,
    useAnimation,
    styled: EmotionStyled,
    Button,
    React,
    Recharts: { ...Recharts },
  };

  const customTheme = {
    ...themePrism,
    plain: {
      fontFamily: 'Fira Code',
      fontSize: '14px',
      color: '#ffffff',
      overflowWrap: 'normal',
      position: 'relative',
      overflow: 'scroll',
      borderRadius: '4px',
    },
  };

  if (live) {
    return (
      <LiveProvider
        theme={customTheme}
        code={codeString}
        scope={scope}
        noInline={true}
      >
        <StyledLiveCodeWrapper fullWidth>
          <StyledPreviewWrapper>
            <LivePreview />
          </StyledPreviewWrapper>
          <StyledEditorWrapper>
            <LiveEditor />
          </StyledEditorWrapper>
        </StyledLiveCodeWrapper>
        <StyledErrorWrapper>
          <LiveError />
        </StyledErrorWrapper>
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <LiveProvider code={codeString} scope={scope} noInline={true}>
        <StyledLiveCodeWrapper>
          <StyledPreviewWrapper>
            <LivePreview />
          </StyledPreviewWrapper>
        </StyledLiveCodeWrapper>
      </LiveProvider>
    );
  }

  return null;
});

interface ICodeBlockProps {
  codeString: string;
  language: Language;
  metastring: string | null;
}

const Pre = styled.pre`
  text-align: left;
  padding: 8px 0px;
  overflow: scroll;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  ${(p) =>
    p.title
      ? ''
      : `
      border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    `}
`;

const Line = styled.div`
  display: table;
  border-collapse: collapse;
  padding: 0px 14px;
  border-left: 3px solid transparent;
  &.highlight-line {
    background: ${(p) => p.theme.colors.prism.highlight};
    border-color: ${(p) => p.theme.colors.prism.highlightBorder};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LineNo = styled.div`
  // display: table-cell;
  width: 45px;
  padding: 0 12px;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
  width: 100%;
`;

export const CodeBlock: React.FC<ICodeBlockProps> = (props) => {
  const { codeString, language, metastring } = props;
  const [copied, hasClickedCopy] = React.useState(false);
  const handleCopyToClipboard = (code: string) => {
    copyToClipboard(code);

    hasClickedCopy(true);
    setTimeout(() => {
      hasClickedCopy(false);
    }, 2000);
  };

  const customTheme = {
    ...themePrism,
    plain: {
      ...themePrism.plain,
      fontFamily: 'Fira Code',
      fontSize: '14px',
    },
  };

  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);
  return (
    <CodeSnippetWrapper>
      {title ? (
        <CodeSnippetHeader>
          <CodeSnippetTitle data-testid="codesnippet-title">
            {title}
          </CodeSnippetTitle>
          <Flex>
            <CodeLanguage>{language}</CodeLanguage>
            <CopyButton onClick={() => handleCopyToClipboard(codeString)}>
              {copied ? 'Done' : 'Copy'}
            </CopyButton>
          </Flex>
        </CodeSnippetHeader>
      ) : null}
      <Highlight
        {...defaultProps}
        theme={customTheme}
        code={codeString}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre title={title} className={className} style={style}>
            {tokens.map((line, index) => {
              const { className: lineClassName } = getLineProps({
                className: shouldHighlightLine(index) ? 'highlight-line' : '',
                key: index,
                line,
              });

              return (
                <Line
                  data-testid={
                    shouldHighlightLine(index) ? 'highlight-line' : 'line'
                  }
                  key={index}
                  className={lineClassName}
                >
                  <LineNo data-testid="number-line">{index + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => {
                      return (
                        <span
                          data-testid="content-line"
                          key={key}
                          {...getTokenProps({
                            key,
                            token,
                          })}
                        />
                      );
                    })}
                  </LineContent>
                </Line>
              );
            })}
          </Pre>
        )}
      </Highlight>
    </CodeSnippetWrapper>
  );
};

export const Code: React.FC<PrePropsType> = (preProps) => {
  const props = preToCodeBlock(preProps);

  if (props) {
    return props.live || props.render ? (
      <LiveCodeBlock {...props} />
    ) : (
      <CodeBlock {...props} />
    );
  } else {
    return <pre {...preProps} />;
  }
};

const InlineCodeWrapper = styled('code')`
  border-radius: 4px;
  background-color: ${(p) => p.theme.colors.prism.background};
  color: ${(p) => p.theme.colors.white};
  padding-top: 2px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
`;

const CodeSnippetTitle = styled('p')`
  padding: 4px 10px;
  font-size: 14px;
  margin-bottom: 0px;
  color: ${(p) => p.theme.backgroundColor};
`;

const CodeLanguage = styled('div')`
  color: ${(p) => p.theme.backgroundColor};
  text-transform: uppercase;
  font-size: 14px;
`;

const CodeSnippetHeader = styled('div')`
  @media (max-width: 500px) {
    border-radius: 0px;
  }

  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${(p) => p.theme.colors.white};
  background: ${(p) => p.theme.colors.blue};
  min-height: 30px;
`;

const fullWidthSnipperStyle = () => css`
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
  border-radius: 0px;
  max-width: 1100px;
`;

const CodeSnippetWrapper = styled('div')`
  @media (max-width: 600px) {
    ${fullWidthSnipperStyle}
  }

  width: 100%;
  border-radius: 5px;
  margin: 40px 0px;
`;

interface CodeSnippetWrapperProps {
  fullWidth?: boolean;
}

const StyledLiveCodeWrapper = styled('div')<CodeSnippetWrapperProps>`
  @media (max-width: 750px) {
    display: block;
  }

  @media (max-width: 1100px) {
    ${(p) => (p.fullWidth ? fullWidthSnipperStyle : '')}
  }

  @media (min-width: 1101px) {
    ${(p) =>
      p.fullWidth
        ? `
        width: 1100px;
        transform: translateX(-200px);
`
        : ''}
  }

  background-color: ${(p) => p.theme.foregroundColor};
  backdrop-filter: blur(6px);
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 40px 0px;
`;

const StyledEditorWrapper = styled('div')`
  flex: 60 1 0%;
  background-color: ${(p) => p.theme.colors.prism.background};
  height: 100%;
  max-height: 600px;
  overflow: auto;
  margin: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  * > textarea:focus {
    outline: none;
  }
`;

const StyledPreviewWrapper = styled('div')`
  height: 100%;
  max-height: 600px;
  min-height: 300px;
  flex: 40 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledErrorWrapper = styled('div')`
  color: white;
  width: 100%;

  pre {
    padding: 15px;
    margin-bottom: 0px;
  }
`;

const CopyButton = styled('button')`
  color: ${(p) => p.theme.backgroundColor};
  transition: background 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  cursor: pointer;
  height: 100%;
  margin-right: 0px;
  padding: 0px 10px;
  max-width: 60px;
  width: 60px;
  outline: none;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
`;
