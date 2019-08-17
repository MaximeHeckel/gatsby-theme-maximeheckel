import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

const components = {
  a: (aProps: any) => <a {...aProps} style={{ color: 'inherit' }} />,
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
`;
