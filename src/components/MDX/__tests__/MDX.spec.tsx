import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MDX, { toKebabCase } from '../';

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
      <MDX>
        <div>Test</div>
      </MDX>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
