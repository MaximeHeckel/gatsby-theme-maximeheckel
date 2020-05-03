import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import 'jest-dom/extend-expect';
import React from 'react';
import Flex from '../';
import theme from '../../../theme';

describe('Flex', () => {
  beforeEach(cleanup);

  it('renders Flex with justifyContent prop', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Flex justifyContent="center">Test</Flex>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders Flex with direction prop', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Flex direction="column">Test</Flex>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders Flex with wrap prop', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Flex wrap="wrap">Test</Flex>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
