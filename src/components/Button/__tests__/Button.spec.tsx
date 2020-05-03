import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import 'jest-dom/extend-expect';
import React from 'react';
import Button from '../';
import theme from '../../../theme';

describe('Button', () => {
  beforeEach(cleanup);

  it('renders the primary button', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Button primary={true}>Test</Button>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders the secondary button', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Button secondary={true}>Test</Button>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders the tertiary button', () => {
    const component = render(
      <ThemeProvider theme={theme.light}>
        <Button tertiary={true}>Test</Button>
      </ThemeProvider>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
