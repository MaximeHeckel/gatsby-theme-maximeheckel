import { ThemeProvider } from 'emotion-theming';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MDX, { toKebabCase } from '../';
import theme from '../../../theme_light';

afterEach(() => {
  cleanup();
});

describe('MDX', () => {
  it('Transform a given string to kebab case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
    expect(toKebabCase('Helloworld')).toBe('helloworld');
  });

  it('Renders the MDX component accordingly', () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <MDX>
          <div>Test</div>
        </MDX>
      </ThemeProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
