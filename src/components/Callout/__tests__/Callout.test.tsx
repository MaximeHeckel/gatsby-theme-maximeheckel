import { ThemeProvider } from 'emotion-theming';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Callout from '../';
import { VARIANT } from '../Callout';
import theme from '../../../theme';

describe('Callout', () => {
  afterEach(cleanup);
  it('can render a Callout with variant info', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Callout variant={VARIANT.INFO}>Test</Callout>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('can render a Callout with variant danger', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Callout variant={VARIANT.DANGER}>Test</Callout>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
