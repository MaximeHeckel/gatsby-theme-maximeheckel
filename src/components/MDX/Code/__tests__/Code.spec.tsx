/* eslint-disable react/no-unescaped-entities */
import { ThemeProvider } from 'emotion-theming';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Code, calculateLinesToHighlight, hasTitle, preToCodeBlock } from '../';
import theme from '../../../../theme';

afterEach(() => {
  cleanup();
});

describe('Code', () => {
  it('hasTitle returns the title part of a given metastring if present', () => {
    expect(hasTitle('hello,world,title=Test123')).toBe('Test123');
    expect(hasTitle('hello,world')).toBe('');
  });

  it('calculateLinesToHighlight returns the proper set of lignes to highlight of a given metastring', () => {
    expect(
      calculateLinesToHighlight(
        'javascript {7-12} title=Writing the rule (step 1)'
      )(1)
    ).toBeFalsy();
    expect(
      calculateLinesToHighlight(
        'javascript {7-12} title=Writing the rule (step 1)'
      )(7)
    ).toBeTruthy();

    expect(
      calculateLinesToHighlight('javascript title=Writing the rule (step 1)')(7)
    ).toBeFalsy();
  });

  it('preToCodeBlock returns the proper set of props for our code block components if the children are of type <code>', () => {
    const preProps = {
      children: {
        props: {
          children: 'some code to render',
          mdxType: 'code',
          metastring: 'javascript',
        },
      },
    };
    expect(preToCodeBlock(preProps)).toMatchSnapshot();

    const prePropsWithNoCode = {
      children: {
        props: {
          children: 'some inline code to render',
          metastring: 'javascript',
        },
      },
    };

    expect(preToCodeBlock(prePropsWithNoCode)).toBeUndefined();
  });

  it('Renders a Codeblock component when the proper preProps are passed', () => {
    const { container } = render(
      <ThemeProvider theme={theme.light}>
        <Code>
          <div metastring="javascript" mdxType="code">
            var hello="world"
          </div>
        </Code>
      </ThemeProvider>
    );

    expect(container.querySelector('pre[class="prism-code"]')).toBeDefined();
    expect(container.querySelector('span[class="number-line"]')).toBeDefined();
    expect(
      container.querySelector('span[class="number-line"]')
    ).toHaveTextContent(1);
  });

  it('Renders a Codeblock with title when the proper preProps are passed', () => {
    const { container } = render(
      <ThemeProvider theme={theme.light}>
        <Code>
          <div metastring="javascript title=test" mdxType="code">
            some code to render
          </div>
        </Code>
      </ThemeProvider>
    );

    expect(
      container.querySelector('p[data-testid="codesnippet-title"]')
    ).toHaveTextContent('test');
    expect(container.querySelector('pre[class="prism-code"]')).toBeDefined();
    expect(container.querySelector('span[class="number-line"]')).toBeDefined();
    expect(
      container.querySelector('span[class="number-line"]')
    ).toHaveTextContent(1);
    expect(container.querySelector('button')).toHaveTextContent('Copy');
  });

  it('Renders a Codeblock with title and line highlight when the proper preProps are passed', () => {
    const { container } = render(
      <ThemeProvider theme={theme.light}>
        <Code>
          <div metastring="javascript {1-3}title=test" mdxType="code">
            {`some code to render
            some code to render 2
            some code to render 3
            some code to render 4`}
          </div>
        </Code>
      </ThemeProvider>
    );

    expect(
      container.querySelector('p[data-testid="codesnippet-title"]')
    ).toHaveTextContent('test');
    expect(container.querySelector('pre[class="prism-code"]')).toBeDefined();
    expect(container.querySelector('span[class="number-line"]')).toBeDefined();
    expect(
      container.querySelectorAll('span[class="number-line"]')
    ).toHaveLength(4);
    expect(
      container.querySelectorAll('div[class="token-line highlight-line"]')
    ).toHaveLength(3);
    expect(container.querySelectorAll('div[class="token-line"]')).toHaveLength(
      1
    );
    expect(container.querySelector('button')).toHaveTextContent('Copy');
  });

  it('Renders a <pre> when there are no proper preProps passed', () => {
    const { container } = render(
      <ThemeProvider theme={theme.light}>
        <Code>
          <div metastring="javascript">var hello="world"</div>
        </Code>
      </ThemeProvider>
    );

    expect(container.querySelector('pre')).toBeDefined();
    expect(container.querySelector('pre[class="prism-code"]')).toBeNull();
    expect(container.querySelector('pre').firstElementChild).toHaveTextContent(
      'var hello="world"'
    );
  });
});
