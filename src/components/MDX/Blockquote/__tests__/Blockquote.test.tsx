import { ThemeProvider } from 'emotion-theming';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Blockquote } from '../';
import theme from '../../../../theme';

describe('Blockquote', () => {
  afterEach(cleanup);
  it('can render a Blockquote', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Blockquote>Test</Blockquote>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
