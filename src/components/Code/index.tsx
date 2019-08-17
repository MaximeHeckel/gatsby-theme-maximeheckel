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

export const CodeBlock = props => {
  const { codeString, language } = props;
  const [copied, hasClickedCopy] = React.useState(false);
  const handleCopyToClipboard = (code: string) => {
    copyToClipboard(code);

    hasClickedCopy(true);
    setTimeout(() => {
      hasClickedCopy(false);
    }, 2000);
  };

  return (
    <Highlight {...defaultProps} code={codeString} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          <CopyButton onClick={() => handleCopyToClipboard(codeString)}>
            {copied ? 'Copied' : 'Copy'}
          </CopyButton>
          {tokens.map((line, index) => {
            const { className: lineClassName } = getLineProps({
              className: '',
              key: index,
              line,
            });
            return (
              <div key={index} className={lineClassName}>
                <span className="number-line">{index + 1}</span>
                {line.map((token, key) => {
                  const { className: tokenClassName, children } = getTokenProps(
                    {
                      key,
                      token,
                    }
                  );

                  return (
                    <span key={key} className={tokenClassName}>
                      {children}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
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

const CopyButton = styled('button')`
  position: absolute;
  right: 15px;
  top: 15px;
  padding: 8px 12px 7px;
  border-radius: 5px;
  color: #6f7177;
  transition: background 0.3s ease;
  background: rgba(255, 255, 255, 0.07);
  border: none;
  cursor: pointer;
`;
