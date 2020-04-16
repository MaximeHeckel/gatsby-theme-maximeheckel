import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import 'jest-dom/extend-expect';
import React from 'react';
import Footer from '..';
import theme from '../../../theme';

describe('Footer', () => {
  beforeEach(cleanup);

  it('renders the Footer without the table of contents', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <Footer />
      </ThemeProvider>
    );
    expect(getByTestId('footer')).toBeDefined();
  });
});
