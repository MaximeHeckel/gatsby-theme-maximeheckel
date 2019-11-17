import styled from '@emotion/styled';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React from 'react';

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

const preToCodeBlock = preProps => {
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
          ? matches.groups.lang
          : '',
      ...props,
    };
  }
};

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = meta => {
  if (!RE.test(meta)) {
    return () => false;
  } else {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(val => parseInt(val, 10)));
    return index => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  }
};

const RETitle = /title=[A-Za-z](.+)/;

const hasTitle = metastring => {
  if (!RETitle.test(metastring)) {
    return '';
  } else {
    return RETitle.exec(metastring)[0].split('title=')[1];
  }
};

export const InlineCode = props => {
  return <InlineCodeWrapper>{props.children}</InlineCodeWrapper>;
};

export const CodeBlock = props => {
  const { codeString, language, metastring } = props;
  const [copied, hasClickedCopy] = React.useState(false);
  const handleCopyToClipboard = (code: string) => {
    copyToClipboard(code);

    hasClickedCopy(true);
    setTimeout(() => {
      hasClickedCopy(false);
    }, 2000);
  };

  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);
  return (
    <CodeSnippetWrapper>
      {title ? (
        <CodeSnippetHeader>
          <CodeSnippetTitle>{title}</CodeSnippetTitle>
          <CopyButton onClick={() => handleCopyToClipboard(codeString)}>
            {copied ? 'Copied' : 'Copy'}
          </CopyButton>
        </CodeSnippetHeader>
      ) : null}
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, index) => {
              const { className: lineClassName } = getLineProps({
                className: shouldHighlightLine(index) ? 'highlight-line' : '',
                key: index,
                line,
              });
              return (
                <div key={index} style={{ display: 'flex' }}>
                  <div className={lineClassName}>
                    <span className="number-line">{index + 1}</span>
                    {line.map((token, key) => {
                      const {
                        className: tokenClassName,
                        children,
                      } = getTokenProps({
                        key,
                        token,
                      });

                      return (
                        <span key={key} className={tokenClassName}>
                          {children}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </CodeSnippetWrapper>
  );
};

export const Code = preProps => {
  const props = preToCodeBlock(preProps);
  if (props) {
    return <CodeBlock {...props} />;
  } else {
    return <pre {...preProps} />;
  }
};

const InlineCodeWrapper = styled('code')`
  border-radius: 4px;
  background-color: ${p => p.theme.colors.prism.background};
  color: ${p => p.theme.colors.white};
  padding-top: 2px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
`;

const CodeSnippetTitle = styled('p')`
  padding: 10px;
  font-size: 14px;
  margin-bottom: 0px;
`;

const CodeSnippetHeader = styled('div')`
  @media (max-width: 500px) {
    border-radius: 0px;
  }

  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.blue};
  min-height: 45px;
`;

const CodeSnippetWrapper = styled('div')`
  @media (max-width: 500px) {
    position: relative;
    width: 100vw;
    left: calc(-50vw + 50%);
    border-radius: 0px;
  }

  width: 100%;
  border-radius: 5px;
  background: ${p => p.theme.colors.prism.background};
  margin: 40px 0px;
`;

const CopyButton = styled('button')`
  color: ${p => p.theme.colors.white};
  transition: background 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  cursor: pointer;
`;
