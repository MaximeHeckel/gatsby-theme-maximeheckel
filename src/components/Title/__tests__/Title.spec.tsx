import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import Title from '../';
import theme from '../../../theme_light';

describe('Title', () => {
  beforeEach(cleanup);

  it('renders the Title', () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <Title>Test</Title>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
