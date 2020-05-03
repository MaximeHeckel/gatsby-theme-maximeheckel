import { ThemeProvider } from 'emotion-theming';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DefaultHeader } from '../';
import { ThemeContext } from '../../../context/ThemeContext';
import theme from '../../../theme';

describe('Header', () => {
  afterEach(cleanup);

  it('renders the header without the site title or the post title or theme switcher', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <ThemeContext.Provider value={{ dark: false, toggleDark: () => null }}>
          <DefaultHeader />
        </ThemeContext.Provider>
      </ThemeProvider>
    );
    expect(queryByTestId('header-title')).toBeNull();
    expect(queryByTestId('darkmode-switch')).toBeNull();
  });

  it('renders the header with a title', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <ThemeContext.Provider value={{ dark: false, toggleDark: () => null }}>
          <DefaultHeader title="Maxime Heckel" />
        </ThemeContext.Provider>
      </ThemeProvider>
    );
    expect(queryByTestId('header-title')).toBeDefined();
    expect(queryByTestId('darkmode-switch')).toBeNull();
  });

  it('renders the header with the theme switcher', () => {
    const { queryByTestId, getByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <ThemeContext.Provider value={{ dark: false, toggleDark: () => null }}>
          <DefaultHeader themeSwitcher />
        </ThemeContext.Provider>
      </ThemeProvider>
    );
    expect(queryByTestId('header-title')).toBeNull();
    expect(getByTestId('darkmode-switch')).toBeDefined();
  });

  it('clicking on the theme switcher calls the toggle dark function', () => {
    const mockToggleDark = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme.light}>
        <ThemeContext.Provider
          value={{ dark: false, toggleDark: mockToggleDark }}
        >
          <DefaultHeader themeSwitcher />
        </ThemeContext.Provider>
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('darkmode-switch'));
    expect(mockToggleDark).toHaveBeenCalled();
  });
});
