import { ThemeProvider } from 'emotion-theming';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Hero from '../';
import theme from '../../../theme';

describe('Hero', () => {
  afterEach(cleanup);
  it('can render a full Hero', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <Hero>
          <Hero.Title>Test title</Hero.Title>
          <Hero.Subtitle>Test subtitle</Hero.Subtitle>
          <Hero.Info>Test Info</Hero.Info>
        </Hero>
      </ThemeProvider>
    );
    expect(queryByTestId('hero')).toBeDefined();
  });
});
