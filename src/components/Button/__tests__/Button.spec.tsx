import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import 'jest-dom/extend-expect';
import React from 'react';
import Button from '../';
import theme from '../../../theme_light';

describe('Button', () => {
  beforeEach(cleanup);

  it('renders the primary button', () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <Button primary={true}>Test</Button>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders the secondary button', () => {
    const component = render(
      <ThemeProvider theme={theme}>
        <Button secondary={true}>Test</Button>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
